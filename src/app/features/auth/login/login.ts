import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../../core/models/login.model';
import { userResponse } from '../../../core/models/user-response.model';
import { UserService } from '../../../core/services/users.service';
import { toast } from 'ngx-sonner';
import { Observable } from 'rxjs';
import { user } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private _fb = inject(FormBuilder);
  private _userService = inject(UserService);
  private _router = inject(Router);

  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  submitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: Login = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    const rememberMe = this.loginForm.value.rememberMe!;

    this._userService.login(payload, rememberMe).subscribe({
      next: (resp: userResponse | boolean) => {
        const user = resp as userResponse;

        const nUser: userResponse = {
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          id: user.id
        };

        this._userService.saveUser(nUser, rememberMe);
        toast.success('login successfuly');
        this._router.navigate(['/jobs']);
      },
      error: () => {
        toast.error('invalid credentials');
      },
    });
  }
}
