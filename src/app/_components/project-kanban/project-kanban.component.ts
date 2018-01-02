import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Project} from '../../_models/project';
import {Column} from '../../_models/column';
import {CardService} from '../../_services/card.service';
import {ColumnService} from '../../_services/column.service';
import {DialogNewColumnComponent} from '../dialog-new-column/dialog-new-column.component';
import {DialogNewCardComponent} from '../dialog-new-card/dialog-new-card.component';
import {Card} from '../../_models/card';


@Component({
    selector: 'app-project-kanban',
    templateUrl: 'project-kanban.component.html',
    styleUrls: ['project-kanban.component.css']
})

export class ProjectKanbanComponent implements OnInit {
    @Input() project: Project;
    columns: Column[];
    mouseWheelDir = '';


    constructor(private _router: Router,
                private _columnService: ColumnService,
                private _cardService: CardService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this._columnService.getColumnsOfProject(this.project.id)
            .subscribe(
                data => {
                    this.columns = data;
                    this.project.columns = this.columns;
                    for (let i = 0; i < this.columns.length; i++) {
                        this._cardService.getCardsOfColumn(this.columns[i].id)
                            .subscribe(
                                cdata => this.columns[i].cards = cdata
                            );
                    }
                }
            );
    }

    createColumn() {
        const dialogRef = this.dialog.open(DialogNewColumnComponent, {
            data: {
                project: this.project
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.fetchData();
        });
    }

    createCard(cid: string) {
        const dialogRef = this.dialog.open(DialogNewCardComponent, {
            data: {
                columnId: cid
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.fetchData();
        });
    }

    moveCardDown(card: Card, cIndex: number) {
        if (card.displayOrder < this.columns[cIndex].cards.length - 1) {
            card.displayOrder += 1;
            this._cardService.updateCard(card).subscribe(
                data => this.fetchData(),
                error => console.log(error)
            );
        } else {
            console.log('ERR: Cannot go further (to ' + (card.displayOrder + 1) + ')');
        }
    }

    moveCardUp(card: Card, cIndex: number) {
        if (card.displayOrder > 0) {
            card.displayOrder -= 1;
            this._cardService.updateCard(card).subscribe(
                data => this.fetchData(),
                error => console.log(error)
            );
        } else {
            console.log('ERR: Cannot go further (to ' + (card.displayOrder - 1) + ')');
        }
    }

    moveCardNext(card: Card, cIndex: number) {
        if ((cIndex + 1) < this.columns.length) {
            card.columnId = this.columns[cIndex + 1].id;
            card.displayOrder = 0;
            this._cardService.updateCard(card).subscribe(
                data => this.fetchData(),
                error => console.log(error)
            );
        } else {
            console.log('Cant move to ' + (cIndex + 1));
        }
    }

    moveCardBack(card: Card, cIndex: number) {
        if (cIndex - 1 >= 0) {
            card.columnId = this.columns[cIndex - 1].id;
            card.displayOrder = 0;
            this._cardService.updateCard(card).subscribe(
                data => this.fetchData(),
                error => console.log(error)
            );
        } else {
            console.log('Cant move to ' + (cIndex - 1));
        }
    }

    moveColumnNext(column: Column, src: number) {
        if (src < this.columns.length - 1) {
            column.displayOrder = src + 1;
            this._columnService.updateColumn(column).subscribe(
                data => this.fetchData(),
                error => console.log(error)
            );
        } else {
            console.log('Cant move to ' + (src + 1));
        }
    }

    moveColumnBack(column: Column, src: number) {
        if (src > 0) {
            column.displayOrder = src - 1;
            this._columnService.updateColumn(column).subscribe(
                data => this.fetchData(),
                error => console.log(error)
            );
        } else {
            console.log('Cant move to ' + (src - 1));
        }
    }
}
