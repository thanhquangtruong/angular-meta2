import {Component, OnInit} from '@angular/core';
import {UserService} from './_services/user.service';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    currentUser: User;
    isAuthenticated: boolean;

    constructor(private _router: Router,
                private _auth: AuthService,
                private _userService: UserService) {
    }

    ngOnInit(): void {
        this.isAuthenticated = false;
        this.currentUser = null;
        // this._router.events.filter(event => event instanceof NavigationEnd)
        //     .subscribe((event: NavigationEnd) => {
        //         this.reCheckAuthorizationStatus();
        //     });
        this._auth.loggedIn$.subscribe(
            loggedIn => {
                this.changeAuthorizationStatus(loggedIn);
                console.log('AppComponent > loggedIn$ changed ' + loggedIn);
            }
        );
        // this.reCheckAuthorizationStatus();
    }

    changeAuthorizationStatus(loggedIn: boolean) {
        this.isAuthenticated = loggedIn;
        if (loggedIn) {
            this._userService.getCurrentUser().subscribe(user => this.currentUser = user);
        } else {
            this.currentUser = null;
        }
    }

    logout() {
        this._auth.logout();
        this._router.navigate(['']);
    }
}
