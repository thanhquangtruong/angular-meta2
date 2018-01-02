import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AppService} from './app.service';
import {Card} from '../_models/card';

@Injectable()
export class CardService {

    endPoint = '/api/cards';

    constructor(private _appService: AppService) {
    }

    getCardsOfColumn(columnId: string): Observable<Card[]> {
        return this._appService.get('/api/columns/' + columnId + '/cards');
    }

    createCard(card: Card): Observable<Card> {
        return this._appService.post(this.endPoint, card);
    }

    getCardById(id: string): Observable<Card> {
        return this._appService.get(this.endPoint + '/' + id);
    }

    updateCard(card: Card): Observable<Card> {
        return this._appService.put(this.endPoint + '/' + card.id, card);
    }

    deleteCardById(id: string) {
        return this._appService.delete(this.endPoint + '/' + id);
    }
}
