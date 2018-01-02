import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppMaterialModule} from './app.material.module';
import {RouterModule, Routes} from '@angular/router';
import {AppService} from './_services/app.service';
import {AuthService} from './_services/auth.service';
import {ProjectService} from './_services/project.service';
import {UserService} from './_services/user.service';
import {HomeComponent} from './_components/home/home.component';
import {LoginComponent} from './_components/login/login.component';
import {RegisterComponent} from './_components/register/register.component';
import {UserComponent} from './_components/user/user.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DialogNewProjectComponent} from './_components/dialog-new-project/dialog-new-project.component';
import {ProjectComponent} from './_components/project/project.component';
import {ProjectKanbanComponent} from './_components/project-kanban/project-kanban.component';
import {KanbanItemComponent} from './_components/kanban-item/kanban-item.component';
import {CardService} from './_services/card.service';
import {ColumnService} from './_services/column.service';
import {DialogNewColumnComponent} from './_components/dialog-new-column/dialog-new-column.component';
import {DialogNewCardComponent} from './_components/dialog-new-card/dialog-new-card.component';
import {DialogCardDetailComponent} from './_components/dialog-card-detail/dialog-card-detail.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user', component: UserComponent},
    {path: 'project/:id', component: ProjectComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        DialogNewProjectComponent,
        ProjectComponent,
        ProjectKanbanComponent,
        KanbanItemComponent,
        DialogNewColumnComponent,
        DialogNewCardComponent,
        DialogCardDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AppService,
        AuthService,
        ProjectService,
        UserService,
        ColumnService,
        CardService
    ],
    entryComponents: [
        DialogNewProjectComponent,
        DialogNewColumnComponent,
        DialogNewCardComponent,
        DialogCardDetailComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
