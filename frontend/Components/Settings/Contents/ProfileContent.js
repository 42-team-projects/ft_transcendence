import { createApiData, getApiData, updateApiData } from "../../../Utils/APIManager.js";
import { PROFILE_API_URL, UPDATE_USER_API_URL } from "../../../Utils/APIUrls.js";
import { HOST } from "../../../Utils/GlobalVariables.js";
import { getLeagueColor } from "../../../Utils/LeaguesData.js";
import { fetchWithToken } from "../../../root/fetchWithToken.js";
import { CustomInputField } from "../../CustomElements/CustomInputField.js";
import { CustomToggleSwitch } from "../../CustomElements/CustomToggleSwitch.js";
import { CustomUnorderedList } from "../../CustomElements/CustomUnorderedList.js";
import { CustomUnorderedListItem } from "../../CustomElements/CustomUnorderedListItem.js";
import { CustomSelect } from "../../CustomElements/CustomSelect.js";
import { CustomSpinner } from "../../CustomElements/CustomSpinner.js";


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
                <custom-input-field class="cover-field" label="COVER" description="Supported extenstions: JPEG JPG PNG SVG." type="file"></custom-input-field>
                <custom-select label="LANGUAGE" description="Select your favorite language."></custom-select>
                <custom-unordered-list label="LINKS" description="Max links you can add is 4."></custom-unordered-list>
            </div>
            <div class="actions">
                <settings-item class="save-button disable" color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
            <custom-spinner time="10" ></custom-spinner>
        `;
    }
    interval;
    async connectedCallback() {

        const playerData = await getApiData(PROFILE_API_URL);

        const profileImage = this.shadowRoot.querySelector(".c-hexagon-content");

        profileImage.src = HOST + playerData.user.avatar;            

        const hexagon = this.shadowRoot.querySelector(".c-hexagon-profile c-hexagon");
        hexagon.bcolor = getLeagueColor(playerData.stats.league);
        const input = this.shadowRoot.querySelector(".profile-image");
        let profileImageFile;
        input.addEventListener( 'change', (e) => {
            if (input.files && input.files.length > 0) {
                const file = input.files[0];
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

        const refreshBox = this.shadowRoot.querySelector("custom-spinner");

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
                console.log("apiResponse: ", apiResponse);
                profileImageFile = null;
            }
     
            if (list.length) {
                const linksData = {"links": list};
                linksList = list.length;
                await createApiData(PROFILE_API_URL + "links/", JSON.stringify(linksData));
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
                const res = await updateApiData(PROFILE_API_URL, formData);
                console.log("res: ", res);
            }
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

    .refresh-container {
        position: absolute;
        top: 0;
        width: 100%;
        height: 105%;
        background: #01253e80;
        z-index: 45;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        font-family: 'Sansation Bold';
        font-size: 20px;
    }
      

    #html-spinner{
        width: 64px;
        height: 64px;
        border:8px solid #fff;
        border-top:8px solid aqua;
        border-radius:50%;
      }
      
      #html-spinner {
        -webkit-transition-property: -webkit-transform;
        -webkit-transition-duration: 1.2s;
        -webkit-animation-name: rotate;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        
        -moz-transition-property: -moz-transform;
        -moz-animation-name: rotate; 
        -moz-animation-duration: 1.2s; 
        -moz-animation-iteration-count: infinite;
        -moz-animation-timing-function: linear;
        
        transition-property: transform;
        animation-name: rotate; 
        animation-duration: 1.2s; 
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      
      @-webkit-keyframes rotate {
          from {-webkit-transform: rotate(0deg);}
          to {-webkit-transform: rotate(360deg);}
      }
      
      @-moz-keyframes rotate {
          from {-moz-transform: rotate(0deg);}
          to {-moz-transform: rotate(360deg);}
      }
      
      @keyframes rotate {
          from {transform: rotate(0deg);}
          to {transform: rotate(360deg);}
      }
      

`;

customElements.define("profile-content", ProfileContent);