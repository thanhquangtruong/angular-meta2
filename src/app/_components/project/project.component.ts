import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {ProjectService} from '../../_services/project.service';
import {Project} from '../../_models/project';


@Component({
    selector: 'app-project',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.css']
})

export class ProjectComponent implements OnInit {

    id: number;
    private sub: any;
    project: Project;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _auth: AuthService,
                private _projectService: ProjectService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        if (!this._auth.isAuthenticated()) {
            this._router.navigate(['/login']);
        } else {
            this.sub = this._route.params.subscribe(params => {
                this.id = +params['id']; // (+) converts string 'id' to a number
                this._projectService.getProjectById(this.id)
                    .subscribe(
                        data => {
                            this.project = data;
                        },
                        error => {
                            console.log(error);
                        }
                    );
            });
        }
    }
}
