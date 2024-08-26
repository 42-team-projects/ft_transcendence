

export class HeaderBar extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : 'open'})
    }
    render(){
        this.shadowRoot.appendChild(HeaderTemplate.content.cloneNode(true));
    }
    remove(){
        this.shadowRoot.innerHTML = '';
    }
}


const HeaderTemplate =  document.createElement('template');

const cssContent = /*css*/`

    .header-bar{
        justify-content: space-between;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
    #pingpong-logo
    {
        height: 80px;
        width: 80px;
        margin-left: 4%;
    }

    #pingpong-logo > img
    {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .notification-search
    {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
        flex: 1;
        max-width: 40%;
        min-width: 460px;
    }

    search-bar
    {
        border: 1px solid #00FFFC;
        border-radius: 10px;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 3.5rem;
        margin: 10px;
    }

    .search-icon{
        width: 8%;
        height: 60%;
        margin-left: 20px;
        margin-right: 10px;
    }

    .vertical-line {
        background-color: #00FFFC;
        width: 2px;
        height: 60%;
        margin-left: 20px;
    }


    .search-input{
        flex: 1;
        height: 100%;
        border-radius: 10px;
        border: none;
        width: 100%;
        background-color: transparent;
        font-family: 'Sansation';
        font-size: 25px;
        color: #ffffff;
        margin-left: 10px;
        padding-left: 10px;
        outline: none;
    }

    .search-input::placeholder{
        color: #ffffff;
        font-family: 'Sansation';
        opacity: 0.7;
        font-size: 24px;
    }

    .notification-icon
    {
        display: flex;
        height: 5%;
        width: 5%;
        justify-content: center;
        align-items: center;
    }

    c-profile{
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        grid-area: profile;
        margin-right: 1%;
        cursor: pointer;
    }

    img {
        max-width: 100%;
    }
    /* user-rank
    {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: polygon(10% 0%, 50% 0% ,90% 0%, 90% 60%, 50% 90%,10% 60%);
    } */

`

HeaderTemplate.innerHTML = /*html*/`
    <div class="header-bar">
        <link rel="stylesheet" href="../Utils/utils.css">
        <style>
            ${cssContent}
        </style>
        <div id="pingpong-logo">
            <img loading="lazy" draggable="false" src="./images/svg-header/pingpong-icon.svg" alt="pingpong">
        </div>
        <div class="notification-search">
            <search-bar></search-bar>
            <div class="notification-icon" >
                <img loading="lazy" draggable="false" src="./images/svg-header/alarm.svg" alt="notification">
            </div>
        </div>
        <c-profile></c-profile>
    </div>
`