import { Routes } from '@angular/router';
import { BREADCRUMB } from './constants/breadcrumb.constants';

export default [
  {
    path: '',
    redirectTo: 'service-list',
    pathMatch: 'full',
  },
  {
    path: 'service-list',
    data: BREADCRUMB.serviceList,
    loadComponent: () =>
      import('./components/service-list/service-list.component').then(
        (c) => c.ServiceListComponent
      ),
  },
  {
    path: 'view-service-details',
    data: BREADCRUMB.viewServiceDetails,
    loadComponent: () =>
      import(
        './components/view-service-details/view-service-details.component'
      ).then((c) => c.ViewServiceDetailsComponent),
  },
] as Routes;
