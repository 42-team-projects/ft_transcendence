const header_element = document.querySelector('header')
const sidebar_element = document.querySelector('.side-bar')

const sidebar_container = [
    {
        img : '<img draggable="false" src="./images/Home.svg" alt="Home" class="images">',
        content : 'HOME',
    },
    {
        img : '<img draggable="false" src="./images/Game.svg" alt="Game" class="images">',
        content : 'GAME',
    },
    {
        img : '<img draggable="false" src="./images/Chat.svg" alt="Chat" class="images">',
        content : 'CHAT',
    },
    {
        img : '<img draggable="false" src="./images/friends.svg" alt="Friends" class="images">',
        content : 'FRIENDS',
    },
    {
        img : '<img draggable="false" src="./images/leaderboard.svg" alt="Leaderboard" class="images">',
        content : 'LEADERBOARD',
    },
    {
        img : '<img draggable="false" src="./images/settings.svg" alt="Settings" class="images">',
        content : 'SETTINGS',
    },
    {
        img : '<img draggable="false" src="./images/settings.svg" alt="Settings" class="images">',
        content : 'SETTINGS',
    }
]

function Header()
{
    fetch('header-bar.html')
    .then((respons)=>{
        if(respons.ok)
            return respons.text()
        else
            console.log('error')
    }).then((text) => {
        header_element.innerHTML = text
    })
}


function sideBar()
{
    fetch('side-bar-component.html')
    .then((respons)=>{
        if(respons.ok)
        return respons.text()
    else
    console.log('error')
}).then((html) => {
    parser = new DOMParser()
    sidebar_container.forEach(element => {
        content = parser.parseFromString(html, 'text/html')
        imgDocument = parser.parseFromString(element.img, 'text/html')
        let img = imgDocument.body.firstChild;
        div = content.querySelector(".items")
        div.id = sidebar_container.indexOf(element)
        // div.querySelector('h1').innerHTML = element.content
        div.insertBefore(img, div.firstChild)
        sidebar_element.appendChild(div)
    })
    let elements = sidebar_element.querySelectorAll(".items");
    elements.forEach((element) =>{
        element.addEventListener('click', function(){
            elements.forEach((element_tmp) => {
                element_tmp.querySelector('.images').className = 'images'
                element_tmp.querySelector('.Click').className = 'Click'
                element_tmp.querySelector('h1').innerHTML = ``
            })
            element.querySelector('.images').classList.toggle('on')
            element.querySelector('.Click').classList.toggle('on')
            element.querySelector('h1').innerHTML = element.querySelector('img').alt;
        })
    })
    elements[0].querySelector('.images').classList.toggle('on')
    elements[0].querySelector('h1').innerHTML = elements[0].querySelector('img').alt;
    elements[0].querySelector('.Click').classList.toggle('on')
})
}



Header()
sideBar()

