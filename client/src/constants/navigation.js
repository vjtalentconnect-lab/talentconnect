export const TALENT_MENU = [
  { icon: 'dashboard',       label: 'Dashboard',       path: '/dashboard/talent' },
  { icon: 'search',          label: 'Discovery',        path: '/talent/discovery',        requiresVerification: true },
  { icon: 'person',          label: 'My Profile',       path: '/talent/portfolio' },
  { icon: 'analytics',       label: 'Analytics',        path: '/talent/analytics',        requiresVerification: true },
  { icon: 'work',            label: 'Applied Projects', path: '/talent/applied-projects', requiresVerification: true },
  {
    icon: 'event_available',
    label: 'Audition Invites',
    path: '/talent/audition-invites',
    requiresVerification: true,
  },
  { icon: 'chat',            label: 'Messages',         path: '/talent/messages',         requiresVerification: true },
  { icon: 'workspace_premium', label: 'Upgrade Plan',  path: '/talent/upgrade' },
  { type: 'section', label: 'Preferences' },
  { icon: 'settings',        label: 'Settings',         path: '/talent/settings' },
  { icon: 'help',            label: 'Support',          path: '/support' },
];

export const DIRECTOR_MENU = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard/director' },
  { icon: 'search', label: 'Discovery', path: '/director/discovery' },
  { icon: 'badge', label: 'My Portfolio', path: '/director/portfolio' },
  { icon: 'folder', label: 'My Projects', path: '/director/my-projects' },
  { icon: 'star', label: 'Shortlists', path: '/director/shortlists' },
  { icon: 'chat', label: 'Messages', path: '/director/messages' },
  { type: 'section', label: 'Preferences' },
  { icon: 'settings', label: 'Settings', path: '/director/settings' },
  { icon: 'help', label: 'Support', path: '/support' },
];

export const ADMIN_MENU = [
  { icon: 'dashboard', label: 'Overview', path: '/dashboard/admin', active: true },
  { icon: 'search', label: 'Global Search', path: '/admin/search' },
  { type: 'section', label: 'Management' },
  { icon: 'group', label: 'User Management', path: '/admin/users' },
  { icon: 'verified_user', label: 'Verifications', path: '/admin/verifications' },
  { icon: 'account_tree', label: 'Project Oversight', path: '/admin/projects' },
  { icon: 'admin_panel_settings', label: 'RBAC Settings', path: '/admin/rbac' },
  { icon: 'vital_signs', label: 'System Health', path: '/admin/health' },
  { type: 'section', label: 'Operations' },
  { icon: 'payments', label: 'Financials', path: '/admin/financials' },
  { icon: 'cloud_done', label: 'Media Storage', path: '/admin/storage' },
  { icon: 'chat_bubble', label: 'Communication Center', path: '/admin/communication' },
  { icon: 'settings', label: 'System Settings', path: '/admin/settings' },
];
