import { LitElement, html, css } from 'lit';
import { Chapter } from '../../models/chapter-data';
import { getChapter, updateValue, subscribeToChapter, HEALING_VALUE, CHARM_VALUE, TOOLKIT_VALUE, FIREWOOD_VALUE } from '../../services/tracker-service';

export class ChapterTokenView extends LitElement {

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
        ?   html `
            <chapter-header2-view title="Tokens"></chapter-header2-view>
            <span @change=${this._onHealingChange}>${this.renderSlider('Healing', this.chapter.activeHealingPotions, this.chapter.maxTokens)}</span>
            <span @change=${this._onCharmsChange}>${this.renderSlider('Charms', this.chapter.activeCharms, this.chapter.maxTokens)}</span>
            <span @change=${this._onToolkitChange}>${this.renderSlider('Toolkits', this.chapter.activeToolkit, this.chapter.maxTokens)}</span>
            <span @change=${this._onFireWoodChange}>${this.renderSlider('Firewood', this.chapter.activeFirewood, this.chapter.maxTokens)}</span>
        `
        : html ``;
    }

    renderSlider(inTitle, inValue, inMax) {
        return html`
            <div class="slider-title">${inTitle}: ${inValue} (${inMax})</div>
            <mwc-slider
                discrete
                withTickMarks
                step="1"
                max="${inMax}"
                value="${inValue}">
            </mwc-slider>
        `;
    }

    _onHealingChange(inEvent) {
        updateValue(HEALING_VALUE, this.chapter.id, inEvent.target.value);
        this.requestUpdate();
    }

    _onCharmsChange(inEvent) {
        updateValue(CHARM_VALUE, this.chapter.id, inEvent.target.value);
        this.requestUpdate();
    }

    _onToolkitChange(inEvent) {
        updateValue(TOOLKIT_VALUE, this.chapter.id, inEvent.target.value);
        this.requestUpdate();
    }

    _onFireWoodChange(inEvent) {
        updateValue(FIREWOOD_VALUE, this.chapter.id, inEvent.target.value);
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

            .slider-title {
                margin: 12px 42px -16px;
            }
        `
    ];


}
customElements.define('chapter-token-view', ChapterTokenView);
