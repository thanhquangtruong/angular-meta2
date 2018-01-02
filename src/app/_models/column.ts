import {Card} from './card';

export class Column {
    id: string;
    name: string;
    description: string;
    displayOrder: number;
    cardLimit: number;

    projectId: string;
    cards: Card[];

    constructor() {
    }
}
