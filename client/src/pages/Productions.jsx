import React from 'react';
import TopNav from '../components/TopNav';

const Productions = () => {
  const studios = [
    {
      type: 'feature',
      name: 'Red Chillies Entertainment',
      badge: 'Featured Studio',
      active: 'Active Projects: 14',
      blurb:
        'Pioneering visual effects and world-class storytelling. Currently casting for two major untitled action thrillers and an upcoming sports drama.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBG73FN0-pDz1WGpMGKCMYQIhGYqSbdSEXB2Sax7fevHidSPA-OEvjFwtkr7wVnDvtt564_nRHJeqjSA7x0rDGY6VIgbsLVOVt7Pw1GBRLVZg5SZv1ig2AYsFoOjkx0USFiHQFbbbg5MqtZGISimwgvGEHuXqv7F9TG4Irw37JPQLC1d3fTMq7RSpDkDrlDdiZFq-NvQeAZHbBE3MRTu2OAACjff6k-sJGmMTEzu7VfJQT6pkXy4J0Cfa71ZdtHSvONLrh4UQbnoUYK',
    },
    {
      name: 'Yash Raj Films',
      icon: 'movie_edit',
      call: 'Action Lead',
      director: 'Siddharth Anand',
      blurb: "India's leading film production and distribution house. Shaping the 'Spy Universe' legacy.",
    },
    { name: 'Dharma Productions', meta: '4 Active Casting Calls', logoText: 'DHARMA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWCFgCWwj8DjgfWE7TI6qhOWeeHJ8BOWms5mo1LwtbAZYr0shSne-nnJ6wK9q7Qigr37MIq0Qi3_bI3jJvaKP5Cm4sk74nL1jvHkxKUb4AskX-1RS6gQP5s8ZwgBRYggpvzc63o8vYL05XPNzf7FB_pI72tCS_FDTUpukio6tgSucKXeO7i960sQKDWGDOH4XbCuqkGx9tNKRCI9OqOC-65rilF1NEbMpLVw9Th3WhgkCVzqMu4bfkAlu4rg5v12cnDyexe0aZt_Fk' },
    { name: 'Netflix India', meta: 'Original Series Dept', logoText: 'NETFLIX INDIA', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5X4E5GRSyXKFZNTLmpP1tJc-7t3RwxPN3mcdUZWjnB_Ed6Rbfu-hjUo0SFap13ii5ZO7rTPQHFTXKENHCI4_K2uVEHFtfgo2fvz2t_U0Bg4KVke8pu8t7jaDap6PnyxclqZgokqZylStYRfEosruOOD3kagdeKaQq0fodvjPqb-jfPNcmso4XZPvNsqweoyGoopL04QxJAIRUjtZ5DaAUrhZ5nE_mG_zISgetpMi2bc4Y3ZCQPVI3NVTri_HDZnfLBiyILHED0cBr' },
    { name: 'Excel Entertainment', meta: '9 Active Projects', logoText: 'EXCEL', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCb-7ghGPsnImnu0LsY8uJh8X0bidwP-qsUfAWhQn7zoGLExAyYwXTeSOERzZJl319FwQPyU7-Nj202mNxyY6uP4DWP9xxvqSyKrzWNnOcpp3mB-rHcRbOVluER7Nom83ag8W8EcqDc8KYtJoppAPYneD5I_p8NKfwmYXGLJi-mVmieMcVBfKLoQZn0cayxcoEqEhSmTwx-jNYVp6B8mL8AMjbvOJR1CMAzCotgJMJtVkVYas6PrQKJYfFlSF5JKnevykT7xGuTshnC' },
    { name: 'Hombale Films', meta: 'Pan-India Productions', logoText: 'HOMBALE', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAb9G2-uQZv9TBDKnMeK0RJ7HV4jlrGkMYpfZqmP9tu3dZglUz7UGr0l4_dIU7yoZ0N--L_1qJ7idr0amxm6kcc5sD14cWoVWtMrQa-icjTrjTl9hlqmkTyef6D17sq8aS-CIiQ5bNJPgPXmAVUqPFeO9NTJtYqKzoYD_AZfdZhghHz34RbVwpuuv1zMBtT_qxtWAT2BjraLKaWNxPjvkDME-PmwHZPgddN_yRY-MrtdkZuu7Ahd-E8rgp2LzCLvPTTIEIyMlZ9pzP' },
  ];

  const directors = [
    {
      name: 'S.S. Rajamouli',
      tag: 'National Award Winner',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIIrwmYyqZL7tqFXY6Qey4tx68vOblIhDEhNzt72Lh5EDF-QK1VG0J_IHY4GPfaC947cpMwXQLlBGf9yrZO_TblTBeUkfEZIxNoHESQGxGVzzHLc5MVIU3Kv5t1ZpbXSfngKm6yov8TIEPHESRb77u7Q6glju8DT-OTxtwTU1Aou4e9FlRcdVpw2CsIYnQHEWqHY3wlrHzXVXKvDFmVO7ZD79z4BO-UbVVsuCRhl0KjakPLyk8Dy-_aIzwCVn1ElEur926LYYFNRZU',
      blurb:
        'Master of epic storytelling and cinematic scale. Known for visual spectacle and pan-India blockbusters.',
    },
    {
      name: 'Sanjay Leela Bhansali',
      tag: 'Visual Visionary',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDJoK7mCnJfb8qA8MvZr_6uKTZZKQl9ub4ufFCfmO7i3b49TDzygLQj8OK5fKPW70LgokdZLdWRCH0mgKi7L5EBa2T2sfD2xlhd6vPKmjIT5c69F7EqA0qANxLggpxRNEDnh_UL7MxA4uHptoWluCSO02q9Uh5O9G89nyRhFtQYaaTGzBotgyiQ-3jj5VqLBygSgaDSHYmOHlQH0koYpqgLDSnv6lY9tHJ3DvfoKxy7wLn4jDWyF5zCQnhytqY5SFZp610N3Ix7ij2',
      blurb:
        'Renowned for opulent sets, intricate music, and dramatic emotional depth in Indian cinema.',
    },
    {
      name: 'Zoya Akhtar',
      tag: 'Realism Pioneer',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApjJAavKa7zqvF1fug5mv9glRyoFMIfqmgcmXclfaz-wP7TOfpIIZzvl8I_IZOw9j0mQjxCZ-AvXiDlUuprOFrKh7vPMfNZn3C0bSXAOxLxR6yoSPoHbhi6KNlJbX8-vZNSEzAxPp2Ko5pXtdHyN2nCtE_MIpkcFOYG6ThHwGkJzdQTLIktnV1YPz3WQz_XOlzacf7IGVzUvhxJxKANiDQjo_NYvlajCG77g5KmkMPKUZtOq1thC5FJvb1Dk-cayREtw0Ajd0AnOMO',
      blurb:
        'Expert in contemporary narratives and urban storytelling with a focus on human relationships.',
    },
  ];

  return (
    <div className="bg-background-dark text-zinc-100 min-h-screen">
      <TopNav />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero */}
        <header className="mb-16">
          <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-3">Productions</p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white">
            The Powerhouses of <span className="text-primary">Cinema</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl font-medium">
            Discover the elite production houses and visionary directors shaping the future of entertainment through TalentConnect.
          </p>
        </header>

        {/* Partner Studios */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold tracking-tight border-l-4 border-primary pl-4">Partner Studios</h2>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
              <span>Filter by City:</span>
              <button className="text-primary">Mumbai</button>
              <span className="text-zinc-700">|</span>
              <button className="hover:text-zinc-300">Hyderabad</button>
              <span className="text-zinc-700">|</span>
              <button className="hover:text-zinc-300">Chennai</button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Feature card */}
            <div className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-xl bg-zinc-900/70 backdrop-blur border border-zinc-800 aspect-[16/9] lg:aspect-auto h-[420px]">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
                alt={studios[0].name}
                src={studios[0].image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center flex-wrap gap-3 mb-3">
                  <span className="bg-primary text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase text-white">
                    {studios[0].badge}
                  </span>
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{studios[0].active}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{studios[0].name}</h3>
                <p className="text-zinc-300 max-w-xl text-sm mb-6 leading-relaxed">{studios[0].blurb}</p>
                <button className="bg-white text-zinc-950 px-6 py-2.5 rounded font-bold text-sm hover:bg-zinc-200 transition-colors inline-flex items-center gap-2">
                  View All Projects <span className="material-icons text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* YRF card */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-zinc-900/70 backdrop-blur rounded-xl p-8 border border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 bg-zinc-800 rounded-lg mb-6 flex items-center justify-center border border-zinc-700">
                  <span className="material-icons text-primary text-3xl">{studios[1].icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{studios[1].name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{studios[1].blurb}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-300 uppercase">Current Call</span>
                  <span className="text-xs font-bold text-primary">{studios[1].call}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900 rounded border border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-300 uppercase">Director</span>
                  <span className="text-xs font-bold text-white">{studios[1].director}</span>
                </div>
              </div>
            </div>

            {/* Remaining studios */}
            {studios.slice(2).map((studio) => (
              <div
                key={studio.name}
                className="col-span-12 md:col-span-6 lg:col-span-3 bg-zinc-900/70 backdrop-blur rounded-xl p-6 border border-zinc-800 hover:border-primary/60 transition-colors"
              >
                <div className="aspect-square bg-zinc-900 rounded-lg mb-4 overflow-hidden relative">
                  <img className="w-full h-full object-cover opacity-40" alt={studio.name} src={studio.img} />
                  <div className="absolute inset-0 flex items-center justify-center font-black italic text-xl tracking-tighter text-white drop-shadow">
                    {studio.logoText}
                  </div>
                </div>
                <h4 className="font-bold text-lg">{studio.name}</h4>
                <p className="text-zinc-500 text-xs mt-1">{studio.meta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Directors */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-2 block">The Visionaries</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Elite Directors</h2>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm md:text-right">
              Access opportunities to work with the industry's most acclaimed storytellers and cinematic geniuses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {directors.map((director) => (
              <div key={director.name} className="relative overflow-hidden rounded-2xl bg-zinc-900/70 backdrop-blur border border-zinc-800">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-700"
                    alt={director.name}
                    src={director.img}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-primary text-lg">star</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white">{director.tag}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white leading-tight">{director.name}</h4>
                  <p className="text-zinc-400 text-sm mt-2 opacity-0 hover:opacity-100 transition-opacity duration-300">{director.blurb}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="text-white text-xs font-bold uppercase border-b border-primary pb-1">Portfolio</button>
                    <button className="text-zinc-500 text-xs font-bold uppercase hover:text-white transition-colors">Active Casting</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative bg-zinc-900 rounded-3xl p-12 overflow-hidden border border-zinc-800 text-center">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/15 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-primary/15 rounded-full blur-[80px]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4">Are you a Production House?</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Join the platform trusted by the biggest studios. Streamline your casting process, discover fresh talent, and manage your productions efficiently.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold transition-all active:scale-95">
                Register Your Studio
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-lg font-bold transition-all active:scale-95">
                Speak with an Agent
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (same as Home) */}
      <footer className="bg-background-dark text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img src="/TC Logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-display font-bold text-xl tracking-wide text-white">
                  TALENT<span className="text-primary">CONNECT</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                The world's most trusted platform for discovering talent and casting for films, ads, and web series — across every cinema industry.
              </p>
              <div className="flex gap-4">
                <a className="text-gray-400 hover:text-primary transition-colors" href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5H10v7a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-7h2.1a.5.5 0 0 0 .5-.5l.4-3a.5.5 0 0 0-.5-.5H14V7a1 1 0 0 1 1-1H17a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-primary transition-colors" href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" strokeWidth="1.5"/>
                    <circle cx="17" cy="7" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-primary transition-colors" href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6.99A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3 4.89a4.11 4.11 0 0 0 1.27 5.48A4.07 4.07 0 0 1 2.8 9.1v.05a4.11 4.11 0 0 0 3.3 4.03c-.2.05-.41.08-.62.08-.15 0-.3-.01-.45-.04a4.13 4.13 0 0 0 3.84 2.85A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a className="text-gray-400 hover:text-primary transition-colors" href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5"/>
                    <path d="M7 10v7M7 7v.01M12 10v7m0 0v-4a2 2 0 0 1 4 0v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">For Talents</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Search Jobs</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Create Portfolio</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Audition Tips</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">For Recruiters</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Post a Job</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Browse Talent</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Casting Services</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2"><span className="material-icons text-xs">email</span> support@TalentConnect.io</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs">phone</span> +1 (800) TALENT-1</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs">place</span> Global HQ · Los Angeles, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
            © 2026 TALENT<span className="text-primary">CONNECT</span> • Where World Cinema Talent Meets Opportunity | Privacy Policy | Terms of Service
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Productions;
