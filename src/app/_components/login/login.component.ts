import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [
        '../../app.component.css',
        './login.component.css'
    ]
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    isRemember: boolean;
    error = null;

    constructor(private _auth: AuthService,
                private _route: Router) {
    }

    ngOnInit(): void {
        this.isRemember = false;
        if (this._auth.isAuthenticated()) {
            this.navigateHome();
        }
    }

    login() {
        this._auth.login(
            this.username,
            this.password,
            this.isRemember,
            data => this.onLoginSuccess(data),
            err => this.onLoginError(err));
        this._route.navigate(['/user']);
    }


    navigateHome() {
        this._route.navigate(['/user']);
    }

    onLoginSuccess(data) {
        // console.log('onLoginSuccess');
        // console.log(data);
        this.navigateHome();
    }

    onLoginError(err) {
        // console.log('onLoginError');
        this.error = err;
    }
}
