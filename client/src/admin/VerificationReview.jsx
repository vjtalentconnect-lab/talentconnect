import DashboardLayout from '../components/layout/DashboardLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPendingVerifications, verifyUser, getAdminUsers } from '../services/adminService';
import { getMyProfile } from '../services/profileService';

const VerificationReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [adminProfile, setAdminProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const adminP = await getMyProfile();
                setAdminProfile(adminP.data);

                if (id) {
                    const users = await getAdminUsers();
                    const user = users.data.find(u => u._id === id);
                    setCurrentUser(user);
                } else {
                    const verifs = await getPendingVerifications();
                    setRequests(verifs.data);
                }
            } catch (err) {
                console.error('Error fetching verification data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAction = async (status) => {
        try {
            await verifyUser(id, status);
            alert(`User ${status ? 'Approved' : 'Rejected'} successfully`);
            navigate('/admin/verifications');
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', active: true, badge: '!' },
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
                headerTitle="Verification Requests"
                headerSubtitle="Manage pending identity verifications"
            >
                <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 uppercase tracking-widest text-[10px] font-black text-slate-500">
                                <th className="px-8 py-5">User</th>
                                <th className="px-8 py-5">Role</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {requests.map(req => (
                                <tr key={req._id}>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <img className="size-10 rounded-full border dark:border-white/10" src={req.profile?.profilePicture === 'no-photo.jpg' ? `https://ui-avatars.com/api/?name=${req.profile?.fullName}` : req.profile?.profilePicture} alt="" />
                                            <div>
                                                <p className="font-bold dark:text-white">{req.profile?.fullName}</p>
                                                <p className="text-xs text-slate-500">{req.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 capitalize font-bold text-slate-600 dark:text-slate-400">{req.role}</td>
                                    <td className="px-8 py-6 text-slate-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                                    <td className="px-8 py-6 text-right">
                                        <button onClick={() => navigate(`/admin/verifications/${req._id}`)} className="px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20">Review</button>
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
            headerTitle="Verification Review"
            headerSubtitle={`Reviewing request for ${currentUser?.profile?.fullName}`}
            searchPlaceholder="Search everything..."
        >
            <div className="space-y-8">
                {/* Profile Summary Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 rounded-3xl bg-cover bg-center border-4 border-primary/20 shadow-xl" style={{ backgroundImage: `url('${currentUser?.profile?.profilePicture === 'no-photo.jpg' ? `https://ui-avatars.com/api/?name=${currentUser?.profile?.fullName}` : currentUser?.profile?.profilePicture}')` }}></div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-2xl border-4 border-white dark:border-card-dark flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined text-sm font-bold">pending</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black dark:text-white uppercase tracking-tight mb-2">{currentUser?.profile?.fullName}</h2>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/20 capitalize">{currentUser?.role}</span>
                                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-bold">
                                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                                    Submitted {new Date(currentUser?.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-8">
                        {/* Professional Credentials Section */}
                        <section className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                            <h3 className="font-black dark:text-white uppercase tracking-tight flex items-center gap-3 mb-8">
                                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">work_history</span>
                                </div>
                                Profile Details
                            </h3>
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bio</p>
                                    <p className="text-sm font-bold dark:text-white">{currentUser?.profile?.bio || 'No bio provided.'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</p>
                                        <p className="text-sm font-bold dark:text-white uppercase">{currentUser?.profile?.talentCategory || 'N/A'}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</p>
                                        <p className="text-sm font-bold dark:text-white">{currentUser?.profile?.location || 'Not set'}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-card-dark rounded-3xl p-8 border border-slate-200 dark:border-white/5 shadow-xl sticky top-8">
                            <h3 className="font-black dark:text-white uppercase tracking-tight flex items-center gap-3 mb-8">
                                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">admin_panel_settings</span>
                                </div>
                                Decision Panel
                            </h3>
                            <div className="mb-8 text-sm font-bold text-slate-500">
                                This user is currently awaiting verification.
                            </div>
                            <div className="space-y-4">
                                <button 
                                    onClick={() => handleAction(true)}
                                    className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="material-symbols-outlined text-sm">check_circle</span>
                                    Approve Verification
                                </button>
                                <button 
                                    onClick={() => handleAction(false)}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="material-symbols-outlined text-sm">cancel</span>
                                    Reject Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VerificationReview;
