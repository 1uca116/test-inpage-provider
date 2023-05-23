const ROUTES = {
  index: { path: '/' },
  stats: { path: 'stats' },
  nft: { path: 'nft' },
  profile: {
    path: 'profile',
  },
  bundles: {
    path: 'bundle',
  },
} as const;

export default ROUTES;
