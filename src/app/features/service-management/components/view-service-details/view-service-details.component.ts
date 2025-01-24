import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-view-service-details',
  imports: [CardModule, ButtonModule],
  templateUrl: './view-service-details.component.html',
  styleUrl: './view-service-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ViewServiceDetailsComponent {
  readonly router: Router = inject(Router);
  backToServiceList(): void {
    this.router.navigateByUrl('service-management/service-list');
  }
}
