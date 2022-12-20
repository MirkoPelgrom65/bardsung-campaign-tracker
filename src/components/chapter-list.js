import { LitElement, html, css } from 'lit';
import {getChapterList} from '../services/tracker-service.js'
import { ChapterListItem } from './chapter-list-item.js';

export class ChapterList extends LitElement {

    static get properties() {
        return {
            chapterList: { type: Array },
        };
    }

    constructor() {
        super();
        this.chapterList = [];
    }

    connectedCallback() {
        super.connectedCallback();

        getChapterList().then(inChapters => {
            this.chapterList = inChapters;
        });
        
    }

    render() {
        return html`
            <h1>Chapters</h1>
            ${this.chapterList.map((inChapter) => 
                html`<chapter-list-item chapterId="${inChapter.id}"></chapter-list-item>`)}
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];
}
customElements.define('chapter-list', ChapterList);
