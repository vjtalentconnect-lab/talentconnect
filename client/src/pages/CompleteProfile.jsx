import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMyProfile, updateProfile } from '../services/profileService';

const talentCategories = [
  'Actor',
  'Background Artist',
  'Child Artist',
  'Model',
  'Theatre Actor',
  'Voiceover Artist',
  'Singer',
  'Musician',
  'Dancer / Choreographer',
  'Stunt Performer',
  'Comedian',
  'Influencer / Creator',
  'Anchor / Host',
  'Cinematographer',
  'Editor',
  'Writer / Screenplay',
  'Makeup / Hair',
  'Costume / Stylist',
  'Production Crew',
];

const industryTypes = [
  'Feature Films',
  'OTT / Web Series',
  'Advertising / Commercials',
  'Television',
  'Documentaries',
  'Short Films',
  'Music Videos',
  'Animation / VFX',
  'Branded Content',
  'Corporate / Industrial',
  'Theatre / Live Events',
  'Fashion Films',
  'Regional Cinema',
];

const getRequiredFields = (role) =>
  role === 'director'
    ? ['fullName', 'mobile', 'location', 'companyName', 'industryType']
    : ['fullName', 'mobile', 'location', 'talentCategory'];

const CompleteProfile = () => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const persistedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  }, []);

  const role = locationState.state?.role || persistedUser.role || 'talent';

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    location: '',
    companyName: '',
    industryType: '',
    talentCategory: '',
  });
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const res = await getMyProfile();
        const profile = res.data?.data || res.data || {};
        setFormData({
          fullName: profile.fullName || '',
          mobile: profile.mobile || '',
          location: profile.location || '',
          companyName: profile.companyName || '',
          industryType: profile.industryType || '',
          talentCategory: profile.talentCategory || '',
        });
        setProfilePicture(profile.profilePicture || '');
        const required = getRequiredFields(role);
        setMissing(required.filter((field) => !profile?.[field]));
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load your profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        fullName: formData.fullName,
        mobile: formData.mobile,
        location: formData.location,
      };

      if (role === 'director') {
        payload.companyName = formData.companyName;
        payload.industryType = formData.industryType;
      } else {
        payload.talentCategory = formData.talentCategory;
      }

      await updateProfile(payload);
      navigate(role === 'director' ? '/dashboard/director' : '/dashboard/talent');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save your details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <p className="text-lg font-semibold">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 md:p-10">
        <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
              Complete your profile
            </p>
            <h1 className="text-2xl md:text-3xl font-black leading-tight">
              We saved what Google/LinkedIn shared. Finish the essentials.
            </h1>
            {missing.length > 0 && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Missing: {missing.join(', ')}. These help casting teams trust your profile.
              </p>
            )}
          </div>
          {profilePicture && (
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <img
                src={profilePicture}
                alt="Profile"
                className="h-12 w-12 rounded-full object-cover border border-primary/30"
              />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                Pulled from your social account
              </span>
            </div>
          )}
        </div>

        <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mobile Number</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="+91 98765 43210"
              type="tel"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="City, Country"
            />
          </div>

          {role === 'director' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Production House / Studio</label>
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="e.g. Dharma Productions"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Industry Focus</label>
                <select
                  name="industryType"
                  value={formData.industryType}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="">Select industry</option>
                  {industryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Talent Category</label>
              <select
                name="talentCategory"
                value={formData.talentCategory}
                onChange={handleChange}
                required
                className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="">Select category</option>
                {talentCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose the category you audition for most. You can fine-tune skills later.
              </p>
            </div>
          )}

          {error && (
            <div className="md:col-span-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-200 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 ${
                saving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {saving ? 'Saving...' : 'Save & Continue'}
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We only ask once. You can edit these any time from Settings.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
