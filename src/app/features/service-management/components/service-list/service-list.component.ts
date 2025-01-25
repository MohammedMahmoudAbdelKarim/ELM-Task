import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { Service } from '../../models/service.model';
import { SERVICES } from '../../constants/services.constant';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { STATUS } from '../../constants/status.constant';
import { TableComponent } from './table/table.component';

@Component({
  standalone: true,
  selector: 'app-service-list',
  imports: [
    CommonModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SelectModule,
    ReactiveFormsModule,
    TableComponent,
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
  services: Service[] = [];
  filteredServices: Service[] = [];
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

  onStatusChange(status: string): void {
    if (status === 'All') {
      this.filteredServices = [...this.services]; // Return all services
    } else {
      this.filteredServices = this.services.filter(
        (service) => service.status === status
      );
    }
  }
}
