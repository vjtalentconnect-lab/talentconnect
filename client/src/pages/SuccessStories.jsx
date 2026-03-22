import React from 'react';
const SuccessStories = () => {
  return (
    <div className="bg-gray-950 text-gray-100 font-display min-h-screen">
      <main className="pt-12">
        {/* Hero */}
        <section className="relative h-[520px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.15)_0%,transparent_70%)] z-10" />
            <img
              className="w-full h-full object-cover grayscale opacity-40"
              alt="Cinematic movie set with spotlights and camera"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlJZlKhsGFVhqSz_znytMNVGKu8JfZy_XeCNzJbDVST4vmsRSBodoyQJjzI9SuLf5VtAoeL1jdc4fbmgIa7cT4yFAt6zLysGp3OlbKW1JZXY6aEuAmhtL_JhiHUWeFTKD9QuNfCLY0xWMH3RYfGeZBQPOq9UA10fBuMAxRfS_kSLcHSPEU8nw1rT0q3kqkCC-bl-snhiHVNw18Kg258TbRpFmZB5BIKiBAJ62LrhXw3NfrtRd3b8FPLI48ZOsWX2Ro3La6lzaT2sYH"
            />
          </div>
          <div className="relative z-20 text-center px-6">
            <span className="text-red-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Hall of Fame</span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Success Stories</h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-lg">
              Discover how rising stars transformed their dreams into reality through TalentConnect.
            </p>
          </div>
        </section>

        {/* Featured grid */}
        <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl h-[520px]">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Dramatic portrait of a male actor"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgk3UKrfoHBU5832Mf8xUyweA9xyC-9cmiGdp2vw6Ie_WsIYsbvJIKm_91yJ_3PWllEI__si4CtkSCn8fDzxKslaGvOR5IjMqnsQQ3Jwr9BGdsc-cY4eQv1qOrK84JxMSSkaMBbHINVaIdpgXvF5AnWuMh5S4S1Mchgyw1bwbmfkzBv3Im2o9SGbqn8U1YLY2Ff89R0AX-FEspu3q87gEA8Fjc9KvIxtKqZF1eBrnOYSTVnhd2Im0Vs-F0SzhZc3mqa5Nqr-RK_QP0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-red-600 text-xs font-bold rounded-full">LEAD ROLE</span>
                  <span className="text-gray-300 text-sm font-medium">The Last Dynasty</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  "TalentConnect bridged my small-town dreams to the streaming screen."
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold">Arjun Varma</p>
                    <p className="text-gray-400 text-sm">Cast as 'Vikram' in a Netflix Original</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-full backdrop-blur-md">
                    <span className="material-icons text-white">play_arrow</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-white/5 glass-card flex-1 rounded-xl p-8 flex flex-col justify-between border border-white/10">
                <div>
                  <span className="material-icons text-red-500 mb-6 text-4xl">format_quote</span>
                  <p className="text-lg italic text-gray-300 mb-6">
                    "Within two weeks of joining, I was auditioning for Urban Legends. The direct access to casting directors is a game changer."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    alt="Portrait of a female actress"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpJA7jw0n51AfgJUQGRaRUh7TyoUuM4L_-HnDdzzo-KUHDPgwZYmk5DRekEOWhdozRBDI7FLt9WIBQoWIJcCkaXMgOJfE_XTq7AlnggSvQ_Em-7O48LWWVNMeaT9tAvGfcmHnktSmuS97-YKRMm7lFBopzCRBzMz-RIR-LwcfSPelXyG0DPqnd0RBIFpLTi-YLHpqbJY7PI37fOLi2oRJVwCoo_EN8KZwanBQP2N9MUIZhHkHQenxU9HPpewrCcHBod1mRch4afyNp"
                  />
                  <div>
                    <p className="font-bold text-sm">Sanya Iyer</p>
                    <p className="text-gray-500 text-xs">Featured in 'Urban Legends'</p>
                  </div>
                </div>
              </div>

              <div className="relative flex-1 rounded-xl overflow-hidden group">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  alt="Cinematographer looking through camera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwGF-tvTQSlCActnHRfa532JLRB5l6mV-dwFkzpE5FYgAz51TyuvUPKm6wbMO9IgOWKcFqwyMvyOScMTN1QrBBhngOm8s-3FXhisn_xLg3GDGUbUw8-q1LgRccPAoHx9usfouNiv14NJicXrd98nyfxi1t5YG5XlqGyXt5QNQkRYHbawKLbiqjHOuEhUNjvFtuS4I5OOTvt_sAhhMTSosg2Kl7CJooEMhly90GcG3zOCQprRVBpMVPIDaCjQe527pu0FZbZNofU4Ad"
                />
                <div className="absolute inset-0 bg-red-600/10 group-hover:bg-red-600/20 transition-colors" />
                <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                  <h3 className="text-xl font-bold mb-2">300+ Productions</h3>
                  <p className="text-sm text-gray-300">Across Bollywood and Indie cinema found talent here this year.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Actor smiling"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhaNWMs2tc69lBlZrcSlCn1Yg6Cw3z5tzDelNBKFVbPC_GmdAZoF4ZmQENm2OivLqZ2halOe3ez8ykEfBJR6cxuwLBXjS5NsV6rcQd4g242xfcKCNVVnH3Dzt2SZ4fLgkIinh0g8ZePOoLiCF0suya-AKSroOsk6_42fsyOgv4Q1ll2Nkp3HyXRuvTKt5HZBfzjHef1ZN3KuoW9CNVsYCHU28XmNFTN3vhbOUHPdy4JSUxKSWLjUoTGXybna8X_FtBIrKz8HjB0qi1"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 p-6">
                <p className="font-bold text-lg">Rohan Malhotra</p>
                <p className="text-red-500 text-sm font-semibold">Casting: The Shadow Play</p>
              </div>
            </div>

            <div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Stunning female portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeDiDhhLpRq2hnZDAeuwZ_LFp__JDeqpOimN4NCqKE2VzIA5hdhvwe1G5T9lVsYUShwTl5b4d1V07PlDfiP_jz8xfKUhrQ0BI3Lt6omloWdd9EXXfh38rEHA5G0H0RWCjVOE5GQNvPo3PoMMcHXVFj3ERCopshBnpwVuAolckFwItfn2sNLktiz8QO9hSDngDd8PMr4HNcQbmLR8ulT8sgoNjytXehowuf_iL1VElbnOL0CC-aDdSw6eTnpnCtuCB3T_M_tis_LPw9"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 p-6">
                <p className="font-bold text-lg">Meera Kapoor</p>
                <p className="text-red-500 text-sm font-semibold">Lead: Neon Streets</p>
              </div>
            </div>

            <div className="md:col-span-4 bg-white/5 glass-card rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-6">
                <span className="material-icons text-red-500 text-3xl">add</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Be the next star</h3>
              <p className="text-gray-400 text-sm mb-6">Your success story starts with a single profile. Join today.</p>
              <button className="w-full py-3 bg-red-600 text-white rounded-lg font-bold text-sm tracking-wide hover:bg-red-700 transition-colors">
                Start Your Journey
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden py-16 text-center bg-red-600">
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />
            <div className="relative z-10 px-6">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to be our next success story?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join the premium community of artists and casting directors across India.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-shadow">Join as Artist</button>
                <button className="bg-black/20 text-white backdrop-blur-md px-8 py-4 rounded-xl font-bold text-lg hover:bg-black/30 transition-all border border-white/20">
                  Hire Talent
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuccessStories;
