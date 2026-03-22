import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedWorkshops, getWorkshops } from '../services/workshopService';

const fallbackCards = [
  {
    title: 'The Art of Method Acting',
    mentor: 'Manoj Bajpayee',
    location: 'In-Person • Mumbai',
    date: 'Oct 24, 2024',
    time: '10:00 AM',
    price: '₹4,999',
    badge: 'National Award Winner',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWCacsiogTe7V92EoAW2xZcWjiBWPu6GeJXKW8di4zefgw_sLuoP9CAQxOoeu9Bk0rWu0spgTLNArDxK41dxgX2UeAezZCnid3K3VVA3ZmTsQ7c0cwrnO6wcUq5bk3F8HGhp1AKciIEZVbzczQC1xk5OL6limwTgbNrWtkYwgOQO6pPScpdxJcJuIzoKO4oorz_oSzT1tptXpskte-84mlvGX80PJI7TufIVGmHA7caaADqVn5Od8YuBq8BJy5tMCFIflkZwfBcpqG',
  },
  {
    title: 'Mastering Low Light Visuals',
    mentor: 'Santosh Sivan',
    location: 'Online • Interactive',
    date: 'Oct 28, 2024',
    time: '02:00 PM',
    price: '₹3,499',
    badge: 'Padma Shri Awardee',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIzN9AL8sECBsFI8M-GvniOgzzSWXcJ2Qlhy468zU2t81hFKUc0SOTx4mda7BEKiqPFNapU3JXPAj2bwDztDWHQvu0bN4mw-RwA-76CZeEK3nURhWQO-Qk6PrTnRrwCi1F4xWi1rL7hdR5FoNC3RCbpqYB2aD28FyhGK8Gs18XPd_NbMOTNIj7uOUoEvZPfowcBUq2EnTInumisbGSaIndxpOEb4M-RDc92qtLnP6fzw6sGZuE3g7EWl3Q4p8RErznWXpA6VDetzve',
  },
  {
    title: 'Writing the Modern Thriller',
    mentor: 'Sriram Raghavan',
    location: 'Online • Interactive',
    date: 'Nov 05, 2024',
    time: '06:00 PM',
    price: '₹2,999',
    badge: 'Director of “Andhadhun”',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARc9pZmpVMuCif8Zh2HVDTkdporO6CEeV3eMiPuyiBvN19A60xMHovYyiYuTGtWt6VquY1j3kF8ILK1a7--M3MaCRPNOreryhIWejIE7-km8mhU5Z8qm9Sc8H32pNJ_3wStOOFqeIQafcDwjNqbUwgCiFeYOtGfMy1bsZ00VIUb_i4n-vy5dDyo-M8CAM-qyupv2_5S1uNQRlcrvazS7B65cXGjHsedYpm9ouFU7CNbwb3MFGNUBuRBSd56shwgNUJJvF_1x7lolzy',
  },
];

const WorkshopPortalSection = ({ variant = 'home' }) => {
  const [workshops, setWorkshops] = useState(fallbackCards);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Try featured first, fall back to general list
        const data =
          (await getFeaturedWorkshops({ limit: 6 }).catch(() => null)) ||
          (await getWorkshops({ limit: 6, type: 'upcoming' }));
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((w) => ({
            title: w.title || w.name,
            mentor: w.instructorName || w.mentor || 'Instructor',
            location: w.mode && w.city ? `${w.mode} • ${w.city}` : w.location || 'Online',
            date: w.startDate ? new Date(w.startDate).toLocaleDateString() : w.date || 'TBD',
            time: w.startTime || w.time || 'TBD',
            price: w.price ? `₹${w.price}` : '₹ —',
            badge: w.badge || w.tagline || '',
            img: w.bannerImage || w.image || w.thumbnail || fallbackCards[0].img,
            id: w._id || w.id,
          }));
          setWorkshops(mapped);
        }
      } catch (err) {
        console.error('Workshops fetch failed, using fallback:', err?.message || err);
        setWorkshops(fallbackCards);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const subtitle =
    variant === 'talent'
      ? 'Build booking-ready skills with live mentors and on-demand masterclasses.'
      : variant === 'director'
      ? 'Upskill your crew and discover vetted mentors for your production slate.'
      : 'Workshops, masterclasses, and on-demand learning from industry legends.';

  return (
    <section
      className={`py-16 ${
        ['home', 'talent', 'director'].includes(variant)
          ? 'bg-[rgb(34_16_18)]'
          : 'bg-zinc-900/40'
      } dark:bg-background-dark`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-2">
              Workshops & Masterclasses
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Master the Craft {variant === 'director' && 'with Your Team'}
            </h2>
            <p className="text-zinc-400 mt-3 max-w-2xl text-sm md:text-base">{subtitle}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/workshops"
              className="px-5 py-3 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition"
            >
              Browse All
            </Link>
            <button className="px-5 py-3 rounded-lg border border-zinc-700 text-white text-sm font-semibold hover:bg-white/5 transition">
              Save My Seat
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? fallbackCards : workshops).map((card, idx) => (
            <div
              key={card.id || card.title || idx}
              className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-primary/60 transition-all flex flex-col shadow-lg shadow-black/20"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-bold rounded-full border border-white/10 uppercase tracking-tighter">
                    {card.location}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white mb-1 leading-snug">{card.title}</h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider">{card.mentor}</p>
                  <p className="text-zinc-500 text-[11px] font-medium italic">{card.badge}</p>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <span className="material-icons text-sm">calendar_today</span>
                      <span>{card.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-icons text-sm">schedule</span>
                      <span>{card.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <span className="text-xl font-black text-white">{card.price}</span>
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all active:scale-95">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopPortalSection;
