import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AppService} from './app.service';
import {Column} from '../_models/column';

@Injectable()
export class ColumnService {

    endPoint = '/api/columns';

    constructor(private _appService: AppService) {
    }

    getColumnsOfProject(projectId: string): Observable<Column[]> {
        return this._appService.get('/api/projects/' + projectId + '/columns');
    }

    createColumn(column: Column) {
        return this._appService.post(this.endPoint, column);
    }

    getColumnById(id: string) {
        return this._appService.get(this.endPoint + '/' + id);
    }

    updateColumn(column: Column) {
        return this._appService.put(this.endPoint + '/' + column.id, column);
    }

    deleteColumnById(id: string) {
        return this._appService.delete(this.endPoint + '/' + id);
    }
}
