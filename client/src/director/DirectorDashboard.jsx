import React from 'react';
import { Link } from 'react-router-dom';

const DirectorDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar Navigation */}
      <aside className="w-72 flex-shrink-0 bg-background-dark border-r border-white/5 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined font-bold">movie</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none text-slate-900 dark:text-white">TalentConnect</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">India • Admin</p>
          </div>
        </div>
        <nav className="flex-1 px-4 mt-4 space-y-1">
          <a className="sidebar-active flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm uppercase tracking-widest" href="#">
            <span className="material-symbols-outlined fill-1">dashboard</span>
            <span className="text-sm font-semibold">Dashboard</span>
          </a>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-semibold text-sm uppercase tracking-wider" to="/director/my-projects">
            <span className="material-symbols-outlined">folder</span>
            <span className="text-sm font-medium">My Projects</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-semibold text-sm uppercase tracking-wider" to="/director/shortlists">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="text-sm font-medium">Shortlists</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-semibold text-sm uppercase tracking-wider" to="/director/auditions">
            <span className="material-symbols-outlined">mic</span>
            <span className="text-sm font-medium">Audition Requests</span>
            <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">8</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-semibold text-sm uppercase tracking-wider" to="/director/messages">
            <span className="material-symbols-outlined text-sm">chat</span>
            <span className="text-sm font-medium">Messages</span>
          </Link>
        </nav>
        <div className="p-4 mt-auto">
          <Link to="/director/create-project/step1" className="w-full py-3.5 bg-primary text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">add_circle</span>
            Create Project
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              className="w-full bg-surface-dark border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-slate-200"
              placeholder="Search talent, projects or casting calls..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:border-border-dark"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-black uppercase tracking-tight text-white">Rohan Mehra</p>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1">Lead Director</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-colors">
                <img
                  className="w-full h-full rounded-full object-cover"
                  data-alt="Director profile headshot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-8S-aeuR2cORz2aKmlcoRCZG0vX3wrCerglNjBZAeRTyWFtdCwCVgW2iau6r9ehLrZVdI8FCvYXugQN5g0iwxAp0y0a9DKiit2XmW7WKPzqsjSZb23GH1WfBIs3CwD2BV5JgiHEA7RJccg4NGPWqIKlO7EjA6wyORiH7n3g1MwegFrrf7ovbugGps3ElIcbYbaEJb-Rgshm_LVUyOQQOsWt3Lf1te1KVr8F6VcVTewalCyMztq1GlKktZMvh7wHTp2HgBgHIXuiFI"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar max-w-7xl mx-auto space-y-12 p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Shortlisted</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter">1,284</h3>
                  <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md flex items-center">+12%</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-3xl">pending_actions</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Auditions</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter">42</h3>
                  <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded-md flex items-center">8 Urgent</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/5 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Confirmed Cast</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black dark:text-white leading-none tracking-tighter">85</h3>
                  <span className="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded-md">Projects: 12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Projects */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                Active Projects
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] uppercase tracking-widest rounded-full">Live</span>
              </h2>
              <button className="text-sm font-semibold text-primary hover:underline">View All Projects</button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
              {/* Project Card 1 */}
              <div className="min-w-[320px] bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="h-36 bg-slate-800 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWfqM6aEaH0v4Ctl2lqZgUk4xNUaiNOX4325WVXMMqopL7qD2rylJG61KtkpTkyqLfUP-MYEnFhOPCtcNxwUsmTf7-rH35p5brbsgYPYcbeOWm5YIrNhbe1BCTp1_KGMRjWY-00KT9nLzTrSu79yrTji9h6Bo7AiCVbEf7tHfnLYii3NIIliF17RmeSZufkGSwf-zbuSLkIeOrK58bVgJM4RbTM3f3gyjNg8Acp3Pp-pb2oL4X9DFF-yAZXUeq4GRfFVqQS7a2QcSo')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      Feature Film
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">The Last Dynasty</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Historical Period Drama • Pan-India</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Casting Progress</span>
                    <span className="text-xs font-bold text-primary">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(236,91,19,0.5)]" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              {/* Project Card 2 */}
              <div className="min-w-[320px] bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="h-36 bg-slate-800 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJjlmhieAOdJiipI1b7GCcDGRtG8Mz3kUEZpmYq1hmRdE3CAifSxtpqhVNHDyEzDF5WssZFKpA2FbQ1kqtfTqKkPcPqRAkLvfD55nnicJ5xSeSeQEB6NpVr44NdFMAkBY9eaVzxu-JmsEOBc3RZFGHRGSHdR4ye5dWV_vWhHzUI6IdxkCKdnCfFwnQPQX1Avfej-5RRc361FCW53DHfHf2c5h-9ZNvcyg_e1NiyUq_pGPFUzd4bd-AHkna1_lnCZ3lWgJHPUXFB7Yn')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2 py-1 bg-amber-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      Commercial
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Soft Drink - Summer Ad</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Urban Lifestyle • TV &amp; Social Media</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Casting Progress</span>
                    <span className="text-xs font-bold text-primary">40%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(236,91,19,0.5)]" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
              {/* Project Card 3 */}
              <div className="min-w-[320px] bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="h-36 bg-slate-800 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVeyv7LmXqREXmRkeAWMF0idmFs3AAgrUZUhq7eNAQbsIRgo_icgHqNH5yq9VZFyZ3GtGC8BUhpzr4qqNodCKnot2ij4_IzdMcB8upHgz98QTf7rJdHeR-lmXJZT3NrX8r4R9wSwuGTpV5NlpovP-zkenzdLvvsf3JGc7u_XWTtjxoNvkT1XtJmDM_I68wXZAARJrh2GBiK9GL4OIJ9cHXN4kul0LQvSTBG3oJxaCA7pZ3mUyi9ZPy9XVnydNnrHmecsvAb-7Z08n7')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2 py-1 bg-purple-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      Web Series
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Urban Legends</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Suspense Thriller • OTT Platform</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Casting Progress</span>
                    <span className="text-xs font-bold text-primary">15%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(236,91,19,0.5)]" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
              {/* Project Card 4 */}
              <div className="min-w-[320px] bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all">
                <div className="h-36 bg-slate-800 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-7VxJhRsdyxc3S1Qh3gTfaz00tdvqACWGZe4ncEGt6KNekxowT1I2Bu2vcTEXC9dWalq9zef51MN7uUpeMAEFztT0GFkm-8JHFph2yq6XvmqsHxIQDoRNbuLsNIYdKYCt2rX_oFszR3g3mAJTqrzVDtFTk7VM4GmaY0FroBKI3EENzIEjFFFeDHYGypVWzXbH-AUT5l5Oq0KA-uaBVKDkZvDdelrXnqnqT1iKxo8ma2D6Az8LSbxgX1eK4XJD1lRJl6F2BkuJpaft')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      Feature Film
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">The Last Dynasty</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Historical Period Drama • Pan-India</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Casting Progress</span>
                    <span className="text-xs font-bold text-primary">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(236,91,19,0.5)]" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Shortlisted Talents View */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">Recent Shortlists</h2>
                <div className="flex bg-slate-100 dark:bg-card-dark rounded-xl p-1 border border-slate-200 dark:border-border-dark">
                  <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-white/10 text-primary rounded shadow-sm">Grid View</button>
                  <button className="px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-500 hover:text-primary">List View</button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-surface-dark border border-white/10 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest text-white hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-sm">filter_alt</span> Filter
                </button>
                <button className="flex items-center gap-2 bg-surface-dark border border-white/10 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest text-white hover:border-primary transition-all">
                  <span className="material-symbols-outlined text-sm">sort</span> Sort
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Artist Card 1 */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Professional actor headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLYp_XfeL-orI8XcrCRdO1AnTOKeAB7-yfwUGYVWhucYLUaG37OtJlNyL40rrBQ6modrbUj4bLYcYVSDkdBHVfcTLWKr4hcZSb7Ey78SL_-TNLGgng5UWRqlWSusV4UKVF5ZpHNVzdxRNDsqaAhz4u5QeG9xFv9BzrDAjAQNavfyfafA_THv6Dawi8FJj7g-AhWDAh-Na8xGac0mjxYs8FCAGH0CcIomPvkMpq1573qVYNQvhdW3njPRmyckqOHwM_gO-8JNXKKe72" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] fill-current text-primary">star</span> 4.9
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-red-500 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 px-4">
                    <button className="w-full bg-white text-primary font-bold py-2 rounded-xl text-sm hover:bg-slate-50">View Profile</button>
                    <button className="w-full bg-primary text-white font-bold py-2 rounded-xl text-sm hover:bg-primary/90">Invite Audition</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">Aryan Sharma</h4>
                    <span className="text-[10px] font-bold uppercase text-primary px-2 py-0.5 bg-primary/10 rounded">Shortlisted</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Lead Male • 22-28 yrs</p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-border-dark pt-3">
                    <span>Mumbai</span>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
              {/* Artist Card 2 */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Professional actress headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZBh7xbmWXrUAEm9h_1ydGDzcwhkdf2YsWZp51N2W5XLxLEDgcMM6_Q45uwNDRWlrN5uP1ZiIRnpXEF7ybhmP1q5LoCKX1DqTBo1iFqLVvULs9X9FwpvYjvqJYtCOABdgcjL3SaQFmqbvF0LMm5WIQSQZ5JJ_o3nx2j-eArSXFm8CzB1jHApIMexXGYK0s1pJ_lefBSJ0KF9s5HWKmGW0HD53HMUGYvJMLsDE0uJcZgi5VJ_N24uHuMDEfE1yzidlc_YOWqp8sEBL5" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] fill-current text-primary">star</span> 4.8
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-red-500 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 px-4">
                    <button className="w-full bg-white text-primary font-bold py-2 rounded-xl text-sm hover:bg-slate-50">View Profile</button>
                    <button className="w-full bg-primary text-white font-bold py-2 rounded-xl text-sm hover:bg-primary/90">Invite Audition</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">Kiara Advani</h4>
                    <span className="text-[10px] font-bold uppercase text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded">Contacted</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Supporting Female • 25-30 yrs</p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-border-dark pt-3">
                    <span>Delhi</span>
                    <span>Star Elite</span>
                  </div>
                </div>
              </div>
              {/* Artist Card 3 */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Charismatic actor headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY5_xh61Ha6V8MRXMuofOo64PTkj3IyPuYjk6uCHwk1p8iwU1ycCql7G9Y_EK0UrGH4vZ8a4OsgKiBrTHMuyuvUHgjCIAvige_W13Pr_WF1ofwzBggz6gxrQo_m_tUJb93iYB3BPxUqyBsI2d8VXKYptCgUaKc0EQP952hcMMX3BURzCIZupaaRNZA3W94MVoUg9_496eh6EB7sqILQ9jliHKAEotUfXq0160edcDKmPh5LPeT5Wbd3qyDL-oPKSDQ-8UbpglOkifn" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] fill-current text-primary">star</span> 5.0
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-red-500 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 px-4">
                    <button className="w-full bg-white text-primary font-bold py-2 rounded-xl text-sm hover:bg-slate-50">View Profile</button>
                    <button className="w-full bg-primary text-white font-bold py-2 rounded-xl text-sm hover:bg-primary/90">Invite Audition</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">Vikram Rathore</h4>
                    <span className="text-[10px] font-bold uppercase text-orange-500 px-2 py-0.5 bg-orange-500/10 rounded">Auditioning</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Villain Role • 35-45 yrs</p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-border-dark pt-3">
                    <span>Bangalore</span>
                    <span>Pro Talent</span>
                  </div>
                </div>
              </div>
              {/* Artist Card 4 */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Upcoming actor headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-7VxJhRsdyxc3S1Qh3gTfaz00tdvqACWGZe4ncEGt6KNekxowT1I2Bu2vcTEXC9dWalq9zef51MN7uUpeMAEFztT0GFkm-8JHFph2yq6XvmqsHxIQDoRNbuLsNIYdKYCt2rX_oFszR3g3mAJTqrzVDtFTk7VM4GmaY0FroBKI3EENzIEjFFFeDHYGypVWzXbH-AUT5l5Oq0KA-uaBVKDkZvDdelrXnqnqT1iKxo8ma2D6Az8LSbxgX1eK4XJD1lRJl6F2BkuJpaft" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px] fill-current text-primary">star</span> 4.7
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-red-500 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 px-4">
                    <button className="w-full bg-white text-primary font-bold py-2 rounded-xl text-sm hover:bg-slate-50">View Profile</button>
                    <button className="w-full bg-primary text-white font-bold py-2 rounded-xl text-sm hover:bg-primary/90">Invite Audition</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">Sameer Khanna</h4>
                    <span className="text-[10px] font-bold uppercase text-slate-500 px-2 py-0.5 bg-slate-500/10 rounded">Shortlisted</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Child Artist • 8-12 yrs</p>
                  <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-border-dark pt-3">
                    <span>Mumbai</span>
                    <span>Newcomer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <button className="flex items-center gap-2 px-10 py-4 bg-surface-dark border border-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-zinc-900 transition-all shadow-xl">
                Load More Talent
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DirectorDashboard;
