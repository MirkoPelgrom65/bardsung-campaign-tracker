export class Chapter {

    constructor(inId, inChapterName, inEncounters, inPathways, inGoals, inMaxTokens) {

        this.id = inId ? inId : -1;
        this.name = inChapterName ? inChapterName : 'undefined';

        this.encounters = inEncounters ? inEncounters : [];
        this.pathways = inPathways ? inPathways : [];
        this.goals = inGoals ? inGoals : [];

        this.maxTokens = inMaxTokens ? inMaxTokens : 10;
        this.activeHealingPotions = 3;
        this.activeFirewood = 3;
        this.activeToolkit = 3;
        this.activeCharms = 3;

        this.reputationScore = 4;

        this.notes = '';

        this.currentGold = 0; // Not sure this have to be here
    }


    setEncounterState(inIndex, inState) {
        this.encounters[inIndex].setState(inState);
    }
}