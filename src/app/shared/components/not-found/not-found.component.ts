import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ANIMATION_PATH } from '../../../core/constants/animation.constant';
@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [LottieComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  readonly router: Router = inject(Router);
  options: AnimationOptions = {
    path: ANIMATION_PATH.notFound,
    loop: true,
  };
  backToDashboard(): void {
    this.router.navigate(['/service-management']);
  }
}
