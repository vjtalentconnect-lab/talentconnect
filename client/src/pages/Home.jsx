const Home = () => {
  return (
    <>
      <nav className="fixed w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="material-icons text-primary text-3xl">movie_filter</span>
              <span className="font-display font-bold text-2xl tracking-wide text-gray-900 dark:text-white">
                StarCast<span className="text-primary">India</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">Find Talent</a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">Find Work</a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">Productions</a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">About Us</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-primary hover:bg-yellow-600 text-white dark:text-black font-semibold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-primary/30">
                Sign In
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => document.documentElement.classList.toggle('dark')}>
                <span className="material-icons text-gray-600 dark:text-gray-300">brightness_4</span>
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-gray-600 dark:text-gray-300 hover:text-primary">
                <span className="material-icons text-3xl">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Cinematic Indian film set lighting" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASv0wK05pmUB7hdtge6cXmTfVbFivmDR7cxfdhRGQsR7O7vO2GLo_gUkHBoHi0yg5r9A4C0OipBTaJPu2xfWF8ecnmbEkOSi_gTw3NqdQF2uLswegTwOfVF_9XXfZ9esaODaqS7Jdlwm9pKuWsP9EFgrCYeE6tr-j2tou5G7qt3AVLtnttqYsQFAJecmvn8J40HgjzSeIF3uqbIQ3_HwFA2ZgCOTOeMfoEFb_c41dauYzSLd9YwQ_06K0N4ecU8IjoQYeu-SWBwWch" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent opacity-90 dark:opacity-95"></div>
          <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium tracking-wider mb-6 uppercase">
            Bridging Bollywood to Regional Cinema
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover the Future of <br />
            <span className="gold-text-gradient">Indian Cinema</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            The premier marketplace connecting exceptional talent with visionary directors across Bollywood, Tollywood, and the Ad Film industry.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a className="group relative px-8 py-4 bg-primary text-black font-bold rounded-lg overflow-hidden shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all transform hover:-translate-y-1" href="#">
              <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
              <span className="relative flex items-center justify-center gap-2">
                I am an Artist
                <span className="material-icons text-sm">arrow_forward</span>
              </span>
            </a>
            <a className="group px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm" href="#">
              <span className="flex items-center justify-center gap-2">
                I am a Director
                <span className="material-icons text-sm">movie</span>
              </span>
            </a>
          </div>
          <div className="mt-16 flex justify-center gap-8 md:gap-16 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">5k+</div>
              <div className="text-sm uppercase tracking-widest text-gray-400 mt-1">Artists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">1.2k+</div>
              <div className="text-sm uppercase tracking-widest text-gray-400 mt-1">Productions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary">200+</div>
              <div className="text-sm uppercase tracking-widest text-gray-400 mt-1">Castings Daily</div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 bg-white dark:bg-secondary border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-display font-bold text-gray-400 dark:text-gray-500 hover:text-primary cursor-default">Bollywood</span>
            <span className="text-2xl font-display font-bold text-gray-400 dark:text-gray-500 hover:text-primary cursor-default">Tollywood</span>
            <span className="text-2xl font-display font-bold text-gray-400 dark:text-gray-500 hover:text-primary cursor-default">Kollywood</span>
            <span className="text-2xl font-display font-bold text-gray-400 dark:text-gray-500 hover:text-primary cursor-default">TV Serials</span>
            <span className="text-2xl font-display font-bold text-gray-400 dark:text-gray-500 hover:text-primary cursor-default">OTT Originals</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Rising Stars</h2>
              <h3 className="font-display text-4xl text-gray-900 dark:text-white font-bold">Trending Talents</h3>
            </div>
            <a className="hidden sm:flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium" href="#">
              View All Talents <span className="material-icons ml-2">arrow_right_alt</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Four sample cards - images and content preserved from original HTML */}
            <div className="group bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="relative h-80 overflow-hidden">
                <img alt="Indian Actor Portrait" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZCOHjr6GjdbAViOhOCvn-M4FN9ecLXHWtOolL_H7fiF0OyJqzAsZ77ul0hc3umyHQCHDrt8WWivDI2swYEsx5G2plPT1zSG8wpn1KLf6mgliJEbhkpDGV1r4-8YwFy78GonZ5pW3Suc2D_9ci1Ldu7suTx3s0tA0EOknT3DfB4rNKqMOpzwbEo2ws7Hwo2d3mk8MQOv_ClQVSDKqHo1zohqTGQE3MDSfuluzP7yRm1oHA2rzoScgGrpAkDWCNGcEi4b0Jm7C27Plt" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs font-semibold bg-primary text-black px-2 py-0.5 rounded mb-2 inline-block">Featured</p>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-1">Aarav Sharma</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                  <span className="material-icons text-sm text-primary">location_on</span> Mumbai, MH
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Method Acting</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Action</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Dance</span>
                </div>
                <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-black font-medium rounded-lg transition-colors text-sm">View Profile</button>
              </div>
            </div>

            <div className="group bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="relative h-80 overflow-hidden">
                <img alt="Indian Actress Portrait" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOlX4922muLcI6JiEOICu9Q__52nmFYhFCNwx9R5cgIZAiNrSBZxhcPBtzRR-gS3JtzhV1pVA51EROYThFWe9qJxmsOE0sn-gPoj3V89P9Uqcs4rBnXKWdjo4pdvG16A5t_squ_07ZA0fQTa1xRwVe57Bxrrvpk7YEij2FayA47pleFLv_xxHSlfoCIxp3TPQxm5PPb5sld9onB_YqStiZirxHcTrK5ceKRPpPeL5sGCveS0U7azTa67knO7bXSdhJ5uC3kux2OdTh" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-1">Priya Reddy</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                  <span className="material-icons text-sm text-primary">location_on</span> Hyderabad, TS
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Classical Dance</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Drama</span>
                </div>
                <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-black font-medium rounded-lg transition-colors text-sm">View Profile</button>
              </div>
            </div>

            <div className="group bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="relative h-80 overflow-hidden">
                <img alt="Indian Model Portrait" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxJ5PtY7WdujCrlEuDMyRMBgqyKI9NaKPgHQIHHfWj6BkuVdGwm177Kx2r8zZHebPTMUU5_9Xou5eGTvE0cdQ8tv-O0ly6cCU20_aUSLG_cAtc-TcZJBSIuOC6iUAL6FHrI9jafcqIajewvcof1tMIx2I6lnrSdIGsOzGQU79zNZuK7XYeJL6gveQrG1tsmAYvU3nQkg2AVDsw2obF6tSLGpg5bdmWM0F389YQGfMDL02r7auL3Qeh7EExlvbo9xeSyNIhYSfxUCTi" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-1">Vikram Singh</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                  <span className="material-icons text-sm text-primary">location_on</span> New Delhi, DL
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Modeling</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Theatre</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Voiceover</span>
                </div>
                <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-black font-medium rounded-lg transition-colors text-sm">View Profile</button>
              </div>
            </div>

            <div className="group bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="relative h-80 overflow-hidden">
                <img alt="Indian Artist Portrait" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl5jbRq4HRD_Dn0MlGrQfX6BVC_CgThragFWhXyQnO42ToJqLrs5LZkPTW5iCB2zpoe8vQyAi6JDUMcxZDBv_O3XFItoZuXLIJe5C6UfyVvx93867ElVHNymqND5sKDrrhuID1fz7dcDm0HcHV57yJm6dOi5kMvXW8f6xiXS0Hz9GlJRYqmvfL4HDrocadMXH4Hg6wgXK0iKo16Ifa_B9Pof5rCWw8eMOY_ArKA3fZbFYx_-UOtVcUnxhwHUbkO9uueYAcW7EvRdP3" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-1">Meera Kapoor</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                  <span className="material-icons text-sm text-primary">location_on</span> Bengaluru, KA
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Singing</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-gray-600 dark:text-gray-300">Guitar</span>
                </div>
                <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-black font-medium rounded-lg transition-colors text-sm">View Profile</button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center sm:hidden">
            <a className="inline-block border border-gray-300 dark:border-gray-700 px-6 py-2 rounded-full text-gray-600 dark:text-gray-300 font-medium" href="#">View All Talents</a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-white font-bold mb-4">Elevate Your Production</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We simplify the casting process with technology and dedicated support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-icons text-black text-3xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Verified Profiles</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Every artist on StarCast India undergoes a strict verification process to ensure authenticity and professionalism.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-icons text-black text-3xl">groups</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Diverse Talent Pool</h3>
              <p className="text-gray-400 text-sm leading-relaxed">From seasoned Bollywood veterans to fresh faces from regional theatre, find the perfect match for any role.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-6">
                <span className="material-icons text-black text-3xl">handshake</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Direct Connection</h3>
              <p className="text-gray-400 text-sm leading-relaxed">No middlemen. Connect directly with talent or their managers through our secure messaging platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Casting Calls</h2>
              <h3 className="font-display text-4xl text-gray-900 dark:text-white font-bold">Featured Productions</h3>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-black text-sm font-bold rounded-full">Feature Films</button>
              <button className="px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">Ad Films</button>
              <button className="px-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">Web Series</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col sm:flex-row bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group">
              <div className="sm:w-2/5 relative overflow-hidden">
                <img alt="Production Set" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB78xFAQDjW-tfAEnUPwZm5NyydF5SmDmLP-4_Nk6BvRVE0f_ZUqbxDkSIPyfRsVgAbq0MXkTn3d5ikEuddrCnwFEM0BALL5Jp71c22vso2S1V-AyI6_AbeZfiqWnV0vX4zouKbjZC59MVNcaWkgJ-ldfKfHAo2sTFtXopn4rL0GtoQlTWyshqHZwngw8NHHapy6gWaGk68P4O8Qy6LseEUB1B1wi68qzdvzEJQoOeauKK2UbVE9pxmc3hebzxG-z3g9tDGmJYQlhr" />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">URGENT</div>
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Yash Raj Films</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Feature Film</span>
                  </div>
                  <h4 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">The Last Dynasty</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">Looking for lead actors (Male/Female, age 25-30) for a historical drama set in the Mughal era.</p>
                  <div className="flex gap-4 mb-4">
                    <div>
                      <span className="block text-xs text-gray-400 uppercase">Role</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Lead Actor</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase">Budget</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">₹ High</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase">Location</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Rajasthan</span>
                    </div>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">Apply Now</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group">
              <div className="sm:w-2/5 relative overflow-hidden">
                <img alt="TV Commercial Set" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO8Y5i76CXk_BjRxpHP8gGJ37d0a9mD6cleyqEaElxPCC5iwpCGWvJE01U7wrSmjJzU-Vs62PmDM9wFEDLUmlDMqSJZcY4LaTnIZz-puM9GcL6nPkmmoJAcVBDYI-SRs8lAuhgqpvpCmcSHnjtA-8ndXQ4SE7-1uCRwy1553CLXoNK71okAp-eL_ec7BHTk04zFkJ5aOMpQgH45yy9L0vhOhtgwBHRwFS12n45V_jmZ5SGXHm_RIFhuwxcJm06APTtUwBZAx1U3guf" />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Ogilvy India</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">TV Commercial</span>
                  </div>
                  <h4 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">Lifestyle Brand Campaign</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">Casting for energetic dancers and models for a national clothing brand summer campaign.</p>
                  <div className="flex gap-4 mb-4">
                    <div>
                      <span className="block text-xs text-gray-400 uppercase">Role</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Models</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase">Budget</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">₹25k/Day</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-400 uppercase">Location</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Mumbai</span>
                    </div>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors">Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-black mb-6">Ready to make your mark?</h2>
          <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto">Join thousands of actors, directors, and production houses building the future of Indian entertainment.</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-lg">Join for Free</button>
            <button className="px-8 py-3 bg-white/20 text-black border-2 border-black font-bold rounded-lg hover:bg-black hover:text-white transition-colors">Browse Jobs</button>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-icons text-primary text-2xl">movie_filter</span>
                <span className="font-display font-bold text-xl tracking-wide text-white">StarCast<span className="text-primary">India</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-6">India's most trusted platform for discovering talent and casting for films, ads, and web series.</p>
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
                <li className="flex items-center gap-2"><span className="material-icons text-xs">email</span> support@starcast.in</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs">phone</span> +91 22 4567 8900</li>
                <li className="flex items-center gap-2"><span className="material-icons text-xs">place</span> Film City, Goregaon, Mumbai</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">© 2023 StarCast India Pvt Ltd. All rights reserved. Privacy Policy | Terms of Service</div>
        </div>
      </footer>
    </>
  );
};

export default Home;
