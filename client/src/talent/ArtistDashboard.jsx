import React from 'react';

const ArtistDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-72 flex-shrink-0 bg-white dark:bg-card-dark border-r border-slate-200 dark:border-border-dark flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined font-bold">movie</span>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none">STARCAST</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">India • Artist</p>
          </div>
        </div>
        <nav className="flex-1 px-4 mt-4 space-y-1">
          <a className="sidebar-active flex items-center gap-3 px-4 py-3 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined fill-1">dashboard</span>
            <span className="text-sm font-semibold">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm font-medium">My Profile</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">work</span>
            <span className="text-sm font-medium">Applied Projects</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">event_available</span>
            <span className="text-sm font-medium">Audition Invites</span>
            <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">chat</span>
            <span className="text-sm font-medium">Messages</span>
          </a>
          <div className="pt-8 pb-2 px-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">Preferences</p>
          </div>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-primary/10 dark:bg-primary/5 border border-primary/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">stars</span>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Pro Artist</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Upgrade to get featured in top agency searches.</p>
            <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">Upgrade Plan</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              className="w-full bg-slate-100 dark:bg-card-dark border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200"
              placeholder="Search projects, casting directors..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:border-border-dark"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold leading-none dark:text-slate-100">Aryan Sharma</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-500 font-medium">Actor • Mumbai, IN</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-colors">
                <img
                  alt="Profile Thumbnail"
                  className="w-full h-full rounded-full object-cover"
                  data-alt="Portrait of a handsome male actor Aryan Sharma"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNTHx3MxgRqEdzHsDyrdjeedyNK4KhY61xveSfuKaNroa8BU2VCMGvaxLty1UGGfQZaSVskFq208YCwepV3VMWtAeJjRV_uVM6uz__o0cFtqF97Ez89qFtJhkCKSR1RM0Fmo9WtRpLGHmPuEVZ-dz57MmPQ05NFBwO9dg9xP9xEgbG8zyufQgakQ2CKqvgbUWxy34NlBHjdXR_CR1uuqu0rCIFm-YMpjIVmc2g6VyUzgVpEzwqaorp6qACko1klaSGSyHuwXyp1nFL"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Welcome Banner */}
          <section className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-card-dark p-10 text-white border border-white/5">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-4xl font-black mb-4 leading-tight">
                  Hello Aryan, you have <span className="text-primary">3 new audition invites</span> today!
                </h2>
                <p className="text-slate-400 text-lg">Your profile has been shortlisted for a major OTT series and two commercial projects. Break a leg!</p>
                <div className="flex gap-4 mt-8">
                  <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-transform active:scale-95">
                    <span className="material-symbols-outlined">send</span> View Invites
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl font-bold hover:bg-white/20 transition-all">
                    Update Portfolio
                  </button>
                </div>
              </div>
              <div className="hidden lg:block w-48 h-48 relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <img
                  alt="Dashboard Illustration"
                  className="relative z-10 drop-shadow-2xl"
                  data-alt="Stylized 3D cinematic camera icon floating"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR8ROtSqiuCa9EuAEsjD36hMzCTgk9m3BbUCnMt2agd8pBu7YM74aPumqdVdV8fnWFF8aWrhm1Xrx1Ac_X9vQRPp4vyIKdRg6uRWwpWXYV0hjoQbs0Hg8ooemFU3FEeFhoKs3md52FyBqoSJzs7rsJCwXMOtaUEpdEjN9wh7ysfkutRGGYT5voE-LXovuhcWh1ug5tvuHNOxyrSQ2CApicCXZSJ0hxK402LugHDJSdj9a8bYbHmByUjgDi64BV8xhoz3KPjH3zMHjY"
                />
              </div>
            </div>
          </section>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">description</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Applications</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black dark:text-white leading-none">24</h3>
                  <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md flex items-center">+12%</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Audition Invites</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black dark:text-white leading-none">5</h3>
                  <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md flex items-center">+3%</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-slate-200 dark:border-border-dark flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Profile Views</p>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black dark:text-white leading-none">1.2k</h3>
                  <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-md flex items-center">+18%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Applications */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold dark:text-white">Active Applications</h2>
                <button className="text-sm font-bold text-primary hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {/* Project 1 */}
                <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl p-5 hover:border-primary/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-28 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                      <img
                        alt="The Last Dynasty Poster"
                        className="w-full h-full object-cover"
                        data-alt="Epic historical drama movie poster silhouette"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzu3RvPO8e97N5KirysETT1iWRLASA6hW3i21Q9BnSKIUPNVnY9PCo8qrPFJnujEAi91noZi0EsNgdRQfe7HBY4uzzY3QATjzVRAbeXnd5x5_VQzteMwX6-w9lkBua8F2S33ZIHi3cRSn-fjtJBDYdMiQRTffAxY2u1z8cI0lMMM6nfMoDb3xtepPvyQsHxDiFmHxr_vsgNoRZd4yYZ2sdiNzG-16yhwGySD1LK3OBpSMA-wCFUIYMUdIqg4F9a7dij1hqmV9ANKjD"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">The Last Dynasty</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Empire Films Production • Period Drama</p>
                        </div>
                        <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary/20">
                          Shortlisted
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">location_on</span> Mumbai
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">person</span> Lead Actor
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">calendar_today</span> Applied: Oct 12
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full border-2 border-white dark:border-card-dark bg-slate-300"></div>
                          <div className="w-6 h-6 rounded-full border-2 border-white dark:border-card-dark bg-slate-400"></div>
                          <div className="w-6 h-6 rounded-full border-2 border-white dark:border-card-dark bg-slate-500 flex items-center justify-center text-[8px] text-white">
                            +8
                          </div>
                        </div>
                        <button className="text-xs font-bold px-4 py-1.5 bg-slate-100 dark:bg-white/5 dark:text-slate-300 rounded-lg hover:bg-primary hover:text-white transition-all">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl p-5 hover:border-primary/50 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-28 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                      <img
                        alt="Soft Drink Ad"
                        className="w-full h-full object-cover"
                        data-alt="Vibrant commercial photography of a refreshing splash"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGlAEA9euLWW9Chq4oz8A6uBrXikMveQt124Ly_6O6lagc0DAidCfH_AOdt7NBfzi0Rmhci23CRElAcPFI0RHwqJavPb2NmibTqkw-SZuKbEyulOmVgSVYQ767H5Zf0sQmTuWmi30DqWN-JIYu9R_GxQ4tgB_g4mvAuJHG7w9rz1lj-vFB9cFm5N1-K4NzCqQIGmJhOlLzumOdSdwcYFbtPgdd1LUiBIckRVbarSKN8Xf7Hh9q9rDYRLyDBEtIuUPj12-XIle-uwCZ"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Soft Drink Ad</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Vibrant Media • TV Commercial</p>
                        </div>
                        <span className="px-3 py-1 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded-full">
                          Applied
                        </span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">location_on</span> Bengaluru
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">person</span> Supporting Role
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">calendar_today</span> Applied: Oct 20
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 italic">Expected reply in 3 days</p>
                        <button className="text-xs font-bold px-4 py-1.5 bg-slate-100 dark:bg-white/5 dark:text-slate-300 rounded-lg hover:bg-primary hover:text-white transition-all">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-8">
              {/* Profile Strength Widget */}
              <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-4">Profile Strength</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-slate-100 dark:text-white/5" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeWidth="8"></circle>
                      <circle className="text-primary" cx="40" cy="40" fill="transparent" r="36" stroke="currentColor" strokeDasharray="226.2" strokeDashoffset="67.8" strokeWidth="8"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black">70%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">Almost there, Aryan!</p>
                    <p className="text-xs text-slate-500 mt-1">A complete profile gets 5x more invites.</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Action Required</p>
                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-xl">play_circle</span>
                    <div>
                      <p className="text-xs font-bold">Add a showreel</p>
                      <p className="text-[10px] text-slate-500">Video reels increase profile views by 40%.</p>
                    </div>
                    <button className="ml-auto text-primary text-xs font-black">→</button>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                    <span className="material-symbols-outlined text-slate-400 text-xl">photo_library</span>
                    <div>
                      <p className="text-xs font-bold">Update headshots</p>
                      <p className="text-[10px] text-slate-500">Your last photo update was 6 months ago.</p>
                    </div>
                    <button className="ml-auto text-slate-400 text-xs font-black">→</button>
                  </div>
                </div>
              </div>

              {/* Upcoming Auditions */}
              <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Upcoming Auditions</h2>
                  <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                </div>
                <div className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-primary">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
                    <p className="text-[10px] font-black text-primary uppercase">Tomorrow • 2:00 PM</p>
                    <h4 className="text-sm font-bold mt-0.5">The Last Dynasty</h4>
                    <p className="text-xs text-slate-500">Final Callback Audition • Studio 4B</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-md">View Script</button>
                      <button className="px-3 py-1 bg-slate-100 dark:bg-white/5 text-[10px] font-bold rounded-md">Map</button>
                    </div>
                  </div>
                  <div className="relative pl-6 border-l-2 border-slate-200 dark:border-border-dark">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Oct 26 • 11:30 AM</p>
                    <h4 className="text-sm font-bold mt-0.5">Soft Drink Ad</h4>
                    <p className="text-xs text-slate-500">Preliminary Screen Test • Virtual</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="px-3 py-1 bg-slate-100 dark:bg-white/5 text-[10px] font-bold rounded-md">Join Zoom</button>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors border-t border-slate-100 dark:border-white/5 pt-4">
                  See Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtistDashboard;
