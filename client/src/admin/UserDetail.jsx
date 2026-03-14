import DashboardLayout from '../components/layout/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAdminUsers, verifyUser } from '../services/adminService';
import { getMyProfile } from '../services/profileService';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [adminProfile, setAdminProfile] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const adminP = await getMyProfile();
            setAdminProfile(adminP.data);

            const allUsers = await getAdminUsers();
            setUsers(allUsers.data);

            if (id) {
                const user = allUsers.data.find(u => u._id === id);
                setSelectedUser(user);
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleVerify = async (userId, status) => {
        try {
            await verifyUser(userId, status);
            alert(`User ${status ? 'Verified' : 'Unverified'} successfully`);
            fetchData();
        } catch (err) {
            alert('Action failed: ' + err.message);
        }
    };

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users', active: true },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: '!' },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: adminProfile?.fullName || 'Admin',
        roleTitle: 'Super Admin',
        avatar: adminProfile?.profilePicture === 'no-photo.jpg' ? 'https://ui-avatars.com/api/?name=Admin' : adminProfile?.profilePicture
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-background-dark">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

    if (!id) {
        return (
            <DashboardLayout
                menuItems={menuItems}
                userRole="Admin Console"
                userData={userData}
                headerTitle="User Management"
                headerSubtitle="Directory of all registered talent and directors"
            >
                <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 uppercase tracking-widest text-[10px] font-black text-slate-500">
                                <th className="px-8 py-5">User</th>
                                <th className="px-8 py-5">Role</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <img className="size-10 rounded-full border dark:border-white/10" src={user.profile?.profilePicture === 'no-photo.jpg' ? `https://ui-avatars.com/api/?name=${user.profile?.fullName || user.email}` : user.profile?.profilePicture} alt="" />
                                            <div>
                                                <p className="font-bold dark:text-white uppercase tracking-tight">{user.profile?.fullName || 'Untitled User'}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 capitalize font-bold text-slate-400 text-[10px] tracking-widest">{user.role}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${user.isVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                            {user.isVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button onClick={() => navigate(`/admin/users/${user._id}`)} className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Manage</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Console"
            userData={userData}
            headerTitle="User Detail"
            headerSubtitle={`Management for ${selectedUser?.profile?.fullName || selectedUser?.email}`}
            searchPlaceholder="Search events or logs..."
        >
            <div className="space-y-8">
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span onClick={() => navigate('/admin/users')} className="hover:text-primary cursor-pointer transition-colors">User Management</span>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-primary">{selectedUser?.profile?.fullName}</span>
                </nav>

                <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 p-8 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <div className="relative shrink-0">
                                <div className="size-24 md:size-32 rounded-3xl bg-cover bg-center border-4 border-primary/20 shadow-xl" style={{ backgroundImage: `url('${selectedUser?.profile?.profilePicture === 'no-photo.jpg' ? `https://ui-avatars.com/api/?name=${selectedUser?.profile?.fullName || selectedUser?.email}` : selectedUser?.profile?.profilePicture}')` }}></div>
                                {selectedUser?.isVerified && (
                                    <div className="absolute -bottom-2 -right-2 size-10 bg-emerald-500 rounded-2xl border-4 border-white dark:border-card-dark flex items-center justify-center text-white shadow-lg">
                                        <span className="material-symbols-outlined text-sm font-black">check</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <h1 className="text-3xl font-black dark:text-white uppercase tracking-tight">{selectedUser?.profile?.fullName || 'New User'}</h1>
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/20 shadow-sm shadow-primary/5 capitalize">{selectedUser?.role}</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-sm">mail</span>
                                    {selectedUser?.email}
                                </p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">calendar_today</span> Joined: {new Date(selectedUser?.createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">verified_user</span> Status: <span className={selectedUser?.isVerified ? 'text-emerald-500' : 'text-slate-500'}>{selectedUser?.isVerified ? 'Verified' : 'Pending'}</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => handleVerify(selectedUser._id, !selectedUser.isVerified)}
                                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedUser?.isVerified ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20'}`}
                            >
                                <span className="material-symbols-outlined text-sm">{selectedUser?.isVerified ? 'person_off' : 'verified'}</span>
                                {selectedUser?.isVerified ? 'Unverify' : 'Verify Now'}
                            </button>
                            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all dark:text-slate-300">
                                <span className="material-symbols-outlined text-sm">lock_reset</span> Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 p-8 shadow-sm">
                    <h3 className="text-lg font-black dark:text-white uppercase tracking-tight mb-8">Profile Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bio</p>
                            <p className="text-sm font-bold dark:text-white bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5 min-h-[100px]">{selectedUser?.profile?.bio || 'No bio provided for this user.'}</p>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</p>
                                <p className="text-sm font-bold dark:text-white uppercase tracking-tight">{selectedUser?.profile?.location || 'Not Specified'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category / Industry</p>
                                <p className="text-sm font-bold dark:text-white uppercase tracking-tight">{selectedUser?.profile?.talentCategory || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserDetail;
