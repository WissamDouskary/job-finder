import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/users.service';
import { user } from '../../core/models/user.model';
import { userResponse } from '../../core/models/user-response.model';
import { toast } from 'ngx-sonner';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
    private _fb = inject(FormBuilder);
    private _userService = inject(UserService);
    private _router = inject(Router);

    currentUser: user | null = null;

    profileForm = this._fb.group({
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });

    ngOnInit() {
        const storedUser = this._userService.getCurrentUser();
        if (!storedUser) {
            this._router.navigate(['/login']);
            return;
        }

        this._userService.getAllUsers().subscribe({
            next: (users) => {
                this.currentUser = users.find(u => u.id === storedUser.id) || null;
                if (this.currentUser) {
                    this.profileForm.patchValue({
                        nom: this.currentUser.nom,
                        prenom: this.currentUser.prenom,
                        email: this.currentUser.email,
                        password: this.currentUser.password
                    });
                }
            }
        });
    }

    updateProfile() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        const initUser = this.profileForm.getRawValue();
        const updatedUser: user = {
            ...this.currentUser!,
            nom: initUser.nom as string,
            prenom: initUser.prenom as string,
            password: initUser.password as string
        };

        this._userService.updateUser(updatedUser).subscribe({
            next: (resp: user) => {
                this._userService.saveUser(resp as userResponse, this._userService.isRemembered());
                toast.success('Profile updated successfully');
            },
            error: () => {
                toast.error('Failed to update profile');
            }
        });
    }
}
