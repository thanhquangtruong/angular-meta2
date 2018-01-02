import {Component} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {

    constructor(private _auth: AuthService,
                private _router: Router) {
        if (this._auth.loggedIn) {
            this._router.navigate(['/user']);
        }
    }
}
