export const routes = [
  {
    path: '/admin',
    component: () => import('./pages/admin/index'),
    name: 'admin',
    meta: { requiresAuth: true },
    redirect: '/admin/themes',
    children: [
      {
        path: 'themes',
        component: () => import('./pages/admin/themes'),
        name: 'admin-themes'
      },
      {
        path: 'users',
        component: () => import('./pages/admin/users'),
        name: 'admin-users'
      },
      {
        path: 'suppliers',
        component: () => import('./pages/admin/suppliers'),
        name: 'admin-suppliers'
      },
      {
        path: 'setting',
        component: () => import('./pages/admin/setting'),
        name: 'admin-setting'
      },
    ]
  },
  {
    path: '/admin-login',
    component: () => import('./pages/admin/admin-login'),
    name: 'admin-login'
  },
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
    path: '/user-login',
    component: () => import('./pages/user-login'),
    name: 'user-login'
  },
  {
    path: '/user-password-forget',
    component: () => import('./pages/user-password-forget'),
    name: 'user-password-forget'
  },
  {
    path: '/user-password-reset',
    component: () => import('./pages/user-password-reset'),
    name: 'user-password-reset'
  },
  {
    path: '/suppliers',
    component: () => import('./pages/suppliers'),
    name: 'suppliers',
    meta: { requiresAuth: true }
  },
  {
    path: '/supplier-login',
    component: () => import('./pages/supplier-login'),
    name: 'supplier-login'
  },
  {
    path: '*',
    component: () => import('./pages/notfound'),
    name: 'notfound'
  }
]