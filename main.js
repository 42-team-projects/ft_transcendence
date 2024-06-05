const header_element = document.querySelector('header')
const sidebar_element = document.querySelector('.side-bar')
const root = document.querySelector('.root')

const sidebar_container = [
    {
        img : '<img draggable="false" src="./images/Home.svg" alt="Home" class="images">',
        content : 'Home',
    },
    {
        img : '<img draggable="false" src="./images/Game.svg" alt="Game" class="images">',
        content : 'Game',
    },
    {
        img : '<img draggable="false" src="./images/Chat.svg" alt="Chat" class="images">',
        content : 'Chat',
    },
    {
        img : '<img draggable="false" src="./images/friends.svg" alt="Friends" class="images">',
        content : 'Friends',
    },
    {
        img : '<img draggable="false" src="./images/settings.svg" alt="Tournament" class="images">',
        content : 'Tournament',
    },
    {
        img : '<img draggable="false" src="./images/settings.svg" alt="Settings" class="images">',
        content : 'Settings',
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
        div1 = div.querySelector(".Content")
        div.querySelector('h1').innerHTML = element.content
        div.id = sidebar_container.indexOf(element)
        div1.insertBefore(img, div1.firstChild)
        sidebar_element.appendChild(div)
    })

    let elements = sidebar_element.querySelectorAll(".items");

    text = elements[0].querySelector('.text-tag')
    img = elements[0].querySelector('.images')
    trasparentItem = elements[0].querySelector('.trasparentItem')
    trasparentItem.classList.toggle('on')
    text.classList.toggle('on')
    img.classList.toggle('on')
    elements.forEach((element) =>{
        element.addEventListener('click', function() {
            elements.forEach((element_tmp) => {
                tmp_text = element_tmp.querySelector('.text-tag.on')
                if(tmp_text)
                    tmp_text.classList.toggle('on')
                tmp_img = element_tmp.querySelector('.images.on')
                if(tmp_img)
                    tmp_img.classList.toggle('on')
                tmp_trasparentItem = element_tmp.querySelector('.trasparentItem.on')
                if(tmp_trasparentItem)
                    tmp_trasparentItem.classList.toggle('on')
            })
            text = element.querySelector('.text-tag')
            text.classList.toggle('on')
            img = element.querySelector('.images')
            img.classList.toggle('on')
            trasparentItem = element.querySelector('.trasparentItem')
            trasparentItem.classList.toggle('on')
        })
    })
})
}


function gamePlay()
{
    fetch('Game-play.html')
    .then((respons)=>{
        if(respons.ok)
            return respons.text()
        else
            console.log('error')
    }).then((html) => {
        root.innerHTML = html
    })
}



Header()
sideBar()
gamePlay()
