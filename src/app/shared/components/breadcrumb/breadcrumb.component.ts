import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgxSignalBreadcrumbService } from 'ngx-signal-breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { BreadCrumb } from '../../../core/models/breadcrumb.model';
@Component({
  selector: 'app-breadcrumb',
  imports: [BreadcrumbModule, RouterModule, CommonModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  readonly #ngxSignalBreadcrumbService: NgxSignalBreadcrumbService<BreadCrumb> =
    inject(NgxSignalBreadcrumbService);
  readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly router: Router = inject(Router);
  items: MenuItem[] | any = this.#ngxSignalBreadcrumbService.breadcrumbs();
  home: MenuItem | undefined;

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = this.#ngxSignalBreadcrumbService.breadcrumbs();
      });
  }
}
