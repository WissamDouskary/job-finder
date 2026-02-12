import { Routes } from '@angular/router';
import { jobResolver } from './core/resolvers/job.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'jobs', pathMatch: 'full' },
    { path: 'jobs', loadComponent: () => import('./features/jobs/jobs-page/jobs-page').then(m => m.JobsPageComponent) },
    { path: 'favorites', loadComponent: () => import('./features/favorites/favorites-page/favorites-page').then(m => m.FavoritesPageComponent) },
    { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./features/auth/signup/signup').then(m => m.SignupComponent) },
    { path: 'profile', loadComponent: () => import('./features/profile/profile').then(m => m.ProfileComponent) },
    {
        path: 'job/:id',
        loadComponent: () => import('./features/jobs/job-detail/job-detail').then(m => m.JobDetailComponent),
        resolve: { job: jobResolver }
    },
];
