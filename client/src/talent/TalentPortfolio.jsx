const TalentPortfolio = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary/30">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary size-8">
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-extrabold tracking-tighter uppercase">
              StarCast <span className="text-primary">India</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <a
              className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors"
              href="#gallery"
            >
              Gallery
            </a>
            <a
              className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors"
              href="#credits"
            >
              Credits
            </a>
            <a
              className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors"
              href="#biography"
            >
              Bio
            </a>
            <a
              className="text-sm font-semibold tracking-widest uppercase hover:text-primary transition-colors"
              href="#skills"
            >
              Expertise
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-sm">download</span>
              Download CV
            </button>
            <button className="p-2.5 rounded-lg bg-surface-dark border border-white/10 hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full overflow-hidden bg-black">
          <div className="absolute inset-0">
            <img
              alt="Main Portrait"
              className="w-full h-full object-cover object-top opacity-80"
              data-alt="Close up dramatic cinematic portrait of a male actor"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrrl0A0OXS1pUeFeLaqzZQT9jsSwDjwZQu3ySYpY4kkVgTQQ6Rgc9J660-9MfKUxFP1SOjFD3sCAPfuNz1Ktniclnx4XG4KHxD_zZPBfjXgOrLoDh2blfztG9ab_D298UjxOeXOpnAzZZC5Zgbo0Dgw37bpL3LmHCPaoeX6cqxZEEHI6UPm12v53-Ffw1blrs-j8uJy96Q1YBiwg6teDphvcfdcXDCQgQ0rssjTeoXqZz69lHIGdxkZsbDzhZCXnsvjCCWN2Fq0UkA"
            />
            <div className="absolute inset-0 cinematic-gradient"></div>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/20 border border-primary text-primary text-xs font-black tracking-[0.2em] uppercase rounded mb-4">
                    Leading Talent
                  </span>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-2 uppercase">
                    Aryan Sharma
                  </h2>
                  <p className="text-xl md:text-2xl text-primary font-medium tracking-wide">
                    Method Actor • Martial Artist • Mumbai, India
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="glass-card px-8 py-4 rounded-xl text-center min-w-[120px]">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Height</p>
                    <p className="text-2xl font-bold text-white tracking-tight">6'1"</p>
                  </div>
                  <div className="glass-card px-8 py-4 rounded-xl text-center min-w-[120px]">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Eyes</p>
                    <p className="text-2xl font-bold text-white tracking-tight">Amber</p>
                  </div>
                  <div className="glass-card px-8 py-4 rounded-xl text-center min-w-[120px]">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Skin</p>
                    <p className="text-2xl font-bold text-white tracking-tight">Fair</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography & Attributes */}
        <section className="py-24 px-6 bg-background-dark" id="biography">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span>
                Professional Biography
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed text-slate-300 font-light italic mb-8">
                "Cinema is not just about acting; it's about the truth found in the silence between words."
              </p>
              <div className="space-y-6 text-slate-400 leading-loose text-lg">
                <p>
                  Aryan Sharma is a classically trained actor with a decade of experience across independent cinema, international streaming platforms, and major theatrical releases. A graduate of the National School of Drama, he has developed a reputation for intense physical preparation and nuanced emotional depth.
                </p>
                <p>
                  Beyond the screen, Aryan is a certified practitioner of Kalaripayattu and has performed stunt choreography for high-octane action thrillers. His bilingual fluency and cross-cultural background allow him to navigate diverse storytelling landscapes with ease.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-surface-dark p-8 rounded-2xl border border-white/5">
                <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Physical Attributes
                </h4>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Hair Color</p>
                    <p className="font-bold">Black (Wavy)</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Build</p>
                    <p className="font-bold">Athletic/Lean</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Waist</p>
                    <p className="font-bold">32 inches</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Chest</p>
                    <p className="font-bold">42 inches</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-dark p-8 rounded-2xl border border-white/5" id="skills">
                <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">military_tech</span>
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Kalaripayattu</span>
                  <span className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Parkour</span>
                  <span className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Sword Fighting</span>
                  <span className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Contemporary Dance</span>
                  <span className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Horse Riding</span>
                  <span className="bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Fluent Hindi/English</span>
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
                <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-2 flex items-center gap-2">
                  Visual Portfolio
                </h3>
                <h2 className="text-4xl font-black uppercase">Stills &amp; Portraits</h2>
              </div>
              <button className="text-slate-400 hover:text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2 transition-all">
                View All
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-4">
                <img
                  alt="Actor Still 1"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="Black and white artistic portrait of male actor"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBig6lCTHZqQ8376-glgfT9yl3_6r3QDPnhgpgAiFUTe1GSPwh3k1GTTEAlHe5bCTEy5VZ4pAe6hWbfKK4E2WA2o2SVdb7R0vS8toD-2g-fmokXXzjrFmB1-N_9pFIs2NUd-vaP4lBq2i32VVr25eLge_wpZWwK-baUyrO3TpR1nN-bnTZN-OuhSx-50WlcqP6iH1_mcL9OulThVJGzfMCjnuoDEs2WpRd4t4HgjEFQ7SIicTomxVlckTOEpZTQp0iGX0jcNVZrz9Zp"
                />
                <img
                  alt="Actor Still 2"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="High fashion portrait in a leather jacket"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSzhZoXtbwhtxKaZqTqqFZxOoooChcofJcdQDryDwg-e_C8u1dUK2X5NVB4Qs21YwFFnIUEFCN8l779KdTY_jgLJvUEboVXW9bxMEmTw6ZjSUlqb6yXJXRvPu4AyvrTGlCvuINTd3l_pimLsD2QLTVZeUl_CpOQxVeervaxPf6tMNG9lNdRFK8HdyDKSvpHba-YNIAiW4cAHVoUAMQJB6fNIzgXmLqTH9j12ft8UjCiN40pi9vr3z4-jRCxhkfDqVLUIRQZPU8A92d"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  alt="Actor Still 3"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="Action shot of actor performing a stunt"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGX95sNCCyCi8TcgvQFRbyhVg7NRzcZWrg0B-VyIXy8TiefkBVu0q50Fqg-sNfFVzwwBWnqZ9GVThIU499icj_K-bknoaEYepMoGjkrS8HBKRaA4Yo4rsV5LnKhVR9bUZshCo1t8fP-oICLbEls3mnWPhBZTTWCzav6eQ-W0Twt7gnYyRATy1mrulZlLUGSQjUalwDr0Tgxlioalq9BMslOtKVJc7tE2AyHzDwprXGeHpcXoR8xMLsbGbDqf9U0LQJ8U4hQibbIoqM"
                />
                <img
                  alt="Actor Still 4"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="Medium shot portrait of actor in neutral attire"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1LeUjD6cZxvVk3LCPjHWsLySa2B9GAOLGlJsVtcC7wSrUcOk3jZIlGfZ59BkAnu4NhreMhkHzqX9vkx0SNmFfIMRltlmNzYW8FC4-luiXefj-_FEaaglScEuT4aLTZiAWw8SIgs_LGEYHqzQxaP7klbW5BaMPdsADIxH363uDrgsakx-gLM7Wk7SDCby5oPI3A4MXRsbhzAfHTXvwhUwMIgvKdL8KpfjSNK57DaIOtEawO2EcDtLj3r7yMlU3kt08VQuoXHcsodSF"
                />
              </div>
              <div className="space-y-4">
                <img
                  alt="Actor Still 5"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="Intense dramatic close up of actor eyes"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL_TIJwquzt4O-CSvIddfOLoiNZKiwcyoQNLx1eTQf2PcLLYiVaGdzB3FCYDrQLw3t_e7kBSL_cDEPsnon1QlZa-XoDMh_zbwZvbKXn5Kwtf0DgC9aAMeZ_7REVsBZBO2sfXM7f3wGvrmaiYj3LV6Pp1dXrZ223Uu4rEdKtmd47lhFMUD0_Mp-fAoBThH1FY6gkZ98-_szARaFRYe_PxsfWkySFYJ7S-_TLxrFe9QVhb_TNkfbPnT8JwhUsvbvaRuXT9QtR6_Y8jzS"
                />
                <img
                  alt="Actor Still 6"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="Full body shot of actor in traditional wear"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_huSEC9S7mh71ZpsXC4EXedtUv3VL8bVA9h6UhiEG_mFw3WMU4Of0YX4b_ZVlxkOVACdz9EO1Hl5XKF4US6wPKEqjeB6NjzDzjmBqxf7QgwAJR0jsGI3POjbAeFhzKofI9H4uH2H3mgMOUFVe3zJ8eCZ8gDduNCV1QOI8I8J39rZeDarUC2wYf-teYl5xpPyBJDbeXzmptcVeqK7dsIlbX2ETrEy5BdE47Ni7CgDrBytlPGUhGTHKSKn5xMaf1YBVJRHEs2nIzErC"
                />
              </div>
              <div className="space-y-4 pt-12">
                <img
                  alt="Actor Still 7"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="Smiling commercial lifestyle headshot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl23vkHKxnLSqjHEZ88s09F6pC8PyZz4V2Jay_4x9U4Iz2JVIwiTHHj4Vyp-v20JSNeM6eGdWUO0eh4m9qgkhhCsIsvL9qCgUHxlzaeww81XHAFEMJCB-8KVPpKIBhh-h3CEjYzNAAUCAbGbEsE1adL-BCg29B8hzWYWIgoZfE4PWzL9fzsFIhEns0CveKYo9qyZrgcVw4qWyj2ISPwxjEc7pQOIrNZjXs5x9N0bvHTAo8k-UW2D71_9evZYTON5_SxJgXASmzfj8a"
                />
                <img
                  alt="Actor Still 8"
                  className="w-full rounded-xl hover:scale-[1.02] transition-transform cursor-pointer grayscale hover:grayscale-0 duration-500"
                  data-alt="Mood lighting dramatic profile shot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7uzfUU-mb8CO7zLpWEWOXWFkbwEjoQxCeCmJqcKfTGJ7Rwz3Z1IO4fseCos0acRaO9WnZgBMl3Sc-75qd7luplupsmNTE_uvvt4l-9wfq53kMT1xOUn1xMZE28N8ls5IHCje12qF-h12yRqAVnZjMSiwTps7BHll_kLHtOs4Xxko-soOYHurjx0qQEMgNcfIORt4ajjry-ydRE2Nv314DxM1Y99rxT6JuoYLkm5t67Wit5JCldwm_Von2DpAi9_ZtDo3eOPsdLDUN"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Film Credits */}
        <section className="py-24 px-6 bg-background-dark" id="credits">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-black tracking-[0.3em] uppercase text-primary mb-12 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span>
              Performance Credits
            </h3>
            <div className="space-y-16">
              {/* Films and web series tables copied from markup above */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">movie</span>
                  <h4 className="text-2xl font-black uppercase tracking-tight">Feature Films</h4>
                </div>
                <div className="overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500">Project Title</th>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500">Role</th>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500">Production / Director</th>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="group hover:bg-white/5 transition-colors">
                        <td className="py-6 font-bold group-hover:text-primary transition-colors">THE MIDNIGHT ECHO</td>
                        <td className="py-6 text-slate-300">Sameer (Lead)</td>
                        <td className="py-6 text-slate-400 font-medium">Excel Entertainment / Zoya Akhtar</td>
                        <td className="py-6 text-slate-500 text-right">2023</td>
                      </tr>
                      <tr className="group hover:bg-white/5 transition-colors">
                        <td className="py-6 font-bold group-hover:text-primary transition-colors">RUSTY GEARS</td>
                        <td className="py-6 text-slate-300">Vikram (Supporting Lead)</td>
                        <td className="py-6 text-slate-400 font-medium">Phantom Films / Anurag Kashyap</td>
                        <td className="py-6 text-slate-500 text-right">2022</td>
                      </tr>
                      <tr className="group hover:bg-white/5 transition-colors">
                        <td className="py-6 font-bold group-hover:text-primary transition-colors">BEYOND THE HORIZON</td>
                        <td className="py-6 text-slate-300">Anand (Antagonist)</td>
                        <td className="py-6 text-slate-400 font-medium">Dharma Productions / Karan Johar</td>
                        <td className="py-6 text-slate-500 text-right">2021</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">smart_display</span>
                  <h4 className="text-2xl font-black uppercase tracking-tight">Web Series</h4>
                </div>
                <div className="overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500">Project Title</th>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500">Role</th>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500">Platform</th>
                        <th className="py-4 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="group hover:bg-white/5 transition-colors">
                        <td className="py-6 font-bold group-hover:text-primary transition-colors">STREET JUSTICE</td>
                        <td className="py-6 text-slate-300">Inspector Arjun (Series Regular)</td>
                        <td className="py-6 text-slate-400 font-medium">Netflix Originals</td>
                        <td className="py-6 text-slate-500 text-right">2023</td>
                      </tr>
                      <tr className="group hover:bg-white/5 transition-colors">
                        <td className="py-6 font-bold group-hover:text-primary transition-colors">THE LAST EMPIRE</td>
                        <td className="py-6 text-slate-300">Prince Akbar (Lead)</td>
                        <td className="py-6 text-slate-400 font-medium">Amazon Prime Video</td>
                        <td className="py-6 text-slate-500 text-right">2022</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA & Contact */}
        <section className="py-24 px-6 bg-primary">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Ready for the Next Blockbuster</h2>
            <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto">
              Currently accepting leads for character-driven features and international series. For booking and availability, contact StarCast India agents.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button className="bg-black text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all shadow-2xl">
                Contact Manager
              </button>
              <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-2xl">
                View Showreel
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background-dark py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="text-primary size-6 opacity-50">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"></path>
              </svg>
            </div>
            <h1 className="text-sm font-extrabold tracking-tighter uppercase opacity-50">StarCast India</h1>
          </div>
          <div className="flex gap-8">
            <a className="text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">brand_family</span>
            </a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">movie_edit</span>
            </a>
          </div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">© 2026 StarCast India Portfolio. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Fixed Action Bar (Floating) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden flex gap-2 glass-card p-2 rounded-2xl shadow-2xl border-white/10">
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          CV
        </button>
        <button className="bg-surface-dark text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest border border-white/10 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">share</span>
          Share
        </button>
      </div>
    </div>
  );
};

export default TalentPortfolio;
