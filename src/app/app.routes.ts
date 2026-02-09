import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'jobs', pathMatch: 'full' },
    { path: 'jobs', loadComponent: () => import('./features/jobs/jobs-page/jobs-page').then(m => m.JobsPageComponent) },
    { path: 'favorites', loadComponent: () => import('./features/favorites/favorites-page/favorites-page').then(m => m.FavoritesPageComponent) },
    { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./features/auth/signup/signup').then(m => m.SignupComponent) },
];
