import React from 'react';
const ArtistGuidelines = () => {
  return (
    <div className="bg-gray-950 text-gray-100 font-display min-h-screen">
      <main className="pt-12">
        {/* Hero */}
        <section className="relative h-[520px] flex items-center justify-center overflow-hidden border-b border-gray-800">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-30 grayscale"
              alt="Cinematic movie set with bright lights"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFim3ELJCwCpL1yDDCY4GJ8gPZTkKxwPStoTMNuz-jZ96wAoF4ZYmGte9-CI2MawVcaApDJaIQr-8kWlWeSJg_Cxh5vrsyEBaviOTMCQd7Z2ff3cHxEj6sjfbywDbagBZcMtTx4N9jvxPbgYppFohtG81JI853XfGKP9WbJlQ60YHHCrgEBlIWXTbBVluTSnyW6vodCLEnnfa-hra74bk6DUOFJOj_zjXKIJsZYsfjuefxJbQlHpoIJ3VtmLtdkujWl_SE3c8Pu8JJ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <span className="inline-block px-4 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold tracking-widest uppercase mb-6">
              Artist Excellence
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
              Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Presentation</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Your journey from local talent to global star begins with a professional foundation. Follow our definitive guide to stand out.
            </p>
          </div>
        </section>

        {/* Core Guidelines */}
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 relative overflow-hidden rounded-xl bg-slate-900/70 border border-gray-800 p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-red-500">photo_camera</span>
                    <h3 className="text-2xl font-bold">Perfecting Your Headshots</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    The headshot is your business card. Casting directors decide in seconds. We require three essential shots:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li><strong>Classic Close-up:</strong> Focus on the eyes with neutral makeup and simple clothing.</li>
                    <li><strong>Character Look:</strong> Show your range with a specific mood or personality.</li>
                    <li><strong>Full Length:</strong> A clear view of your silhouette and proportions.</li>
                  </ul>
                </div>
                <div className="w-full md:w-64 h-80 rounded-lg overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover"
                    alt="Professional studio headshot"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-Vav5A4zYp9DPoKU4BHuhFzKa5hAAJwrRp9a_itU6jiLoxZTDEf90QdoqLcFQ14lJaZKmkva4HI6k0Mrt6WpZmwa-phvOCW3ortUsEpjofQlF6k_Zn1aj9uGXXHCbXozmtPy861TIcJfiZ0bXATLqGO-QOYnVWFuWq3cHtk48XilkhwCclrj8QqH7ERjxnnCEPii6BQP5Aqp28J4y9cdf_2gQTK1qcsqEuUO7AzbsVEqsonj18n1uM3GHIH9Qhps7b7UUNorTyVK4"
                  />
                  <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay" />
                </div>
              </div>
            </div>

            <div className="md:col-span-4 rounded-xl bg-gradient-to-br from-red-800 to-red-600 p-8 flex flex-col justify-between shadow-2xl shadow-red-900/20">
              <div>
                <span className="material-icons text-white mb-4 text-3xl">folder_special</span>
                <h3 className="text-2xl font-bold mb-4">Portfolio Tips</h3>
                <p className="text-red-100 text-sm leading-relaxed mb-6">
                  A portfolio is more than photos—it is a curated experience of your professional journey.
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 p-3 rounded-lg border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white font-bold mb-1">PRO TIP</p>
                  <p className="text-xs text-red-500 bg-white inline-block px-2 py-0.5 rounded mb-2">Showreel</p>
                  <p className="text-xs text-white/80">Keep reels under 2 minutes. Open with your strongest performance.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-lg border border-white/20 backdrop-blur-sm">
                  <p className="text-xs text-white/80">Update your stats every 3 months, including hair length and current skills.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 rounded-xl bg-slate-900/70 border border-gray-800 p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-icons text-orange-400">edit_note</span>
                <h3 className="text-2xl font-bold">Drafting a Winning Bio</h3>
              </div>
              <p className="text-gray-400 mb-6 text-sm italic border-l-2 border-orange-500 pl-4">
                "Don’t just list credits; tell us who you are in three punchy paragraphs."
              </p>
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <p className="text-orange-500 text-xs font-bold mb-1">STORYTELLING</p>
                  <p>Mention your training and background. Be specific about your niche.</p>
                </div>
                <hr className="border-gray-800" />
                <div>
                  <p className="text-orange-500 text-xs font-bold mb-1">PERSONALITY</p>
                  <p>Add one unique personal fact. It makes you memorable and breaks the ice.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 relative rounded-xl bg-gray-900 overflow-hidden border border-gray-800">
              <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
                <img
                  className="w-full h-full object-cover opacity-40"
                  alt="Director watching an actor behind a camera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4EHaDEOeg08IMJ_GhlmMpTT33FoWnm-fRISmtY7Q85m74_I6vdPWlia73TrB9HGbRh4w4j7ie34NPvj3-tnRP89dH8MDhqIMRKrPY2R8AeI6yBnOr-sTQ_-X5HALYyZUbKdoto_T334pmr4vmWlp2AWtMKQ3sF0xuyGmV7LFDS7qfzcTeV7Tg4FwpjlpEQl9gS87gY8LGkRWnMywjHMVfyEpOACZaaMaVcexiePPk5Y2zq81wr7buLRvSCuhJMEzMFuMWzfnBSh2d"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
              </div>
              <div className="relative z-10 p-10 lg:w-3/5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-icons text-red-500">theater_comedy</span>
                  <h3 className="text-2xl font-bold">Audition Etiquette</h3>
                </div>
                <div className="space-y-6 text-sm text-gray-300">
                  <div>
                    <p className="font-bold text-gray-100 mb-1">Punctuality is non-negotiable</p>
                    <p className="text-gray-400">Arrive 15 minutes early; tardiness signals a lack of respect.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-100 mb-1">Dress for the vibe</p>
                    <p className="text-gray-400">Hint at the character through your palette and style—no full costumes.</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-100 mb-1">Technical readiness</p>
                    <p className="text-gray-400">For self-tapes, ensure clean audio, a neutral background, and horizontal framing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-950 border-t border-gray-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Ready to Shine?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Apply these standards to your profile today and catch the eye of leading casting directors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-red-700 to-red-500 rounded-full font-bold text-white hover:scale-105 transition-transform">
                Update My Profile
              </button>
              <button className="px-8 py-4 border border-gray-700 rounded-full font-bold text-white hover:bg-white/5 transition-colors">
                Download PDF Guide
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArtistGuidelines;
