import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { user } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/users.service';
import { userResponse } from '../../../core/models/user-response.model';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  private _fb = inject(FormBuilder);
  private _usersService = inject(UserService);
  private _router = inject(Router);

  registrationForm = this._fb.group({
    firstName: ['', [Validators.required, Validators.minLength(4)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  submitRegister() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const payload: user = {
      nom: this.registrationForm.value.lastName!,
      prenom: this.registrationForm.value.firstName!,
      email: this.registrationForm.value.email!,
      password: this.registrationForm.value.password!,
    };

    this._usersService.register(payload).subscribe({
      next: () => {
        toast.success('account created successfuly!');
        this._router.navigate(['/login']);
      },
      error: () => {
        toast.error('error while creating account !');
      },
    });
  }
}
