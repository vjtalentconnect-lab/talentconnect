import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';

const cinemaIndustries = [
  { label: 'Hollywood',         country: 'USA',            code: 'us' },
  { label: 'Bollywood',         country: 'India',          code: 'in' },
  { label: 'Korean Cinema',     country: 'South Korea',    code: 'kr' },
  { label: 'French Cinema',     country: 'France',         code: 'fr' },
  { label: 'Nollywood',         country: 'Nigeria',        code: 'ng' },
  { label: 'Japanese Cinema',   country: 'Japan',          code: 'jp' },
  { label: 'British Cinema',    country: 'United Kingdom', code: 'gb' },
  { label: 'Chinese Cinema',    country: 'China',          code: 'cn' },
  { label: 'Brazilian Cinema',  country: 'Brazil',         code: 'br' },
  { label: 'Spanish Cinema',    country: 'Spain',          code: 'es' },
];

const team = [
  {
    name: 'Arjun Malhotra',
    title: 'Founder & CEO',
    blurb: 'Former casting director with 15 years across global film industries.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuB4ptuawCqNmldo8--9cPWRSyNHaDuRD5su3yFrZ167raO04eoPefag-5wqYjQiQhaz16oRQecbxqaPfy5TH_3tScMWG4C1c1hpZzNeldYuS2umNznetgtN7mgroeUC4MD9WgF7ksi-WLCmgCmznoxBF5FJ7dn3QKU7niOnTZK_FFKxa2jaXCCW6iROaaJx8n83h8UOiE8N5NLlhG2rNkp33NWF73MCmFbxXD6_CTltZE29A_9ucZg8e1DstMdV_077BUbC7x31pY',
  },
  {
    name: 'Priya Sharma',
    title: 'Chief Product Officer',
    blurb: 'Tech visionary pioneering AI-powered global talent matching.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwu8WxiHEQN_SJhlOqMCU42AQXNNK0PNGjqCJV14pXu0hYk40bssf0nI3p1FzFHgEwlYh-B4WRjXv2jjFRjs4MdKAD2vGc0807vzJP1Rp0waHn7iGVV9v70MKLBB7J7Yn_MMvvzE5zLvaG5U6JZVmHZB4vPSBxJadYupF2rINgvOh4GzzESw4lqKdYShNbJK6Lwfn30zNs7MLPHo3l6KJ1StZTU8XGDgp_Tti8EsLKaTIdX7H13zw_o_N6EaOe3J-Xgplx3MC098Uh',
  },
  {
    name: 'Vikram Rathore',
    title: 'Head of Creative',
    blurb: 'Award-winning cinematographer with international productions.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxsP9K9R1TGnsKRrPGxDxJLrkel3qNCqlOjTPf0mWYp_LNSEVKKk9BvZ9xhRbTyiKORhmK6PgqxN6jSrIeLL61bsxTD8v0zVgCaEGP9eskYTlP31lTj2cyxPg36CVjrZaR5o62YtW7ZzkSgRhGMGtxiN1-CCuuwq6cj5XEHmLmDtsnm6XXAqLiIfdfFefd6FC14ZR3P64ePcVEoHANIW5Zk9rMb9fZI2WObI-0N8YqwjOe-bzlb5ytlRECSXkJghb3gm4d2cTbKPvu',
  },
  {
    name: 'Sana Khan',
    title: 'Global Talent Operations',
    blurb: 'Lead advocate for emerging talent from every corner of the world.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQeD57cNMo2fbouJ1vT19HVEDdI8cBx3gZXM41vKFVfS2zF7f2O-h9K1n_63IvX6r0FMM6cqvd_ItDL-uolAaQmZBRFmRx1jPEgBuD3UIPqY3AREpebhMEqieltPc5VkxQG8T2SYZ8Taox5tMh6QVgNfCg9962zvLsY1yw1sPcISD59rF_9WnI7YjbxqYcbjFhs8vA36cW55CLUNLRWjAmMfHQ9FlCgOg2pLPfKrQqwAdLTv1M-3U3kBXzrDi3fGsynKJKZ8saK0Ap',
  },
];

