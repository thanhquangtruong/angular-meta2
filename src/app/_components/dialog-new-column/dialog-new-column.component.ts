import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Column} from '../../_models/column';
import {ColumnService} from '../../_services/column.service';

@Component({
    selector: 'app-new-column',
    templateUrl: './dislog-new-column.component.html',
    styleUrls: ['dialog-new-column.component.css']
})
export class DialogNewColumnComponent {
    projectId: string;
    index: number;
    newColumn: Column;
    name: string;
    desc: string;
    limit: number;

    constructor(public dialogRef: MatDialogRef<DialogNewColumnComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _columnService: ColumnService) {
        this.projectId = data.project.id;
        this.index = data.project.columns.length;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    create() {
        this.newColumn = new Column();
        this.newColumn.name = this.name;
        this.newColumn.description = this.desc;
        this.newColumn.displayOrder = this.index;
        this.newColumn.cardLimit = this.index;
        this.newColumn.projectId = this.projectId;
        this._columnService.createColumn(this.newColumn).subscribe(
            data => {
                this.dialogRef.close();
            },
            err => {
                alert(err.error.message);
            }
        );
    }
}
