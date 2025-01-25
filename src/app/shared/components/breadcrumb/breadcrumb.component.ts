import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbModule, RouterModule, CommonModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly router: Router = inject(Router);
  items: MenuItem[] | any = [];
  home: MenuItem | undefined;
  ngOnInit() {
    this.items =
      this.activatedRoute.snapshot.firstChild?.firstChild?.data['breadcrumbs'];
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(
          () =>
            this.activatedRoute.snapshot.firstChild?.firstChild?.data[
              'breadcrumbs'
            ]
        )
      )
      .subscribe((breadcrumb) => {
        this.items = breadcrumb;
      });
  }
}
