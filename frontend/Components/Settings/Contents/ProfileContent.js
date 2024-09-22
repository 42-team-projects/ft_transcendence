import { createApiData, getApiData, updateApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, UPDATE_USER_API_URL, HOST, updateCurrentPlayer, getCurrentPlayerId } from "/Utils/GlobalVariables.js";
import { getLeagueColor } from "/Utils/LeaguesData.js";
import { fetchWithToken } from "/root/fetchWithToken.js";
import { CustomInputField } from "/Components/CustomElements/CustomInputField.js";
import { CustomToggleSwitch } from "/Components/CustomElements/CustomToggleSwitch.js";
import { CustomUnorderedList } from "/Components/CustomElements/CustomUnorderedList.js";
import { CustomUnorderedListItem } from "/Components/CustomElements/CustomUnorderedListItem.js";
import { CustomSelect } from "/Components/CustomElements/CustomSelect.js";
import { CustomSpinner } from "/Components/CustomElements/CustomSpinner.js";
import { CustomToast } from "/Components/CustomElements/CustomToast.js";
import { displayToast } from "/Components/CustomElements/CustomToast.js";


// <custom-select label="LANGUAGE" description="Select your favorite language."></custom-select>


export class ProfileContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.innerHTML = `
            <style> ${cssContent} </style>
            <div class="container">
                <div class="c-hexagon-profile">
                    <c-hexagon width="200px" height="200px" apply="true">
                        <img slot="content" class="c-hexagon-content"></img>
                    </c-hexagon>
                    <input class="profile-image" type="file" accept="image/png, image/jpeg" readonly/>
                </div>
                <custom-input-field class="full-name-field" label="FULL NAME" type="text"></custom-input-field>
                <custom-input-field class="cover-field" label="COVER" description="Supported extenstions: JPEG JPG PNG SVG. and the size most be less than 2 MB." type="file"></custom-input-field>

                <custom-unordered-list label="LINKS" description="Max links you can add is 4."></custom-unordered-list>
            </div>
            <div class="actions">
                <settings-item class="save-button active disable" color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
            <custom-spinner time="10" ></custom-spinner>
        `;
    }
    interval;
    async connectedCallback() {
        const currentPlayerId = await getCurrentPlayerId();
        const refreshBox = this.shadowRoot.querySelector("custom-spinner");

        refreshBox.display();

        const playerData = await getApiData(PROFILE_API_URL + "me/");

        const profileImage = this.shadowRoot.querySelector(".c-hexagon-content");

        profileImage.src = HOST + playerData.user.avatar;            

        const hexagon = this.shadowRoot.querySelector(".c-hexagon-profile c-hexagon");
        hexagon.bcolor = getLeagueColor(playerData.stats.league);
        const input = this.shadowRoot.querySelector(".profile-image");
        let profileImageFile;
        input.addEventListener( 'change', (e) => {
            if (input.files && input.files.length > 0) {
                const file = input.files[0];
                if (file.size >= 2*1e6)
                {
                    console.log("the size of the image is too large!!");
                    profileImageFile = null;
                    return ;
                }
                profileImage.src = URL.createObjectURL(file);
                profileImageFile = file;
            }
        });

        const fullNameField = this.shadowRoot.querySelector(".full-name-field");
        fullNameField.value = playerData.fullName;
        const coverField = this.shadowRoot.querySelector(".cover-field");

        let playerCover;
        if (playerData.cover)
            playerCover = playerData.cover.split("/").pop();
        if(playerCover)
            coverField.file = playerCover;
        const links = this.shadowRoot.querySelector("custom-unordered-list");
        links.list = playerData.links;
        let linksList = links.list.length;


        const saveButton = this.shadowRoot.querySelector(".save-button");
        this.interval = setInterval(() => {
            if (fullNameField.value != playerData.fullName || (coverField.file && coverField.file[0].name != playerCover) || profileImageFile || (links.list.length != linksList))
                saveButton.classList.remove("disable");
            else
                saveButton.classList.add("disable");
        }, 700);

        saveButton.addEventListener("click", async () => {
            if (saveButton.classList.contains("disable"))
                return ;
            const list = links.list;
            const formData = new FormData();
            if (profileImageFile)
            {
                const avatarForm = new FormData();
                avatarForm.append("avatar", profileImageFile);
                const apiResponse = await updateApiData(UPDATE_USER_API_URL, avatarForm);
                profileImageFile = null;
            }
     
            if (list.length) {
                linksList = list.length;
                Array.from(list).forEach(async (item) => {
                    item.player = currentPlayerId;
                    const response = await createApiData(PROFILE_API_URL + "me/links/", JSON.stringify(item));
                    const res = await response.json();
                    if (!res.ok)
                        displayToast("error", "somethings wrong happen!!!");
                    else
                        displayToast("success", res.message);
                });
            }
            
            if ((fullNameField.value && fullNameField.value != playerData.fullName) || coverField.file)
            {
                if (fullNameField.value && fullNameField.value != playerData.fullName) {
                    formData.append("fullName", fullNameField.value);
                    playerData.fullName = fullNameField.value;
                }
                if (coverField.file)
                {
                    formData.append("cover", coverField.file[0]);
                    playerCover = coverField.file[0].name;
                }
                const res = await updateApiData(PROFILE_API_URL + "me/", formData);
                if (!res) {
                    displayToast("error", "somethings wrong happen!!!");
                    return ;
                }
                displayToast("success", res.message);
            }
            await updateCurrentPlayer();
            refreshBox.display();
            saveButton.classList.add("disable");


        });

    }


    disconnectedCallback() {
        clearInterval(this.interval);
    }
}

const cssContent = /*css*/`
    * {
        margin: 0;
        padding: 0;
    }
    :host {
        flex: 4;
        height: calc(100% - 50px);
        display: flex;
        gap: 50px;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .container {
        width: 99%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
    }

    .actions {
        display: flex;
        flex-wrap: wrap-reverse;
        gap: 20px;
        width: 90%;
        align-items: center;
        justify-content: space-around;
    }

    h3 {
        color: white;
    }

    .c-hexagon-profile {
        width: 200px;
        height: 200px;
        position: relative;
    }


    .profile-image {
        position: absolute;
        top: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 100%;
        background: green;
        width: 100%;
        background: #d9d9d950;
        border: none;
        outline: none;
        color: white;
        border-radius: 5px;
        padding: 0px 10px;
        font-size: 16px;
        z-index: 1;
        opacity: 0;
        overflow: hidden;
    }


    .c-hexagon-content {
        height: 100%;
    }

    .disable {
        opacity: 0.5;
        pointer-events: none;
    }
      
    .active {
        border: 2px solid aqua;
        color: aqua;
        
    }
`;

customElements.define("profile-content", ProfileContent);