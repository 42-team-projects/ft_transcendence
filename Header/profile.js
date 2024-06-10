

const ProfileTemplate =  document.createElement('template');


ProfileTemplate.innerHTML = /*html*/`
    <c-hexagon width="120px" height="120px" Bcolor="#00FFFC" apply="true">
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

