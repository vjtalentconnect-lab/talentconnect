const DEFAULT_AVATAR = (name = 'User') =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ee2b3b&color=fff`;

const normalizeImage = (value, fallbackName) => {
  if (value && value !== 'no-photo.jpg') return value;
  return DEFAULT_AVATAR(fallbackName);
};

export const buildDashboardIdentity = ({ user, profile, fallbackUserData } = {}) => {
  const role = user?.role || profile?.user?.role || profile?.role || null;
  const fullName =
    profile?.fullName ||
    user?.fullName ||
    fallbackUserData?.name ||
    (role === 'director' ? 'Director' : role === 'talent' ? 'Artist' : role === 'admin' ? 'Admin' : 'Member');

  let roleTitle = fallbackUserData?.roleTitle || '';
  if (role === 'director') {
    roleTitle = `${profile?.companyName || user?.companyName || 'Production House'} • ${profile?.location || user?.location || 'India'}`;
  } else if (role === 'talent') {
    roleTitle = `${profile?.talentCategory || user?.talentCategory || 'Artist'} • ${profile?.location || user?.location || 'India'}`;
  } else if (role === 'admin') {
    roleTitle = `${user?.email || 'Administrator'} • TalentConnect`;
  }

  const avatar = normalizeImage(
    profile?.profilePicture || user?.profilePicture || fallbackUserData?.avatar,
    fullName
  );

  return {
    name: fullName,
    roleTitle,
    avatar,
  };
};
