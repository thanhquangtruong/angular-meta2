import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Card} from '../../_models/card';
import {CardService} from '../../_services/card.service';

@Component({
    selector: 'app-card-detail',
    templateUrl: './dialog-card-detail.component.html',
    styleUrls: ['dialog-card-detail.component.css']
})
export class DialogCardDetailComponent {
    originalCard: Card;
    card: Card;
    editMode = false;

    date: Date;
    hour: number;
    min: number;

    constructor(public dialogRef: MatDialogRef<DialogCardDetailComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _cardService: CardService) {
        this.originalCard = data.card;
        this.card = this.originalCard;


        this.date = this.toDate(this.card.dueTime.toString());

        if (this.date == null) {
            this.hour = null;
            this.min = null;
        } else {
            this.hour = this.date.getHours();
            this.min = this.date.getMinutes();
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    edit() {
        this.editMode = true;
    }

    discard() {
        this.editMode = false;
        this.card = this.originalCard;
        this.date = this.card.dueTime;
        this.hour = this.card.dueTime.getHours();
        this.min = this.card.dueTime.getMinutes();
    }

    save() {
        this.card.dueTime = this.date;
        this.card.dueTime.setHours(this.hour);
        this.card.dueTime.setMinutes(this.min);
        this._cardService.updateCard(this.card).subscribe(
            data => {
                this.dialogRef.close();
            },
            err => {
                alert(err.error.message);
            }
        );
    }

    toDate(str: string): Date {
        const p = str.split('T');
        const d = p[0].split('-');
        const t = p[1].split(':');
        const date = new Date();
        date.setFullYear(+d[0], +d[1], +d[2]);
        date.setHours(+t[0] + 7);
        date.setMinutes(+t[1]);
        date.setSeconds(0);
        return date;
    }
}
