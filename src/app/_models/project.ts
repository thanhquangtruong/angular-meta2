import {Column} from './column';

export class Project {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    columns: Column[];

    constructor() {
    }
}
