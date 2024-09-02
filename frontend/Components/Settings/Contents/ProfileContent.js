import { createApiData, getApiData, updateApiData } from "../../../Utils/APIManager.js";
import { PROFILE_API_URL } from "../../../Utils/APIUrls.js";
import { HOST } from "../../../Utils/GlobalVariables.js";
import { getLeagueColor } from "../../../Utils/LeaguesData.js";
import { fetchWithToken } from "../../../root/fetchWithToken.js";
import { CustomInputField } from "../CustomElements/CustomInputField.js";
import { CustomToggleSwitch } from "../CustomElements/CustomToggleSwitch.js";
import { CustomUnorderedList } from "../CustomElements/CustomUnorderedList.js";
import { CustomUnorderedListItem } from "../CustomElements/CustomUnorderedListItem.js";

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
                <custom-input-field class="full-name-field" label="FULL NAME" placeholder="esalim" type="text"></custom-input-field>
                <custom-input-field class="cover-field" label="COVER" description="Supported extenstions: JPEG JPG PNG SVG." type="file"></custom-input-field>
                <custom-unordered-list label="LINKS" description="Max links you can add is 4."></custom-unordered-list>
            </div>
            <div class="actions">
                <settings-item id="save-button" color="aqua" border-size="2px" width="64px" height="40px"><h4>SAVE</h4></settings-item>
            </div>
        `;
    }

    async connectedCallback() {

        const playerData = await getApiData(PROFILE_API_URL);

        const profileImage = this.shadowRoot.querySelector(".c-hexagon-content");

        profileImage.src = HOST + playerData.user.avatar;

        const hexagon = this.shadowRoot.querySelector(".c-hexagon-profile c-hexagon");
        hexagon.bcolor = getLeagueColor(playerData.stats.league);
        const input = this.shadowRoot.querySelector(".profile-image");
        input.addEventListener( 'change', (e) => {
            var fileName = '';
            if( input.files && input.files.length > 1 )
                fileName = ( input.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', input.files.length );
            else
                fileName = input.files[0].name;
            
            if (input.files && input.files.length > 0) {
                const file = input.files[0];
        
                // Assuming you want to set the background of an element with class 'profile-image'
                // var img = document.createElement('img');
                profileImage.src = URL.createObjectURL(file);
                // img.style.height = '100%';
                // img.style.display = 'block'; // Ensure the image is displayed in a block to put it on a new line
                // img.style.marginBottom = '10px';
                // profileImage.appendChild(img);
                // Optional: Clean up the object URL after the image has loaded
                // If you want to release the URL after use, you can do so
            }
        });

        const fullNameField = this.shadowRoot.querySelector(".full-name-field");
        fullNameField.value = playerData.fullName;

        const coverField = this.shadowRoot.querySelector(".cover-field");

        const links = this.shadowRoot.querySelector("custom-unordered-list");
        links.list = playerData.links;


        const saveButton = this.shadowRoot.querySelector("#save-button");

        saveButton.addEventListener("click", async () => {
            const list = links.list;
            const formData = new FormData();

            if (!fullNameField.value)
                return ;
            if (fullNameField.value != playerData.fullName)
                formData.append("fullName", fullNameField.value);
            if (coverField.file)
                formData.append("cover", coverField.file[0]);

            if (list.length) {
                const linksData = {"links": list};
                await createApiData(PROFILE_API_URL + "links/", JSON.stringify(linksData));
            }
            // if (formData.keys().length)
            await updateApiData(PROFILE_API_URL, formData);



            // you can now update the account infos by fetching API.

        });

    }

    disconnectedCallback() {

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
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

`;

customElements.define("profile-content", ProfileContent);