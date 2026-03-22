import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';

const FindTalent = () => {
  return (
    <div className="bg-background-dark text-zinc-100 min-h-screen">
      <TopNav />
      <main className="pt-28">
        {/* Search & Filter Header */}
        <section className="relative py-16 px-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
              Discover <span className="text-primary">Premium</span> Talent
            </h1>
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-xl shadow-2xl flex flex-col lg:flex-row gap-4 p-4">
              <div className="flex-1 relative group">
                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors">search</span>
                <input
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-primary focus:ring-primary rounded-lg pl-12 py-4 text-zinc-200 placeholder:text-zinc-500"
                  placeholder="Search by name, skill, or keyword..."
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:w-[60%]">
                {[
                  { label: 'Category', options: ['Actor', 'Model', 'Voice Artist', 'Dancer'] },
                  { label: 'Location', options: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'] },
                  { label: 'Gender', options: ['Male', 'Female', 'Non-binary'] },
                  { label: 'Experience', options: ['Fresh Face', '1-3 Years', '3-5 Years', 'Pro'] },
                ].map((select) => (
                  <select
                    key={select.label}
                    className="bg-zinc-900 border border-zinc-800 focus:border-primary focus:ring-primary rounded-lg py-4 text-sm text-zinc-300"
                    defaultValue={select.label}
                  >
                    <option disabled>{select.label}</option>
                    {select.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest self-center mr-2">
                Popular Tags:
              </span>
              {['Method Acting', 'Action', 'Editorial', 'Classical Dance'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-zinc-800 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Talent Grid */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Trending Artists</h2>
              <p className="text-zinc-500 mt-2">Vetted professionals currently making waves in the industry.</p>
            </div>
            <div className="flex gap-2">
              {['grid_view', 'view_list'].map((icon) => (
                <button key={icon} className="p-2 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors">
                  <span className="material-icons">{icon}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Rohan Sharma',
                badge: 'Pro',
                location: 'Mumbai, MH',
                stats: { Age: '26', Height: "6'1\"", 'Exp.': '5y' },
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ELeeysp-deYS2f8nqBz0vj3Zv6qPhYI9BdLMv6B_jMLiZm6sRLIW93HI8Xu9PwCETYFyQbxIpcSbDaXOQvp2wQc9FrtMHmHrKxaHxbYO6I8wIlHHIMXLzAkolR78RVIOGjtFUg7NxcL2YPs7xJDJuaUqXXIwkHSsVALm0HTmoJ0Q63g8UF-pT_nYeLjUUcrgGs9NkChYk4_poQl0TAT1DodIq3MR4NQeSdW-Nv-H5lZghB7UJx-BDK2K1jmhTvShaj8UU6TRoDhx',
                badgeTone: 'primary',
              },
              {
                name: 'Ananya Iyer',
                badge: 'New Face',
                location: 'Bangalore, KA',
                stats: { Age: '22', Height: "5'8\"", 'Exp.': '1y' },
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALD8KAdMOkubKbk1k1Ai4KVKziKDPDhWAR1qekJpUnxE4RGI6B-eXMWpxwDRhuPxX-k6xMMhFAqt3GjvVUJN4TxUH8F7D9FbjQdyVC1z7DIMW-P5Rm4MiJ_inn_gsQAbVd_m9azKLfbznf9eaiDXLQsVw5-EiMXyMJxyL8NWzyS-rL1eu6zbWTdY50x6YWPhb-UZfag0ST0EPbs9OhXccgNdYTZCiMy-emiv5Ml_CkiuMWlAX6fk1GIhweC_5DhAoiLYipF4_sS60R',
                badgeTone: 'zinc',
              },
              {
                name: 'Kabir Khan',
                badge: 'Pro',
                location: 'Delhi, NCR',
                stats: { Age: '30', Height: "5'10\"", 'Exp.': '8y' },
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0q5PhsBjyPshupCNRaqKtZ3dWWwFxFxzBfI9Vo4Je1EkOXAvAoWLxy80Jt9r9uexB9HKg7595vU_TgpyA7-Q7M3VuoeywglvM1mKkuGMSYiQbxhOo4E6hN91RXiLP_PAwkTX8iKjYUx-mOTV_zLCqApyN9H5wNIgFK5rc4xn5SHCDTmxTTj8rnsAXtSSyJptJpTUsUhr0XnIPYhjm4y5yd2S3LWcSmXjrIyTgx3vBZZxBE-0Q5RFE4p9oBtEYPwnsZUXWkLgG355p',
                badgeTone: 'primary',
              },
              {
                name: 'Priya Verma',
                badge: 'Star',
                location: 'Mumbai, MH',
                stats: { Age: '28', Height: "5'6\"", 'Exp.': '6y' },
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtGhSdDI_O2wcdyCFYCXaUA7tZ4T8RNJqB8RWBV2oYHrG-k4iLMuHCJ91_d1s5M0650ETXBKKBFSOdoXH9D82oGaURFXX58Boywn04CBrMihiFLWCLBTa-YbPcVDtIzBryAmolEp8KwxPKrBm_IP2v6geCSXtbWRdeIGt56NDi-Ea0NS6hnAvbHtOqBAnZ6A1BDyjooI_VivYf5qor26EEP6xoksZXLMgszpSgmhoMv5b7voLhyohXNATw9X2HICd0_gu4SVRKrzHL',
                badgeTone: 'primary',
              },
            ].map((artist) => (
              <div
                key={artist.name}
                className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-red-900/10"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={artist.name}
                    src={artist.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/30 to-transparent"></div>
                  <div
                    className={`absolute top-4 right-4 text-white text-[10px] font-black uppercase px-2 py-1 rounded tracking-tighter ${
                      artist.badgeTone === 'primary'
                        ? 'bg-primary'
                        : 'bg-zinc-900/80 backdrop-blur-md'
                    }`}
                  >
                    {artist.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
                    <p className="text-zinc-300 text-sm flex items-center gap-1">
                      <span className="material-icons text-xs">location_on</span> {artist.location}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-zinc-900">
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    {Object.entries(artist.stats).map(([label, value]) => (
                      <div key={label} className="p-2 rounded bg-zinc-950 border border-zinc-800">
                        <div className="text-[10px] text-zinc-500 uppercase font-bold">{label}</div>
                        <div className="text-xs font-bold">{value}</div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-zinc-800 group-hover:bg-primary text-white text-sm font-bold rounded transition-colors active:scale-95">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <button className="px-8 py-4 bg-transparent border-2 border-zinc-800 hover:border-primary hover:text-primary text-zinc-400 font-bold rounded-lg transition-all active:scale-95">
              Load More Artists
            </button>
          </div>
        </section>

        {/* Bento Spotlight */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-primary"></span> Spotlight Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Cinematic leaders"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC72Se1xOBJSnNHCJufsnUaHIksCxzAUVY_g5jIZG_c3jJgKFBgKXYLjKdpxmmKMXr-LkEkZ5rkScfV0ZslEYyx4vxLME3Kthpm-pGqRevRlQu2_pey_25bGOd-H_UtigTP_wwkqSAAMls1RG_ZjE9xG168pa2ebvZq9IZRMhxQXM5qpu7JKlZ-_tOpsYfa8E90Z19-Gg5xvQu_-8SrztRlUvJsfRInZ-_b3v1hfkpdq2eN3CnzkBwsezxzCzcaizci_6rdwO8epOEt"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h4 className="text-3xl font-black italic tracking-tighter mb-2">CINEMATIC LEADERS</h4>
                <p className="text-zinc-200 max-w-md">
                  Discover versatile actors with extensive experience in feature films and streaming series.
                </p>
                <button className="mt-4 flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                  Explore Category <span className="material-icons">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {[
                {
                  title: 'MODELS',
                  copy: 'International & Commercial Talent',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqn1v4kX6znYx-waTk_qXGwNcbQRUJfzM-Mg3je25gHiTUvHVVrmCSJZa9WvUTxgx0vmgXBg3ThAmC1uTlw5iENwstObAQoXfIuXKahHHKBt_o7rgQO7bgjrC4tFhRrNPHjFwM1VRhV6geyrcv93UKrqUimMAqHlrIkeMAHoCi5Pi5ifMdpSOHKk02rD283mqujMGaOrmXJmoHlpUHZo3uMJYS8e7HFJBeJ0S8wU2jXnBtQpGnnvoH60j6tUVyj09ilobKUiKTSglll2KaADj',
                },
                {
                  title: 'VOICE ARTISTS',
                  copy: 'Narration & Character Specialists',
                  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALs7Y61UHbADhuID2RlsmydhsguoDUsNOFj7Wz4ZP-JM2n4Nq1Hk8fmZwCLzw4M1QADwbK-UAXDgGsENwstObAQoXfIuXKahHHKBt_o7rgQO7bgjrC4tFhRrNPHjFwM1VRhV6geyrcv93UKrqUimMAqHlrIkeMAHoCi5Pi5ifMdpSOHKk02rD283mqujMGaOrmXJmoHlpUHZo3uMJYS8e7HFJBeJ0S8wU2jXnBtQpGnnvoH60j6tUVyj09ilobKUiKTSglll2KaADj',
                },
              ].map((cat) => (
                <div key={cat.title} className="flex-1 relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800">
                  <img
                    className="w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                    alt={cat.title}
                    src={cat.img}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h4 className="text-xl font-bold">{cat.title}</h4>
                    <p className="text-zinc-300 text-xs mt-1">{cat.copy}</p>
                  </div>
                </div>
              ))}
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
                <span className="font-display font-bold text-xl tracking-wide text-white">TALENT<span className="text-primary">CONNECT</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-6">The world's most trusted platform for discovering talent and casting for films, ads, and web series — across every cinema industry.</p>
              <div className="flex gap-4">
                <a className="text-gray-400 hover:text-white transition-colors" href="#"><i className="text-xl">FB</i></a>
                <a className="text-gray-400 hover:text-white transition-colors" href="#"><i className="text-xl">IG</i></a>
                <a className="text-gray-400 hover:text-white transition-colors" href="#"><i className="text-xl">TW</i></a>
                <a className="text-gray-400 hover:text-white transition-colors" href="#"><i className="text-xl">LI</i></a>
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

export default FindTalent;
