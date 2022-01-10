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
    path: '/themes/:type',
    component: () => import('./pages/themes'),
    name: 'themes'
  },
  {
    path: '/theme/:index',
    component: () => import('./pages/theme'),
    name: 'theme'
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
  {
    path: '/:type/:id',
    component: () => import('./pages/detail'),
    name: 'detail',
  },
  {
    path: '/favorites',
    component: () => import('./pages/favorites'),
    name: 'favorites'
  },
  {
    path: '/login',
    component: () => import('./pages/login'),
    name: 'login'
  },
  // {
  //   path: '/suppliers',
  //   component: () => import('./pages/suppliers'),
  //   name: 'suppliers',
  //   meta: { requiresAuth: true }
  // },
  {
    path: '*',
    component: () => import('./pages/notfound'),
    name: 'notfound'
  }
]