export const routes = [
  {
    path: '/',
    component: () => import('./pages/home'),
    name: 'home'
  },
  {
    path: '/search',
    component: () => import('./pages/search'),
    name: 'search'
  },
  {
    path: '/scenicspots',
    component: () => import('./pages/scenicspots'),
    name: 'scenicspots'
  },
  {
    path: '/activities',
    component: () => import('./pages/activities'),
    name: 'activities'
  },
  {
    path: '/restaurants',
    component: () => import('./pages/restaurants'),
    name: 'restaurants'
  },
  {
    path: '/hotels',
    component: () => import('./pages/hotels'),
    name: 'hotels'
  },
]