/* ── Rolling animation styles injected once ── */
const rollingStyles = `
  @keyframes rollOut {
    0%   { transform: translateY(0);     opacity: 1; }
    100% { transform: translateY(-110%); opacity: 0; }
  }
  @keyframes rollIn {
    0%   { transform: translateY(110%);  opacity: 0; }
    100% { transform: translateY(0);     opacity: 1; }
  }
  .roll-exit  { animation: rollOut 0.38s ease-in  forwards; }
  .roll-enter { animation: rollIn  0.38s ease-out forwards; }
`;

const RollingHero = () => {
  const [idx, setIdx]         = useState(0);
  const [phase, setPhase]     = useState('enter'); // 'enter' | 'exit'

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('exit');
      setTimeout(() => {
        setIdx(i => (i + 1) % cinemaIndustries.length);
        setPhase('enter');
      }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const { label, country, code } = cinemaIndustries[idx];

  return (
    <>
      <style>{rollingStyles}</style>

      {/* "FROM STAGE" line */}
      <div className="text-white">FROM STAGE</div>

      {/* Rolling industry name */}
      <div
        className={`text-primary ${phase === 'exit' ? 'roll-exit' : 'roll-enter'}`}
        style={{ display: 'inline-block', minWidth: '100%' }}
      >
        {label}
      </div>

      {/* Rolling country row */}
      <div
        className={`flex items-center gap-2 mt-1 ${phase === 'exit' ? 'roll-exit' : 'roll-enter'}`}
        style={{ fontSize: '1rem' }}
      >
        <img
          src={`https://flagcdn.com/w40/${code}.png`}
          alt={country}
          style={{
            width: 30,
            height: 20,
            objectFit: 'cover',
            borderRadius: 3,
            boxShadow: '0 1px 5px rgba(0,0,0,0.5)',
          }}
        />
        <span
          style={{
            letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 400,
            textTransform: 'uppercase',
            fontSize: '0.9rem',
          }}
        >
          {country}
        </span>
      </div>
    </>
  );
};

const AboutUs = () => {
  return (
    <div className="bg-background-dark text-zinc-100 min-h-screen">
      <TopNav />
      {/* add extra top padding so content sits below sticky header */}
      <main className="pt-28">

        {/* ── Hero ── */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-60"
              alt="Cinematic wide shot of a global film set"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8kz3tn9mOJoY5UHaAoA3SJTTzHNDiDSyJ9xXQ_OtX7Y923YqWTUQURI6ED6FxAn9-bfwgTLK7KNJFCCgxj2eTmYaJNtLoV1qJ8DyEJEpC8bmUB_ZLoirg-b0VHOPLWsAiOPNdub8jxlakLHILxR8embgALcgZkXK4Cwoy2uxIJ-tdE8K__yQFascxNHGAS24CFqXDo-gHIQlNizhSdgLhXXeEMz-5Du3TtFf3yK9wnIeIq6FCQVs9ZB1b0hgfj7NiYYZYi8sgqgYP"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-background-dark" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <span className="inline-block px-3 py-1 bg-primary text-[10px] font-bold tracking-widest uppercase mb-6">
              🌍 Redefining Global Discovery
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white mb-4 leading-none">
              <RollingHero />
            </h1>
            <p className="max-w-2xl text-xl text-zinc-300 font-light leading-relaxed mt-6">
              TalentConnect is the premier digital gateway connecting the world's vast pool of performing
              arts talent with the most ambitious productions across every film industry on the planet.
            </p>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="py-24 bg-background-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Our Story</h2>
                <h3 className="text-4xl font-extrabold tracking-tight text-white mb-8">
                  The Evolution of Global Casting
                </h3>
                <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                  Founded at the intersection of Hollywood ambition and world cinema creativity,
                  TalentConnect began with a simple observation: the journey from a local theater
                  stage to a global streaming screen was fraught with gatekeepers and opacity —
                  everywhere in the world.
                </p>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  We set out to democratize access across every film industry. By blending
                  cutting-edge technology with deep industry insights, we created a platform
                  where talent is the only currency that matters — from Bollywood to Nollywood,
                  Hollywood to K-Cinema and beyond.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="h-[1px] w-12 bg-primary" />
                  <span className="italic font-medium text-white">Since 2018, changing the global landscape.</span>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-xl blur-2xl group-hover:bg-primary/30 transition duration-500" />
                <img
                  className="relative rounded-lg shadow-2xl border border-zinc-800 object-cover aspect-video w-full"
                  alt="Monochrome close up of a vintage movie camera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCECuoXvzHimyqIpfkF8-Ta8op4c234jqpjISh7Zpr-W71hwf2I1Y9tvE-Eb8hi01AaOroQ1h9Fjz9ra2ka-TJh9sT95s1teOTXwFI_AKe5E4iAzMQXeHL_eUGyxNyD74UrMIWKWimctuduTcxGn__Zs61UPKAnQJugyYCx2FdAalSnmQLf-h0ZRYkirP_A3wINQpEK4L-p0U3wjjYXivW9iseKlQVr--snm1XyUQhaO56DJNRj4NKtkF1vDqR6kwlI5NIng6fKg_kz"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bento Grid ── */}
        <section className="py-24 bg-[#10090c]">
          <div className="max-w-6xl mx-auto px-6">
            {/* Row 1: three stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
              {/* Wide stat */}
              <div className="md:col-span-2 bg-[#0d0d11] border border-zinc-800/80 p-8 rounded-xl flex flex-col justify-between hover:border-primary/60 shadow-xl shadow-black/30 transition-colors">
                <div>
                  <span className="material-icons text-primary mb-4 text-4xl">groups</span>
                  <h4 className="text-5xl font-black tracking-tighter text-white">2M+</h4>
                  <p className="text-zinc-500 font-medium">Verified Talent Profiles</p>
                </div>
                <p className="mt-8 text-sm text-zinc-400">
                  Spanning actors, dancers, and voice artists across 120+ countries.
                </p>
              </div>

              <div className="bg-[#0d0d11] border border-zinc-800/80 p-8 rounded-xl hover:border-primary/60 shadow-lg shadow-black/25 transition-colors">
                <span className="material-icons text-primary mb-4 text-4xl">movie</span>
                <h4 className="text-4xl font-black tracking-tighter text-white">50K+</h4>
                <p className="text-zinc-500 font-medium">Productions</p>
              </div>

              <div className="bg-[#0d0d11] border border-zinc-800/80 p-8 rounded-xl hover:border-primary/60 shadow-lg shadow-black/25 transition-colors">
                <span className="material-icons text-primary mb-4 text-4xl">handshake</span>
                <h4 className="text-4xl font-black tracking-tighter text-white">85%</h4>
                <p className="text-zinc-500 font-medium">Match Rate</p>
              </div>
            </div>

            {/* Row 2: Mission — full width on its OWN row */}
            <div className="w-full bg-primary p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between overflow-hidden relative group shadow-2xl shadow-red-900/30">
              <div className="relative z-10 max-w-2xl text-left">
                <h3 className="text-3xl font-black text-white mb-4">
                  Our Mission: Transparency &amp; Global Opportunity
                </h3>
                <p className="text-red-100 text-lg">
                  To provide every artist on Earth, regardless of background, nationality, or
                  location, a fair stage to showcase their craft and secure their future in
                  the global spotlight.
                </p>
              </div>
              <span
                className="material-icons text-[10rem] absolute -right-10 -bottom-10 text-black/20 group-hover:scale-110 transition-transform duration-700"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-24 bg-background-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">The Visionaries</h2>
              <h3 className="text-5xl font-extrabold tracking-tight text-white">Meet the Team</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((person) => (
                <div key={person.name} className="group">
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={person.name}
                      src={person.img}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent opacity-60" />
                  </div>
                  <h5 className="text-xl font-bold text-white">{person.name}</h5>
                  <p className="text-primary font-medium text-sm mb-2">{person.title}</p>
                  <p className="text-zinc-500 text-sm">{person.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-background-dark text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img src="/TC Logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-display font-bold text-xl tracking-wide text-white">
                  TALENT<span className="text-primary">CONNECT</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Building the future of world cinema through transparency, technology, and pure
                talent — across every film industry on the planet.
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
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Find Talent</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Find Work</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Productions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Press Kit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal &amp; Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a className="hover:text-primary transition-colors" href="/terms-and-conditions">Terms of Service</a></li>
                <li><a className="hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</a></li>
                <li><a className="hover:text-primary transition-colors" href="/help-support">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
            © 2026 TALENT<span className="text-primary">CONNECT</span> • Where World Cinema Talent Meets Opportunity
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
