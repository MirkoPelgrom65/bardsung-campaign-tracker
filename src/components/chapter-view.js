import { LitElement, html, css } from 'lit';
import '@material/mwc-checkbox/mwc-checkbox.js';
import '@material/mwc-slider/slider.js';
import '@material/mwc-button/mwc-button.js';
import '@material/mwc-textarea/mwc-textarea.js';
import { Chapter } from '../models/chapter-data';
import { router } from '../services/router';
import { ChapterEncounterView, ChapterPathwayView, ChapterGoalView, ChapterTokenView, ChapterReputationView, ChapterNotesView } from './chapter-view-elements/';
import { broadcastUpdate, getChapter, updateChapter} from '../services/tracker-service';

export class ChapterView extends LitElement {

    static get properties() {
        return {
            chapter: { type: Object },
        };
    }

    constructor() {
        super();
        this.chapterId = -1;
        this.chapter = new Chapter();
    }

    connectedCallback() {
        super.connectedCallback();

        // Retrieve the chapterId from the route
        this.chapterId = Number(router.location.getUrl().split('/').pop());
        // Retreieve the chapter from the Id
        getChapter(this.chapterId).then(inChapter => {
            this.chapter = inChapter;
            this.originalChapter = structuredClone(inChapter);
        });
    }

    render() {
  
        return html`
            <div class="card">
                <h1>${this.chapter.id} ${this.chapter.name}</h1>
                <div class="controls">
                    <chapter-encounter-view chapterId="${this.chapterId}"></chapter-encounter-view>
                    <chapter-pathway-view chapterId="${this.chapterId}"></chapter-pathway-view>
                    <chapter-goal-view chapterId="${this.chapterId}"></chapter-goal-view>
                    <chapter-token-view chapterId="${this.chapterId}"></chapter-token-view>
                    <chapter-reputation-view chapterId="${this.chapterId}"></chapter-reputation-view>
                    <chapter-notes-view chapterId="${this.chapterId}"></chapter-notes-view>
                </div>

                <div class="buttons">
                    <mwc-button @click=${this.navigateToChapterList}>Chapter list</mwc-button>
                    <mwc-button @click=${this.resetChapter}>Reset</mwc-button>
                </div>
            </div>
        `;
    }

    navigateToChapterList() {
        location.href = '/';
    }

    resetChapter() {
        this.chapter = structuredClone(this.originalChapter);
        updateChapter(this.chapter).then(() => {
            broadcastUpdate();
        });
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .card {
                position: relative;
                min-width: 200px;
                border: none;
                border-radius: 8px;
                background-color: #8d8d8d;
                color: white;
                margin: 4px;
                padding: 4px 4px 4px 4px;
            }

            .controls {
                padding: 4px 120px 4px 12px;
            }

            .buttons {
                margin:  22px 0px 22px 12px;
            }

            h1 {
                margin: 20px 4px 4px 4px;
            }

        `
    ];
}
customElements.define('chapter-view', ChapterView);
