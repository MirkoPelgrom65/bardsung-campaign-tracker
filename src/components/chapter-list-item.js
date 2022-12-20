import { LitElement, html, css } from 'lit';
import { Chapter } from '../models/chapter-data';
import { getChapter } from '../services/tracker-service';

export class ChapterListItem extends LitElement {

    static get properties() {
        return {
            chapterId: { type: Number },
            chapter: {type: Object}
        };
    }

    constructor() {
        super();
        this.chapterId = -1;
        this.chapter = new Chapter();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);

        if (name === 'chapterId'.toLocaleLowerCase()) {
            getChapter(this.chapterId).then(inChapter => {
                this.chapter = inChapter;
            });
        }
    }

    render() {
        return html `<div><a href="/chapter/${this.chapter.id}">${this.chapter.name}</a></div>`;
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            div {
                width: 90%;
                height: 30px;
                border: none;
                border-radius: 8px;
                background-color: #673ab7;
                margin: 4px;
                padding: 0 12px 0 12px;
                text-align: center;
            }

            a {
                text-decoration: none;
                color: white;
            }
        `
    ];

}
customElements.define('chapter-list-item', ChapterListItem);
