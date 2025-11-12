export const COLORS = {
    primary: '#2563EB',
    secondary: '#1E40AF',
    accent: '#3B82F6',
    white: '#FFFFFF',
    black: '#0F172A',
    gray: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      600: '#475569',
      800: '#1E293B',
    },
    status: {
      pending: '#F59E0B',
      review: '#3B82F6',
      shortlisted: '#10B981',
      rejected: '#EF4444',
    }
  };
  
  export const ROUTES = {
    DASHBOARD: '/dashboard',
    SUBMISSIONS: '/submissions',
    PROJECTS: '/projects',
    EVENTS: '/events',
    SETTINGS: '/settings',
  };
  
  export const STATUS_OPTIONS = [
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' },
  ];