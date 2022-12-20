import { LitElement, html, css } from 'lit';

export class ChapterHeader2View extends LitElement {

    static get properties() {
        return {
            title: { type: String },
        };
    }

    render() {
        return html`
            <h2 class="title">${this.title}</h2>
        `;
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .title { 
                position: relative; 
                z-index: 1; 
            }


            .title:before { 
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
customElements.define('chapter-header2-view', ChapterHeader2View);
