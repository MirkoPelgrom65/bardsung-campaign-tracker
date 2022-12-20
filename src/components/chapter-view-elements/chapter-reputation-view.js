import { LitElement, html, css } from 'lit';
import { Chapter } from '../../models/chapter-data';
import { getChapter, updateValue, subscribeToChapter, REPUTATION_VALUE } from '../../services/tracker-service';

export class ChapterReputationView extends LitElement {

    reputationLabels = [
        'fully corrupted', 'very corrupted', 'corupted', 'somewhat corrupted',
        'neutral', 'somewhat goodwill', 'goodwill', 'ultimate goodwill'
    ]

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
            <chapter-header2-view title="Reputation"></chapter-header2-view>
            <span @change=${this._onReputationChange}>${this.renderSlider(this.reputationLabels[this.chapter.reputationScore], this.chapter.reputationScore, 7)}</span>
        `;
    }

    renderSlider(inTitle, inValue, inMax) {
        return html`
            <div class="slider-title">${inTitle}</div>
            <mwc-slider
                discrete
                withTickMarks
                step="1"
                max="${inMax}"
                value="${inValue}">
            </mwc-slider>
        `;
    }

    _onReputationChange(inEvent) {
        updateValue(REPUTATION_VALUE, this.chapter.id, inEvent.target.value);
        this.requestUpdate();
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            h2 {
                margin: 18px -6px -3px;
            }

            .slider-title {
                margin: 12px 42px -16px;
            }
        `
    ];
}
customElements.define('chapter-reputation-view', ChapterReputationView);
