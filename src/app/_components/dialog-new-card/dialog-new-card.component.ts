import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Card} from '../../_models/card';
import {CardService} from '../../_services/card.service';

@Component({
    selector: 'app-new-card',
    templateUrl: './dialog-new-card.component.html',
    styleUrls: ['dialog-new-card.component.css']
})
export class DialogNewCardComponent {
    columnId: string;
    newCard: Card;
    name: string;
    content: string;
    // labels: Label;
    date: Date;
    hour: number;
    min: number;

    // display: number;

    constructor(public dialogRef: MatDialogRef<DialogNewCardComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _cardService: CardService) {
        console.log('DialogNewCardComponent: cid: ' + this.data);
        this.columnId = data.columnId;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    create() {
        this.newCard = new Card();
        this.newCard.name = this.name;
        this.newCard.content = this.content;
        this.newCard.dueTime = this.date;
        this.newCard.dueTime.setHours(this.hour);
        this.newCard.dueTime.setMinutes(this.min);
        this.newCard.columnId = this.columnId;
        this._cardService.createCard(this.newCard).subscribe(
            data => {
                this.dialogRef.close();
            },
            err => {
                alert(err.error.message);
            }
        );
    }
}
