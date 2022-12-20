import { LitElement, html, css } from 'lit';
import { Chapter } from '../../models/chapter-data';
import { getChapter, updateState, subscribeToChapter, GOAL_STATE } from '../../services/tracker-service';

export class ChapterGoalView extends LitElement {

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
        return html `
            <chapter-header2-view title="Goals"></chapter-header2-view>
            ${this.chapter.goals.map((inGoal, inIndex) => 
                html` <span @change=${this._onGoalChange}>${this.renderCheckbox(inGoal.name + ' (' + inGoal.reward + ')', inGoal.state, inIndex)}</span>`)}
        `
    }

    renderCheckbox(inTitle, inState, inId) {
        return html `
                <div class="checkbox-container">
                    <div class="checkbox-title">${inTitle}</div>
                    <mwc-checkbox ?checked=${inState} data-index="${inId}"></mwc-checkbox>
                </div>
            `;
    }

    _onGoalChange(inEvent) {
        updateState(GOAL_STATE, this.chapter.id, inEvent.target.dataset.index, inEvent.target.checked);
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
customElements.define('chapter-goal-view', ChapterGoalView);
