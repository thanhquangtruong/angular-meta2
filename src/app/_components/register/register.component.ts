import {Component} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {User} from '../../_models/user';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: [
        '../../app.component.css',
        './register.component.css'
    ]
})
export class RegisterComponent {
    hasError = false;
    error: string;

    user = new User();

    constructor(private _auth: AuthService,
                private _route: Router,
                public snackBar: MatSnackBar) {
    }

    register() {
        this._auth.register(this.user).subscribe(
            rUser => {
                this.onRegisterSuccess();
            },
            err => {
                console.log(err);
                this.hasError = true;
                this.error = err.error.message;
            }
        );
    }

    navigateLogIn() {
        this._route.navigate(['/login']);
    }

    onRegisterSuccess() {
        this.openSnackBar('Registered! Flease log in to continue !', 'Login');
    }

    openSnackBar(message: string, action: string) {
        const snackBarRef = this.snackBar.open(message, action, {
            duration: 10000,
        });
        snackBarRef.onAction().subscribe(() => {
            this.navigateLogIn();
        });
    }
}
