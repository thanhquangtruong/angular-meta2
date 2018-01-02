import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Project} from '../../_models/project';
import {ProjectService} from '../../_services/project.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-new-project',
    templateUrl: 'dialog-new-project.component.html',
    styleUrls: ['dialog-new-project.component.css']
})
export class DialogNewProjectComponent {
    newProject: Project;
    name: string;
    desc: string;
    isPublic: boolean;

    constructor(public dialogRef: MatDialogRef<DialogNewProjectComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private _projectService: ProjectService,
                private _router: Router) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    cancel() {
        this.dialogRef.close();
    }

    create() {
        this.newProject = new Project();
        this.newProject.name = this.name;
        this.newProject.description = this.desc;
        this.newProject.isPublic = this.isPublic;
        this._projectService.createProject(this.newProject).subscribe(
            data => {
                this.dialogRef.close();
                this.openProject(data.id);
            },
            err => {
                alert(err.error.message);
            }
        );
    }

    openProject(id: number) {
        this._router.navigate(['/project/' + id]);
    }
}
