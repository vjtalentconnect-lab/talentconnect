import DashboardLayout from '../components/layout/DashboardLayout';
import { useState, useEffect } from 'react';
import { getAdminProjects } from '../services/adminService';
import { getMyProfile } from '../services/profileService';

const ProjectOversight = () => {
    const menuItems = [
        { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin' },
        { icon: 'search', label: 'Global Search', path: '/admin/search' },
        { type: 'section', label: 'Management' },
        { icon: 'group', label: 'User Management', path: '/admin/users' },
        { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications', badge: '12' },
        { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects', active: true },
        { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
        { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
        { type: 'section', label: 'Operations' },
        { icon: 'payments', label: 'Financials', path: '/admin/financials' },
        { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
        { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
    ];

    const userData = {
        name: 'Vikram Mehta',
        roleTitle: 'Super Admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcjBsGHAwrFmfb__gFpz6fDozkV4Agv70tpFl3ivGVraqnDPQWIx8PMDFLfqfAA1rgn9vueYt4bahKNUaNwDF05nJUU7IKKpuqspPTDR-ls9jvfk61q4h-WhCk3NhzKm6pCW7PukUTFxa5u2USsiBYmS2xipP0FPzvVTP5aeKxz29Mf37iCgqSg_TbovnbEoy9_cK695CEPxJrGyOxI4f5UAwXfBzuWM8SziTzX_hcV7ayuyqSkBfx2ILTnqIpdc_47h9OaEq0AD9s'
    };

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Mocking data since admin projects endpoint might not be fully seeded
                setProjects([{
                    title: 'Dharma Productions: Untitled',
                    category: 'Feature Film',
                    director: { email: 'karan@dharma.com' },
                    budget: '₹45 Cr',
                    location: 'Mumbai, India',
                    status: 'In Audit'
                }]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-background-dark">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

    return (
        <DashboardLayout
            menuItems={menuItems}
            userRole="Admin Control"
            userData={userData}
            headerTitle="Project Oversight"
            headerSubtitle="Monitor and manage all platform projects."
            searchPlaceholder="Search projects, directors..."
        >
            <div className="space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-start">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Projects</span>
                            <span className="material-symbols-outlined text-primary">movie</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black dark:text-white">1,284</p>
                            <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">trending_up</span> +12%
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-start">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Casting</span>
                            <span className="material-symbols-outlined text-primary">person_search</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black dark:text-white">456</p>
                            <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">trending_up</span> +5%
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-start">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Production Value</span>
                            <span className="material-symbols-outlined text-primary">payments</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black dark:text-white">₹45.2 Cr</p>
                            <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">trending_up</span> +18%
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-start">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Completed</span>
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black dark:text-white">828</p>
                            <p className="text-emerald-500 text-xs font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">trending_up</span> +7%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="bg-white dark:bg-card-dark rounded-2xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-200 dark:border-border-dark flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20">All Projects</button>
                            <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-xs font-bold transition-all dark:text-slate-300">Film</button>
                            <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-xs font-bold transition-all dark:text-slate-300">Advertisement</button>
                            <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl text-xs font-bold transition-all dark:text-slate-300">Web Series</button>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-xs font-bold dark:text-slate-300">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-xl text-xs font-bold dark:text-slate-300">
                                <span className="material-symbols-outlined text-lg">file_download</span>
                                Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-white/5">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lead Team</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Budget Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Casting Progress</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                                {projects.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No projects found.</td>
                                    </tr>
                                ) : (
                                    projects.map((project, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-12 rounded-xl bg-primary/20 overflow-hidden shrink-0 border border-primary/10 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-primary">movie</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold dark:text-white uppercase tracking-tight">{project.title}</p>
                                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{project.category}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <p className="font-bold dark:text-slate-200">{project.director?.email || 'N/A'}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Director Account</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 text-emerald-500">
                                                    <span className="material-symbols-outlined text-base">payments</span>
                                                    <span className="text-xs font-black uppercase tracking-tight">{project.budget}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 min-w-[200px]">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                        <span className="text-primary">Status: {project.status || 'Active'}</span>
                                                        <span className="text-slate-500">{project.location}</span>
                                                    </div>
                                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                        <div className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(236,91,19,0.3)]" style={{ width: '50%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20">Active</span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button className="p-2 hover:bg-primary/10 rounded-lg text-slate-400 hover:text-primary transition-colors">
                                                        <span className="material-symbols-outlined text-xl">visibility</span>
                                                    </button>
                                                    <button className="p-2 hover:bg-amber-500/10 rounded-lg text-slate-400 hover:text-amber-500 transition-colors">
                                                        <span className="material-symbols-outlined text-xl">flag</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Showing 1 to 10 of 1,284 results</p>
                        <div className="flex gap-1.5">
                            <button className="size-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <button className="size-8 rounded-lg flex items-center justify-center bg-primary text-white text-[10px] font-black shadow-lg shadow-primary/20">1</button>
                            <button className="size-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 text-[10px] font-black hover:bg-slate-200 dark:hover:bg-white/10 transiton-all">2</button>
                            <button className="size-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 text-[10px] font-black hover:bg-slate-200 dark:hover:bg-white/10 transiton-all">3</button>
                            <span className="px-1 self-center text-slate-400 text-xs font-black">...</span>
                            <button className="size-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 text-[10px] font-black">128</button>
                            <button className="size-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProjectOversight;
