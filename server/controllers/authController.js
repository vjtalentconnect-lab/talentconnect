import User from '../models/User.js';
import Profile from '../models/Profile.js';
import jwt from 'jsonwebtoken';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
    const { email, password, role, fullName, talentCategory, location, mobile } = req.body;

    try {
        // Create user
        const user = await User.create({
            email,
            password,
            role,
            verificationStatus: role === 'talent' ? 'pending' : 'none'
        });

        // Create associated profile
        const profile = await Profile.create({
            user: user._id,
            fullName,
            location,
            mobile,
            talentCategory: role === 'talent' ? talentCategory : undefined,
        });

        // Update user with profile id
        user.profile = profile._id;
        await user.save();

        // Notify admins of new user registration
        try {
            const { broadcastAdminEvent } = await import('../socket.js');
            broadcastAdminEvent({
                type: 'newUser',
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    verificationStatus: user.verificationStatus,
                    createdAt: user.createdAt
                }
            });
        } catch (socketErr) {
            console.error('Socket notification error:', socketErr);
        }

        sendTokenResponse(user, 201, res);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' });
    }

    try {
        // Debug received credentials (redacted password)
        console.log(`[Login] Attempt for: ${email}`);
        
        // Check for user
        const user = await User.findOne({ email: email ? email.trim() : '' }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    try {
        const user = await User.findById(req.user.id).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(400).json({ message: err.message });
    }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ success: true, data: {} });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('profile');
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
        },
    });
};
