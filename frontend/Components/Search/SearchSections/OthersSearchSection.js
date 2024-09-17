import { router } from "/root/Router.js";



export class OthersSearchSection extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div class="search-sections">
                <h2 class="result-section-title">OTHERS</h2>
                <div class="result-section-content"></div>
            </div>
        `;


    }

    connectedCallback() {
        const links = this.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (event)=>{
                console.log(link.href)
                event.preventDefault()
                const url = new URL(link.href)
                console.log(url.pathname)
                router.handleRoute(url.pathname)
            })
        });
    }


    appendItem(data) {
        const resultSectionContent = this.querySelector(".result-section-content");
        Array.from(data).forEach(elem => {
            const item = this.createItem(elem);
            resultSectionContent.appendChild(item);
        });

        const links = this.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (event)=>{
                console.log(link.href)
                event.preventDefault()
                const url = new URL(link.href)
                console.log(url.pathname)
                router.handleRoute(url.pathname)
            })
        });
    }

    clearItems() {
        this.querySelector(".result-section-content").innerHTML = '';
    }

    createItem(data) {
        const element = document.createElement("div");
        element.className="item";
        element.innerHTML = `
            <div class="item">
                <div class="profile-item">
                    <p>${data}</p>
                </div>
                <div class="search-actions">
                    <a href="/${data}">
                        <img src="/assets/icons/arrow-forward-icon.svg" class="read-message" width="32px" height="32px"></img>
                    </a>
                </div>
            </div> 
        `;
        return element;
    }
}

customElements.define("others-search-section", OthersSearchSection);