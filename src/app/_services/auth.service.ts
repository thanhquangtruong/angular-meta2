import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {isNullOrUndefined} from 'util';
import {CLIENT_ID, CLIENT_SECRET, SERVER_ADDRESS} from '../clientDetail';
import {User} from '../_models/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

    userProfile: User;
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

    constructor(private _http: HttpClient) {
        // If authenticated, set local profile property and update login status subject
        if (this.isAuthenticated) {
            this.userProfile = JSON.parse(localStorage.getItem('profile'));
            this._setLoggedIn(true);
        }
    }

    private _setLoggedIn(value: boolean) {
        // Update login status subject
        this.loggedIn$.next(value);
        this.loggedIn = value;
    }

    private _authorize(username: string, password: string) {
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('password', password);
        params = params.append('grant_type', 'password');
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
        headers = headers.append('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
        return this._http.post(SERVER_ADDRESS + '/oauth/token', null, {headers: headers, params: params});
    }

    login(username, password, remember, onSuccess, onError) {
        // Auth0 _authorize request
        this._authorize(username, password).subscribe(
            data => {
                this._getProfile(data, remember);
                onSuccess(data);
            },
            err => {
                onError(err);
            }
        );
    }

    private _getProfile(authResult, remember) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
        headers = headers.append('Authorization', 'Bearer ' + authResult.access_token);
        this._http.get(SERVER_ADDRESS + '/api/users', {headers: headers}).subscribe(
            userData => {
                this._setSession(authResult, userData, remember);
            },
            err => {
                // console.log('auth service -> get profile ERR' + err);
            }
        );
    }

    private _setSession(authResult, profile, remember) {
        // Save session data and update login status subject
        if (remember) {
            localStorage.setItem('access_token', authResult.access_token);
            localStorage.setItem('profile', JSON.stringify(profile));
            const expTime = authResult.expiresIn * 1000 + Date.now();
            localStorage.setItem('expires_at', JSON.stringify(expTime));
            // localStorage.setItem('refresh_token', authResult.refresh_token);
            // localStorage.setItem('refresh_expires', JSON.stringify((60 * 60 * 24 * 30) * 1000 + Date.now()));
        } else {
            sessionStorage.setItem('access_token', authResult.access_token);
            sessionStorage.setItem('profile', JSON.stringify(profile));
        }
        this.userProfile = profile;
        this._setLoggedIn(true);
    }

    logout() {
        // Remove tokens and profile and update login status subject
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('profile');
        localStorage.removeItem('expires_at');

        sessionStorage.clear();

        this.userProfile = undefined;
        this._setLoggedIn(false);
    }

    // _refreshToken(refreshToken, success, error) {
    //     const params = new HttpParams();
    //     params.append('grant_type', 'refresh_token');
    //     params.append('refresh_token', refreshToken);
    //     const headers = new HttpHeaders();
    //     headers.set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    //     headers.set('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
    //     this._http.post(SERVER_ADDRESS + '/oauth/token', null, {headers: headers, params: params})
    //         .subscribe(
    //             data => {
    //                 success(data);
    //             },
    //             err => {
    //                 error(err);
    //             }
    //         )
    // }

    getToken(): string {
        const session = sessionStorage.getItem('access_token');
        if (!isNullOrUndefined(session)) {
            return session;
        } else {
            if (Date.now() < JSON.parse(localStorage.getItem('expires_at'))) {
                return localStorage.getItem('access_token');
            }
            this.logout();
            return null;
        }
    }

    isAuthenticated(): boolean {
        // console.log('auth service > get token');
        // console.log(this.getToken());
        return !isNullOrUndefined(this.getToken());
    }

    register(user: User) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        headers = headers.append('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
        const options = ({headers: headers});
        return this._http.post(SERVER_ADDRESS + '/api/users', user, options);
    }
}
