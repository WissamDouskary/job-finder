import { Routes } from '@angular/router';
import { jobResolver } from './core/resolvers/job.resolver';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./features/jobs/jobs-page/jobs-page').then((m) => m.JobsPageComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites-page/favorites-page').then(
        (m) => m.FavoritesPageComponent,
      ),
      canActivate: [authGuard]
  },
  {
    path: 'my-jobs',
    loadComponent: () =>
      import('./features/my-jobs/my-jobs-page/my-jobs-page').then((m) => m.MyJobsPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup/signup').then((m) => m.SignupComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then((m) => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'job/:id',
    loadComponent: () =>
      import('./features/jobs/job-detail/job-detail').then((m) => m.JobDetailComponent),
    resolve: { job: jobResolver },
    canActivate: [authGuard],
  },
];
