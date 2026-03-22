import React from 'react';

// Fallback sample data
const sample = {
  name: 'Aryan Sharma',
  tagline: 'Method Actor • Martial Artist • Mumbai, India',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrrl0A0OXS1pUeFeLaqzZQT9jsSwDjwZQu3ySYpY4kkVgTQQ6Rgc9J660-9MfKUxFP1SOjFD3sCAPfuNz1Ktniclnx4XG4KHxD_zZPBfjXgOrLoDh2blfztG9ab_D298UjxOeXOpnAzZZC5Zgbo0Dgw37bpL3LmHCPaoeX6cqxZEEHI6UPm12v53-Ffw1blrs-j8uJy96Q1YBiwg6teDphvcfdcXDCQgQ0rssjTeoXqZz69lHIGdxkZsbDzhZCXnsvjCCWN2Fq0UkA',
  physical: { height: "6'1\"", eyes: 'Amber', skin: 'Fair', hair: 'Black (Wavy)', build: 'Athletic/Lean', waist: '32 inches', chest: '42 inches' },
  bioQuote: 'Cinema is not just about acting; it\'s about the truth found in the silence between words.',
  bioParas: [
    'Classically trained actor with a decade of experience across independent cinema, international streaming platforms, and major theatrical releases. Graduate of the National School of Drama with intense physical preparation and nuanced emotional depth.',
    'Certified practitioner of Kalaripayattu, stunt choreography for action thrillers, bilingual fluency and cross‑cultural background for diverse storytelling.'
  ],
  skills: ['Kalaripayattu', 'Parkour', 'Sword Fighting', 'Contemporary Dance', 'Horse Riding', 'Fluent Hindi/English'],
  gallery: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBig6lCTHZqQ8376-glgfT9yl3_6r3QDPnhgpgAiFUTe1GSPwh3k1GTTEAlHe5bCTEy5VZ4pAe6hWbfKK4E2WA2o2SVdb7R0vS8toD-2g-fmokXXzjrFmB1-N_9pFIs2NUd-vaP4lBq2i32VVr25eLge_wpZWwK-baUyrO3TpR1nN-bnTZN-OuhSx-50WlcqP6iH1_mcL9OulThVJGzfMCjnuoDEs2WpRd4t4HgjEFQ7SIicTomxVlckTOEpZTQp0iGX0jcNVZrz9Zp',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBSzhZoXtbwhtxKaZqTqqFZxOoooChcofJcdQDryDwg-e_C8u1dUK2X5NVB4Qs21YwFFnIUEFCN8l779KdTY_jgLJvUEboVXW9bxMEmTw6ZjSUlqb6XJXRvPu4AyvrTGlCvuINTd3l_pimLsD2QLTVZeUl_CpOQxVeervaxPf6tMNG9lNdRFK8HdyDKSvpHba-YNIAiW4cAHVoUAMQJB6fNIzgXmLqTH9j12ft8UjCiN40pi9vr3z4-jRCxhkfDqVLUIRQZPU8A92d',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAGX95sNCCyCi8TcgvQFRbyhVg7NRzcZWrg0B-VyIXy8TiefkBVu0q50Fqg-sNfFVzwwBWnqZ9GVThIU499icj_K-bknoaEYepMoGjkrS8HBKRaA4Yo4rsV5LnKhVR9bUZshCo1t8fP-oICLbEls3mnWPhBZTTWCzav6eQ-W0Twt7gnYyRATy1mrulZlLUGSQjUalwDr0Tgxlioalq9BMslOtKVJc7tE2AyHzDwprXGeHpcXoR8xMLsbGbDqf9U0LQJ8U4hQibbIoqM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC1LeUjD6cZxvVk3LCPjHWsLySa2B9GAOLGlJsVtcC7wSrUcOk3jZIlGfZ59BkAnu4NhreMhkHzqX9vkx0SNmFfIMRltlmNzYW8FC4-luiXefj-_FEaaglScEuT4aLTZiAWw8SIgs_LGEYHqzQxaP7klbW5BaMPdsADIxH363uDrgsakx-gLM7Wk7SDCby5oPI3A4MXRsbhzAfHTXvwhUwMIgvKdL8KpfjSNK57DaIOtEawO2EcDtLj3r7yMlU3kt08VQuoXHcsodSF',
  ],
  credits: [
    { title: 'THE MIDNIGHT ECHO', role: 'Lead', prod: 'Excel Entertainment / Zoya Akhtar', year: '2023' },
    { title: 'RUSTY GEARS', role: 'Supporting Lead', prod: 'Phantom Films / Anurag Kashyap', year: '2022' },
    { title: 'BEYOND THE HORIZON', role: 'Antagonist', prod: 'Dharma Productions / Karan Johar', year: '2021' },
  ],
};

