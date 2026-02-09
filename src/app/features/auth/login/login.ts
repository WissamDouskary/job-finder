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

    this._userService.login(payload).subscribe({
      next: (resp) => {
        localStorage.setItem('user', JSON.stringify(resp));
        toast.success('login successfuly');
        this._router.navigate(['/jobs']);
      },
      error: () => {
        toast.error('invalid credentials');
      }
    });
  }
}
