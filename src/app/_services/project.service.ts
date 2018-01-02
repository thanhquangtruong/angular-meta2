import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AppService} from './app.service';
import {ProjectWithRole} from '../_models/projectWithRole';
import {Project} from '../_models/project';

@Injectable()
export class ProjectService {

    endPoint = '/api/projects';

    constructor(private _appService: AppService) {
    }

    getProjectsOfCurrentUser(): Observable<ProjectWithRole[]> {
        return this._appService.get(this.endPoint);
    }

    createProject(project: Project) {
        return this._appService.post(this.endPoint, project);
    }

    getProjectById(id: number) {
        return this._appService.get(this.endPoint + '/' + id);
    }

    updateProject(project: Project) {
        return this._appService.put(this.endPoint, project);
    }

    deleteProjectById(id: number) {
        return this._appService.delete(this.endPoint + '/' + id);
    }
}