const PortfolioTemplate = ({ profile }) => {
  // Map profile to template-friendly fields with fallbacks
  const data = {
    name: profile?.fullName || sample.name,
    tagline:
      profile?.tagline ||
      `${profile?.talentCategory || 'Actor'} • ${profile?.skills?.slice(0, 2).join(' / ') || 'Performer'} • ${
        profile?.location || 'Mumbai, India'
      }`,
    heroImage: profile?.heroImage || profile?.profilePicture || sample.heroImage,
    physical: {
      height: profile?.height || sample.physical.height,
      eyes: profile?.eyeColor || sample.physical.eyes,
      skin: profile?.skinTone || sample.physical.skin,
      hair: profile?.hairColor || sample.physical.hair,
      build: profile?.build || sample.physical.build,
      waist: profile?.waist || sample.physical.waist,
      chest: profile?.chest || sample.physical.chest,
    },
    bioQuote: profile?.bioQuote || sample.bioQuote,
    bioParas: profile?.bio ? [profile.bio] : sample.bioParas,
    skills: profile?.skills?.length ? profile.skills : sample.skills,
    gallery: profile?.media && profile.media.length ? profile.media : sample.gallery,
    credits: profile?.credits && profile.credits.length ? profile.credits : sample.credits,
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-100 min-h-screen">
      <main className="pt-4">
        {/* Hero */}
        <section className="relative h-[70vh] w-full overflow-hidden bg-black">
          <div className="absolute inset-0">
            <img
              alt="Main Portrait"
              className="w-full h-full object-cover object-top opacity-80"
              src={data.heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-black/60 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/20 border border-primary text-primary text-xs font-black tracking-[0.2em] uppercase rounded mb-3">
                    Leading Talent
                  </span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2 uppercase">{data.name}</h2>
                  <p className="text-lg md:text-2xl text-primary font-medium tracking-wide">{data.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Height', value: data.physical.height },
                    { label: 'Eyes', value: data.physical.eyes },
                    { label: 'Skin', value: data.physical.skin },
                  ].map((item) => (
                    <div key={item.label} className="bg-black/40 border border-white/10 px-6 py-3 rounded-xl text-center min-w-[110px]">
                      <p className="text-[10px] text-slate-300 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-white tracking-tight">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio & attributes */}
        <section className="py-16 px-6 bg-background-dark" id="biography">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span> Professional Biography
              </h3>
              <p className="text-xl leading-relaxed text-slate-200 font-light italic mb-6">"{data.bioQuote}"</p>
              <div className="space-y-5 text-slate-300 leading-relaxed text-base">
                {data.bioParas.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary">analytics</span> Physical Attributes
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-sm">
                  {['hair', 'build', 'waist', 'chest'].map((k) => (
                    <div key={k}>
                      <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-1">{k}</p>
                      <p className="font-bold capitalize">{data.physical[k]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5" id="skills">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons text-primary">military_tech</span> Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill) => (
                    <span key={skill} className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-[#1a1a1a]" id="gallery">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-2">Visual Portfolio</h3>
                <h2 className="text-3xl font-black uppercase">Stills &amp; Portraits</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.gallery.slice(0, 8).map((src, idx) => (
                <img
                  key={idx}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  src={src}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="py-16 px-6 bg-background-dark" id="credits">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span> Performance Credits
            </h3>
            <div className="overflow-hidden bg-[#1a1a1a] rounded-2xl border border-white/5">
              <table className="w-full text-left">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="py-4 px-4 text-[11px] font-black uppercase tracking-widest text-slate-500">Project Title</th>
                    <th className="py-4 px-4 text-[11px] font-black uppercase tracking-widest text-slate-500">Role</th>
                    <th className="py-4 px-4 text-[11px] font-black uppercase tracking-widest text-slate-500">Production / Director</th>
                    <th className="py-4 px-4 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.credits.map((c, idx) => (
                    <tr key={idx} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold group-hover:text-primary transition-colors">{c.title}</td>
                      <td className="py-4 px-4 text-slate-300">{c.role}</td>
                      <td className="py-4 px-4 text-slate-400 font-medium">{c.prod}</td>
                      <td className="py-4 px-4 text-slate-500 text-right">{c.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PortfolioTemplate;
