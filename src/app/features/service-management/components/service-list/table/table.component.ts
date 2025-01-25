import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { Service } from '../../../models/service.model';
import { CapitalizePipe } from '../../../../../core/pipes/capitalize.pipe';

@Component({
  standalone: true,
  selector: 'app-table',
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    CapitalizePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  readonly router: Router = inject(Router);
  @Input() services: Service[] = [];
  @Input() filteredServices: Service[] = [];
  tableHeaders: string[] = ['serviceName', 'code', 'type', 'status', '', ''];
  openViewDetails(): void {
    this.router.navigateByUrl('service-management/view-service-details');
  }
}
