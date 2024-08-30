
import { router } from "../../root/Router.js";

const ProfileTemplate =  document.createElement('template');


ProfileTemplate.innerHTML = /*html*/`
    <style>
        a{
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
    <a href="Profile">
        <c-hexagon width="110px" height="110px" apply="true" >
            <img loading="lazy" slot="content" draggable="false" src="./images/svg-header/profile.jpeg" at="imgProfile">
        </c-hexagon>
        <user-rank> 
            <h2> 2 </h2>
        </user-rank>
    </a>
`
export class Profile extends HTMLElement{  
    constructor(){
        super();
        this.appendChild(ProfileTemplate.content.cloneNode(true))
        console.log("prooooofiel",this.querySelector('a').href)
        this.querySelector('a').addEventListener('click', (event)=>{
            console.log(this.querySelector('a').href)
            event.preventDefault()
            const url = new URL(this.querySelector('a').href)
            console.log(url.pathname)
            router.handleRoute(url.pathname)
        })
    }

}

