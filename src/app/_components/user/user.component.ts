import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../_models/user';
import {ProjectWithRole} from '../../_models/projectWithRole';
import {Team} from '../../_models/team';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {UserService} from '../../_services/user.service';
import {ProjectService} from '../../_services/project.service';
import {DialogNewProjectComponent} from '../dialog-new-project/dialog-new-project.component';


@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: [
        '../../app.component.css',
        './user.component.css'
    ]
})

export class UserComponent implements OnInit, AfterViewInit {

    displayedColumns = ['id', 'name', 'isPublic'];
    dataSource = new MatTableDataSource();
    isLoadingResults = false;

    @ViewChild(MatSort) sort: MatSort;

    private user: User;
    private projects: ProjectWithRole[];
    private teams: Team;

    constructor(private _router: Router,
                private _auth: AuthService,
                private _userService: UserService,
                private _projectService: ProjectService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        if (!this._auth.isAuthenticated()) {
            this._router.navigate(['/login']);
        } else {
            this._userService.getCurrentUser()
                .subscribe(
                    data => this.user = data,
                    error => console.log(error)
                );
            this._projectService.getProjectsOfCurrentUser()
                .subscribe(
                    data => {
                        this.projects = data;
                        this.dataSource.data = this.projects;
                    },
                    error => {
                        console.log(error);
                    }
                );
        }
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    openDialog() {
        this.dialog.open(DialogNewProjectComponent, {
            data: {
                animal: 'panda'
            }
        });
    }

    openProject(id: number) {
        this._router.navigate(['/project/', id]);
    }
}
