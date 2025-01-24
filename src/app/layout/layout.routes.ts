import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'service-management',
        pathMatch: 'full',
      },
      {
        path: 'service-management',
        loadChildren: () =>
          import('../features/service-management/service-management.routes'),
      },
    ],
  },
] as Routes;
