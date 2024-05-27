const header_element = document.querySelector('header')
const sidebar_element = document.querySelector('.side-bar')

const sidebar_container = [
    {
        img : '<img draggable="false" src="./images/Home.svg" alt="Home">',
        content : 'HOME' 
    },
    {
        img : '<img draggable="false" src="./images/Game.svg" alt="Game">',
        content : 'GAME' 
    },
    {
        img : '<img draggable="false" src="./images/Chat.svg" alt="Chat">',
        content : 'CHAT' 
    },
    {
        img : '<img draggable="false" src="./images/friends.svg" alt="Friends">',
        content : 'FRIENDS' 
    },
    {
        img : '<img draggable="false" src="./images/leaderboard.svg" alt="Leaderboard">',
        content : 'LEADERBOARD' 
    },
    {
        img : '<img draggable="false" src="./images/settings.svg" alt="Settings"></img>',
        content : 'SETTINGS' 
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
        div.querySelector('h1').innerHTML = element.content
        div.insertBefore(img, div.firstChild)
        sidebar_element.appendChild(div)
    })
})
}

// sidebar_element.addEventListener('click', ()=>{
//     console.log('hiiii')
// })


Header()
sideBar()
