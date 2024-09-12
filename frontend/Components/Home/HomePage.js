export class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="homeContainer">
                <div class="stats"></div>
                <div class="banner">
                    <div class="league">
                        <div class="league-logo">
                            <img src="/assets/images/leagues/gold-league.svg" width="200px"></img>
                        </div>
                        <div class="league-description">
                            <h2> GOLD LEAGUE </h2>
                            <h6>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </h6>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-values">
                            <div class="value">
                                
                            </div>
                            <div class="value"></div>
                            <div class="value"></div>
                            <div class="value"></div>
                            <div class="value"></div>
                        </div>
                        <div class="horizontal-scroll-bar">
                            <div class="horizontal-scroll-bar-reach"></div>
                        </div>
                        <div class="league-infos"></div>
                    </div>
                    <div class="buttons-container"></div>
                </div>
                <div class="footer"></div>
            </div>
        `;
    }
    connectedCallback() {

    }
}

customElements.define("home-page", HomePage);

const cssContent = /*css*/`

* {
    margin: 0;
    padding: 0;
}

:host {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.homeContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.banner {
    flex: 4;
    width: 80%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgb(16,43,61);
    background: linear-gradient(90deg, rgba(16,43,61,0.7) 0%, rgba(23,72,105,0.3) 100%);
    
}

.banner .league {
    width: 100%;
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.league-logo {
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.league-description {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    max-width: 400px;
}

.progress-bar {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.progress-values {
    width: 75%;
    height: 10px;
    background: white;
    display: flex;
    gap: 10px;
}

.value {
    flex: 1;
    background: blue;
}

.horizontal-scroll-bar {

    background-color: #d9d9d920;
    width: 75%;
    height: 16px;
    border-radius: 200px;
}

.horizontal-scroll-bar-reach {
    background-color: "aqua";
    width: 75%;
    height: 100%;
    border-radius: 200px;
}

.buttons-container {
    width: 100%;
    height: 64px;
}

.footer {
    flex: 2;
    width: 80%;
}


`;