import { LitElement, html, css } from 'lit';
import { Chapter } from '../../models/chapter-data';
import { getChapter, subscribeToChapter, NOTES_VALUE, updateValue } from '../../services/tracker-service';
import { ChapterHeader2View } from './chapter-header2-view';

export class ChapterNotesView extends LitElement {
    static get properties() {
        return {
            chapter: { type: Object },
            chapterId: { type: Number },
        };
    }

    constructor() {
        super();
        this.chapterId = -1;
        this.chapter = new Chapter();

        subscribeToChapter({
            next: () => {

                getChapter(this.chapterId).then(inChapter => {
                    this.chapter = inChapter;
                });
            }
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        
        getChapter(this.chapterId).then(inChapter => {
            this.chapter = inChapter;
        });
    }

    render() {
        return html`
            <chapter-header2-view title="Notes"></chapter-header2-view>
            <mwc-textarea @change=${this._onNotesChange} value="${this.chapter.notes}"></mwc-textarea>
        `;
    }

    _onNotesChange(inEvent) {
        updateValue(NOTES_VALUE, this.chapter.id, inEvent.target.value);
        this.requestUpdate();
    }


    static styles = [
        css`
            :host {
                display: block;
            }

            mwc-textarea {
                width: 100%;
            }

            .author { 
                position: relative; 
                z-index: 1; 
            }


            .author:before { 
                border-top: 1px solid #ffffff; 
                content: ""; 
                position: absolute; 
                top: 25px; 
                left: 0; 
                width: 100%; 
                z-index: -1; 
            }
        `
    ];


}
customElements.define('chapter-notes-view', ChapterNotesView);
