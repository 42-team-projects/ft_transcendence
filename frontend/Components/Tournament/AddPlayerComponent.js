
const fakeData = [
    {
        profileImage: "../assets/images/profile/mudoria.jpg",
        username: "esalim",
        active: true
    },
    {
        profileImage: "../assets/images/profile/mudoria.jpg",
        username: "oussama",
        active: false
    },
    {
        profileImage: "../assets/images/profile/mudoria.jpg",
        username: "zeroual",
        active: false
    },
    {
        profileImage: "../assets/images/profile/mudoria.jpg",
        username: "nourdine",
        active: true
    }
]

export class AddPlayerComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
        `;
  }

  createItem(profileImage, userName, isActive) {
    const container = document.createElement("div");
    container.className = "friend-item";
    container.innerHTML = `
        <c-hexagon class="profile" width="78px" height="77px" apply="true" bcolor="aqua">
            <div slot="content" class="c-hexagon-content"></div>
        </c-hexagon>
        <div class="text-content">
            <h1>${userName}</h1>
            <h6>${isActive == true ? "online" : "offline"}</h6>
        </div>
        <img loading="lazy" class="sendRequest" src="../assets/images/profile/add-friends-icon.svg"/>
    `;
    container.querySelector(".c-hexagon-content").style.background = "url(" + profileImage + ") center / cover no-repeat";
    return container;
  }

  connectedCallback() {

    fakeData.forEach(data => {
        this.shadowRoot.appendChild(this.createItem(data.profileImage, data.username, data.active));
    });

    const sendRequest = this.shadowRoot.querySelectorAll(".sendRequest");
    sendRequest.forEach(elem => {
        elem.addEventListener("click", () => {
            // put here the logic of sending Request to the backend service.
            elem.src = "../assets/icons/success-circle.svg";
        });
    });
  }



}

const cssContent = /*css*/`

* {
    margin: 0;
    padding: 0;
}

:host {
    width: 86%;
    height: 100%;
    float: bottom;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: scroll;
}

.c-hexagon-content {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
}

.friend-item {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
}

.text-content {
    height: 100%;
    width: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;  
}

.text-content h1 {
    font-size: 28px;
    width: 250px;
}
.text-content h6 {
    font-family: 'Sansation';
    margin: 3px 0;
}

.friend-item img {
    width: 32px;
    height: 32px;
}

:host::-webkit-scrollbar {
    opacity: 0.7;
    background-color: transparent;
    width: 1px;
}

:host::-webkit-scrollbar-track {
    opacity: 0.7;
    border-radius: 100px;
}

:host::-webkit-scrollbar-thumb {
    opacity: 0.7;
    background-color: aqua;
    border-radius: 100px;
}

`;

customElements.define("add-player-component", AddPlayerComponent);