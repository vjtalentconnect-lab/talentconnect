import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProfile } from '../services/profileService';
import MediaUpload from '../components/common/MediaUpload';
import DashboardLayout from '../components/layout/DashboardLayout';
import { TALENT_MENU } from '../constants/navigation';
import NotificationCenter from '../components/common/NotificationCenter';

const TalentPortfolio = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      setProfile(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUploadSuccess = (updatedProfile) => {
    setProfile(updatedProfile);
  };


  const userData = {
    name: profile?.fullName || 'Artist',
    roleTitle: `${profile?.talentCategory || 'Actor'} • ${profile?.location || 'India'}`,
    avatar: profile?.profilePicture === 'no-photo.jpg'
      ? 'https://ui-avatars.com/api/?name=' + (profile?.fullName || 'User')
      : profile?.profilePicture
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-background-dark"><span className="material-symbols-outlined animate-spin text-primary text-5xl">sync</span></div>;

  return (
    <DashboardLayout
      menuItems={TALENT_MENU}
      userRole="India • Artist"
      userData={userData}
      headerTitle="Talent Portfolio"
      headerSubtitle="Showcasing your creative journey."
      searchPlaceholder="Search projects..."
      noPadding={true}
    >
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            alt="Main Portrait"
            className="w-full h-full object-cover object-top opacity-80"
            src={profile?.profilePicture === 'no-photo.jpg' ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80' : profile?.profilePicture}
          />
          <div className="absolute inset-0 cinematic-gradient"></div>
          <div className="absolute top-8 right-8 z-20">
            <MediaUpload type="profilePicture" onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/20 border border-primary text-primary text-xs font-black tracking-[0.2em] uppercase rounded mb-4">
                  Leading Talent
                </span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-2 uppercase italic">
                  {profile?.fullName || 'Your Name'}
                </h2>
                <p className="text-xl md:text-2xl text-primary font-bold tracking-wide italic">
                  {profile?.talentCategory || 'Artist'} • {profile?.location || 'India'}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="glass-card px-8 py-4 rounded-xl text-center min-w-[120px]">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Height</p>
                  <p className="text-2xl font-bold text-white tracking-tight italic">6'1"</p>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl text-center min-w-[120px]">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Eyes</p>
                  <p className="text-2xl font-bold text-white tracking-tight italic">Amber</p>
                </div>
                <div className="glass-card px-8 py-4 rounded-xl text-center min-w-[120px]">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Skin</p>
                  <p className="text-2xl font-bold text-white tracking-tight italic">Fair</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography & Attributes */}
      <section className="py-24 px-6 bg-[#0f1115]" id="biography">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-2 italic">
              <span className="w-8 h-[2px] bg-primary"></span>
              Professional Biography
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-slate-300 font-light italic mb-8">
              "Cinema is not just about acting; it's about the truth found in the silence between words."
            </p>
            <div className="space-y-6 text-slate-400 leading-loose text-lg">
              <p>
                {profile?.bio || 'Tell the world about your journey. Share your professional background, training, and what drives your passion for the arts.'}
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface-dark p-8 rounded-2xl border border-white/5">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter italic">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Physical Attributes
              </h4>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Hair Color</p>
                  <p className="font-bold text-sm uppercase tracking-tight">Black (Wavy)</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Build</p>
                  <p className="font-bold text-sm uppercase tracking-tight">Athletic/Lean</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Waist</p>
                  <p className="font-bold text-sm uppercase tracking-tight">32 inches</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Chest</p>
                  <p className="font-bold text-sm uppercase tracking-tight">42 inches</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-dark p-8 rounded-2xl border border-white/5" id="skills">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter italic">
                <span className="material-symbols-outlined text-primary">military_tech</span>
                Core Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile?.skills?.length > 0 ? (
                  profile.skills.map((skill, idx) => (
                    <span key={idx} className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider">{skill}</span>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">No skills added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-24 bg-surface-dark" id="gallery">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-2 flex items-center gap-2 italic">
                Visual Portfolio
              </h3>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Stills &amp; Portraits</h2>
            </div>
            <div className="flex items-center gap-4">
              <MediaUpload type="portfolio" onUploadSuccess={handleUploadSuccess} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {profile?.portfolios?.length > 0 ? (
              profile.portfolios.map((item, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-slate-100 dark:bg-white/5 border border-white/10 shadow-xl">
                  {item.type === 'video' ? (
                    <video src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" muted loop onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} />
                  ) : (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <h4 className="text-white font-black uppercase text-sm italic tracking-tighter">{item.title}</h4>
                    <p className="text-primary text-[10px] uppercase font-black tracking-[0.2em] mt-1">{item.type}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-4">image</span>
                <p className="text-slate-500 uppercase tracking-widest font-black text-xs">Your portfolio is empty. Add your best work!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Film Credits */}
      <section className="py-24 px-6 bg-[#0f1115]" id="credits">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-12 flex items-center gap-2 italic">
            <span className="w-8 h-[2px] bg-primary"></span>
            Performance Credits
          </h3>
          <div className="space-y-24">
            <div>
              <div className="flex items-center gap-4 mb-12">
                <img src="/TC Logo.png" alt="Logo" className="h-10 w-auto" />
                <h4 className="text-3xl font-black uppercase tracking-tighter italic text-white underline decoration-primary underline-offset-8">Feature Films</h4>
              </div>
              <div className="overflow-hidden">
                <table className="w-full text-left">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Project Title</th>
                      <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Role</th>
                      <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Production / Director</th>
                      <th className="py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Year</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="group hover:bg-white/5 transition-all">
                      <td className="py-8 font-black group-hover:text-primary transition-colors uppercase tracking-tight italic">THE MIDNIGHT ECHO</td>
                      <td className="py-8 text-slate-300 font-bold uppercase tracking-widest text-[11px]">Sameer (Lead)</td>
                      <td className="py-8 text-slate-400 font-black uppercase tracking-widest text-[10px]">Excel Entertainment / Zoya Akhtar</td>
                      <td className="py-8 text-slate-500 text-right font-black">2023</td>
                    </tr>
                    <tr className="group hover:bg-white/5 transition-all">
                      <td className="py-8 font-black group-hover:text-primary transition-colors uppercase tracking-tight italic">RUSTY GEARS</td>
                      <td className="py-8 text-slate-300 font-bold uppercase tracking-widest text-[11px]">Vikram (Supporting Lead)</td>
                      <td className="py-8 text-slate-400 font-black uppercase tracking-widest text-[10px]">Phantom Films / Anurag Kashyap</td>
                      <td className="py-8 text-slate-500 text-right font-black">2022</td>
                    </tr>
                    <tr className="group hover:bg-white/5 transition-all">
                      <td className="py-8 font-black group-hover:text-primary transition-colors uppercase tracking-tight italic">BEYOND THE HORIZON</td>
                      <td className="py-8 text-slate-300 font-bold uppercase tracking-widest text-[11px]">Anand (Antagonist)</td>
                      <td className="py-8 text-slate-400 font-black uppercase tracking-widest text-[10px]">Dharma Productions / Karan Johar</td>
                      <td className="py-8 text-slate-500 text-right font-black">2021</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Contact */}
      <section className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">Ready for the Next Blockbuster</h2>
          <p className="text-white/80 text-xl font-bold max-w-2xl mx-auto uppercase tracking-wide">
            Currently accepting leads for character-driven features and international series.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <button className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-900 transition-all shadow-2xl transform hover:-translate-y-1 active:scale-95">
              Contact Manager
            </button>
            <button className="bg-white text-primary px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-2xl transform hover:-translate-y-1 active:scale-95">
              View Showreel
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default TalentPortfolio;
