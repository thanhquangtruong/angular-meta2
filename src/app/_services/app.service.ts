import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {SERVER_ADDRESS} from '../clientDetail';


@Injectable()
export class AppService {

    // cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private _http: HttpClient,
                private _auth: AuthService) {
    }

    get(apiEndPoint): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this._auth.getToken());
        const options = ({headers: headers});
        return this._http.get(SERVER_ADDRESS + apiEndPoint, options);
    }

    post(apiEndPoint, bodyData): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this._auth.getToken());
        const options = ({headers: headers});
        return this._http.post(SERVER_ADDRESS + apiEndPoint, bodyData, options);
    }

    put(apiEndPoint, bodyData): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this._auth.getToken());
        const options = ({headers: headers});
        return this._http.put(SERVER_ADDRESS + apiEndPoint, bodyData, options);
    }

    delete(apiEndPoint): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-type', 'application/json');
        headers = headers.append('Authorization', 'Bearer ' + this._auth.getToken());
        const options = ({headers: headers});
        return this._http.delete(SERVER_ADDRESS + apiEndPoint, options);
    }

    // public collectFailedRequest(request): void {
    //     this.cachedRequests.push(request);
    // }
    //
    // public retryFailedRequests(): void {
    //     // retry the requests. this method can
    //     // be called after the token is refreshed
    // }
}
