import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../core/services/users.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class NavbarComponent {
    private _userService = inject(UserService);

    isLoggedIn(){
        return this._userService.isLoggedIn();
    }

    logOut(){
        this._userService.logOut();
    }
}
