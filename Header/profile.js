

const ProfileTemplate =  document.createElement('template');


ProfileTemplate.innerHTML = /*html*/`
    <c-hexagon width="110px" height="110px" apply="true">
        <img slot="content" draggable="false" src="./images/svg-header/profile.jpeg">
    </c-hexagon>
    <user-rank> 
        <h2> 2 </h2>
    </user-rank>
`
export class Profile extends HTMLElement{  
    constructor(){
        super();
        this.appendChild(ProfileTemplate.content)
    }

}

