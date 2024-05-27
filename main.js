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
    fetch('side-bar.html')
    .then((respons)=>{
        if(respons.ok)
        return respons.text()
    else
    console.log('error')
}).then((html) => {
    sidebar_element.innerHTML = html;
    const component = sidebar_element.querySelector('.items')
    sidebar_element.innerHTML = ``
    sidebar_container.forEach((element) =>{
        let item = component;
        console.log(item);
        item.q
    })
})
}

sidebar_element.addEventListener('click', ()=>{
    console.log('hiiii')
})


Header()
sideBar()
