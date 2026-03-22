import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ['talent', 'director', 'admin'],
            default: 'talent',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationStatus: {
            type: String,
            enum: ['none', 'pending', 'verified', 'rejected'],
            default: 'none',
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        },
        plan: {
            type: String,
            enum: ['free', 'studio_pro'],
            default: 'free',
        },
        subscriptionStatus: {
            type: String,
            enum: ['inactive', 'active', 'cancelled'],
            default: 'inactive',
        },
        trialEndsAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Ensure trial end is set for directors when created
userSchema.pre('save', function (next) {
    if (this.isNew && this.role === 'director' && !this.trialEndsAt) {
        const expires = new Date(this.createdAt || Date.now());
        expires.setDate(expires.getDate() + 30);
        this.trialEndsAt = expires;
    }
    next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
