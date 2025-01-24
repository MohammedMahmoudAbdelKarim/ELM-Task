import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MenuLink } from '../core/models/menu-link.model';
import { MENU_LINKS } from '../core/constants/menu-links.constant';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    AvatarModule,
    MatButtonModule,
    BreadcrumbComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [MatIconRegistry],
})
export class LayoutComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  public menuLinks: MenuLink[] = MENU_LINKS;

  constructor(
    private _observer: BreakpointObserver,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'arrow-down',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/arrow-down.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'service-mgt',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/service-mgt.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'price-mgt',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/price-mgt.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'invoice-mgt',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/invoice-mgt.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'user-mgt',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/user-mgt.svg'
      )
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this._observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this._cdr.detectChanges();
  }

  public logout() {
    this._router.navigateByUrl('/auth/login');
  }
}
