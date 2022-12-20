import { LitElement, html, css } from 'lit';
import { Chapter } from '../../models/chapter-data';
import { getChapter, updateState, subscribeToChapter, ENCOUNTER_STATE } from '../../services/tracker-service';


export class ChapterEncounterView extends LitElement {

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
        return this.chapter.id >= 0 
        ?  html `
            <chapter-header2-view title="Encounters"></chapter-header2-view>
            ${this.chapter.encounters.map((inEncounter, inIndex) => 
                html` <span @change=${this._onEncounterChange}>${this.renderCheckbox(inEncounter, inIndex)}</span>`)}`
        :  html ``;
    }

    renderCheckbox(inEncounter, inId) {
        return html `
                <div class="checkbox-container">
                    <div class="checkbox-title">${inEncounter.name + ' - ' + inEncounter.type}</div>
                    <mwc-checkbox ?checked=${inEncounter.state} data-index="${inId}"></mwc-checkbox>
                </div>
            `;
    }


    _onEncounterChange(inEvent) {
        updateState(ENCOUNTER_STATE, this.chapter.id, inEvent.target.dataset.index, inEvent.target.checked);
        this.requestUpdate();
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .checkbox-container {
                display: flex;
            }

            .checkbox-title {
                width: 250px;
                top: 12px;
                position: relative;
            }

            h2 {
                margin: 18px -6px -3px;
            }
        `
    ];

}
customElements.define('chapter-encounter-view', ChapterEncounterView);
