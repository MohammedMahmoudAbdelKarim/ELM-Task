import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { Service } from '../../models/service.model';
import { SERVICES } from '../../constants/services.constant';
import { SkeletonModule } from 'primeng/skeleton';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { STATUS } from '../../constants/status.constant';

@Component({
  standalone: true,
  selector: 'app-service-list',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    TagModule,
    SkeletonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [ApiService],
})
export class ServiceListComponent {
  searchControl: FormControl = new FormControl('');
  readonly router: Router = inject(Router);
  readonly apiService: ApiService = inject(ApiService);
  loading: boolean = true;
  services: Service[] = [];
  filteredServices: Service[] = [];
  activityValues: number[] = [0, 100];
  statuses = STATUS;
  ngOnInit() {
    this.getAllServices();
    this.searchServiceNameOrCode();
  }

  searchServiceNameOrCode(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterServices(searchTerm);
      });
  }

  filterServices(searchTerm: string) {
    if (!searchTerm) {
      this.filteredServices = this.services; // Show all services if search term is empty
    } else {
      this.filteredServices = this.services.filter(
        (service) =>
          service.serviceName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  getAllServices(): void {
    this.services = SERVICES;
    this.filteredServices = SERVICES;
  }

  openViewDetails(): void {
    this.router.navigateByUrl('service-management/view-service-details');
  }
}
