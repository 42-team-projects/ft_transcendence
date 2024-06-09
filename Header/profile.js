

const ProfileTemplate =  document.createElement('template');


ProfileTemplate.innerHTML = `
    <c-hexagon width="140px" height="140px" Bcolor="#00FFFC">
        <img draggable="false" class="search-icon" src="./images/svg-header/profile.jpeg">
    </c-hexagon>
    <user-rank> 
        <h2> 2 </h2>
    </user-rank>
`
class Profile extends HTMLElement{  
    constructor(){
        super();
        this.appendChild(ProfileTemplate.content)
    }

}

customElements.define('c-profile', Profile)
