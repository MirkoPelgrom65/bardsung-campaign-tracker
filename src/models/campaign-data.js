export class Campaign {

    constructor(inChapters) {
        console.log('Campaign - constructor - inChapters: ', inChapters);

        this.chapters = inChapters ? inChapters : [];
        this.currentChapterId = -1;
       
    }
}