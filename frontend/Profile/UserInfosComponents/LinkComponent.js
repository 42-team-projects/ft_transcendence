export class LinkComponent extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>${cssContent}</style>
        <div class="profile-data-infos-container-item-content" slot="content">
            <div class="content-links">
                <a href="${this.link}"><slot></slot></a>
                <img    src="assets/profile-assets/expand-icon.svg" width="16">
            </div>
        </div>
        `;
    }
    get link() { return this.getAttribute("link");}
    set link(value) { this.setAttribute("link", value);}

}

const cssContent = /*css*/`
.profile-data-infos-container-item-content {
    color: #d9d9d9;
    font-family: 'Sansation';
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-right: 100px;
}



.content-links {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
}

.content-links > a {
    color: #d9d9d9;
}

.content-links > img {
    width: 14px;
    height: 14px;
}

a {
    text-decoration: none;
}


`;