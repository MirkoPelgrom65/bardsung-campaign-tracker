import { Chapter } from "./chapter-data";
import { Encounter } from "./encounter-data";
import { Goal } from "./goal-data";
import { Pathway } from "./pathway-data";

import { Campaign } from "./campaign-data";
import { DataModel } from "./data-model";

export function defaultData() {
    const campaigns = new DataModel([new Campaign(
         [
            new Chapter(1, 'The Outer ruins', 
                [
                    new Encounter('1A', 'Standard crawl', false), 
                    new Encounter('1B', 'Standard crawl', false), 
                    new Encounter('1C', 'Standard crawl', false),
                    new Encounter('1D', 'Standard crawl', false),
                    new Encounter('1E', 'Fixed encounter', false),
                ], 
                [new Pathway('01', false)], 
                [
                    new Goal('Completed encounter 1', 1, '1XP', false), 
                    new Goal('Completed encounter 2', 1, '1XP', false),
                    new Goal('Completed encounter 3', 1, '1XP', false),
                    new Goal('Discovered lost treasure', 1, '1XP', false),
                    new Goal('Completed chapter', 1, '3XP', false),
                ],
                3), 
            new Chapter(2, 'Hobgoblin encampment', 
                [
                    new Encounter('2A', 'Standard crawl', false), 
                    new Encounter('2B', 'Standard crawl', false), 
                    new Encounter('2C', 'Standard crawl', false),
                    new Encounter('2D', 'Fixed encounter', false),
                ], 
                [],
                [
                    new Goal('Completed encounter 1', 1, '1XP', false), 
                    new Goal('Completed encounter 2', 1, '1XP', false),
                    new Goal('Completed encounter 3', 1, '1XP', false),
                    new Goal('Discovered lost treasure', 1, '1XP', false),
                    new Goal('Completed chapter', 1, '3XP', false),
                ],
                3),
            new Chapter(3, 'The Crypt', 
                [
                    new Encounter('3A', 'Hidden tunnen', false), 
                    new Encounter('3B', 'Standard crawl', false), 
                    new Encounter('3C', 'Standard crawl', false),
                    new Encounter('3D', 'Fixed encounter', false),
                    new Encounter('3E', 'Outlast encounter', false),
                    new Encounter('3F', 'Standard crawl', false),
                    new Encounter('3G', 'Standard crawl', false),
                ], 
                [],
                [
                    new Goal('Completed encounter 1', 1, '1XP', false), 
                    new Goal('Completed encounter 2', 1, '1XP', false),
                    new Goal('Completed encounter 3', 1, '1XP', false),
                    new Goal('Completed encounter 4', 1, '1XP', false),
                    new Goal('Completed chapter', 1, '1XP', false),
                ],
                3),
            new Chapter(4, 'The Halls of the dead', 
                [
                    new Encounter('3A', 'Hidden tunnen', false), 
                    new Encounter('3B', 'Outlast encounter', false), 
                    new Encounter('3C', 'Standard crawl', false),
                    new Encounter('3D', 'Standard crawl', false),
                    new Encounter('3E', 'Standard crawl', false),
                    new Encounter('3F', 'Standard crawl', false),
                    new Encounter('3G', 'Standard crawl', false),
                ], 
                [],
                [
                    new Goal('Completed encounter 1', 1, '1XP', false), 
                    new Goal('Completed encounter 2', 1, '1XP', false),
                    new Goal('Completed encounter 3', 1, '1XP', false),
                    new Goal('Completed encounter 4', 1, '1XP', false),
                    new Goal('Completed chapter', 1, '1XP', false),
                ],
                3),
         ]
     )], 0);

     console.log('campaigns: ', campaigns);
     return campaigns;
}