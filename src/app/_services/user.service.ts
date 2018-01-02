import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AppService} from './app.service';
import {User} from '../_models/user';

@Injectable()
export class UserService {

    userEndPoint = '/api/users';

    constructor(private _appService: AppService) {
    }

    getCurrentUser(): Observable<User> {
        return this._appService.get(this.userEndPoint);
    }

    getUserById(id: number): Observable<User> {
        return this._appService.get(this.userEndPoint + '/' + id);
    }
}
