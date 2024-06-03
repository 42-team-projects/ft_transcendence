const header_element = document.querySelector('header')
const sidebar_element = document.querySelector('.side-bar')

const sidebar_container = [
    {
        img : '<img draggable="false" src="./images/Home.svg" alt="Home" class="images">',
        content : 'Home',
    }
    // {
    //     img : '<img draggable="false" src="./images/Game.svg" alt="Game" class="images">',
    //     content : 'Game',
    // },
    // {
    //     img : '<img draggable="false" src="./images/Chat.svg" alt="Chat" class="images">',
    //     content : 'Chat',
    // },
    // {
    //     img : '<img draggable="false" src="./images/friends.svg" alt="Friends" class="images">',
    //     content : 'Friends',
    // },
    // {
    //     img : '<img draggable="false" src="./images/settings.svg" alt="Tournament" class="images">',
    //     content : 'Tournament',
    // },
    // {
    //     img : '<img draggable="false" src="./images/settings.svg" alt="Settings" class="images">',
    //     content : 'Settings',
    // }
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
        // div.querySelector('h1').innerHTML = element.content
        div.id = sidebar_container.indexOf(element)
        div1.insertBefore(img, div1.firstChild)
        sidebar_element.appendChild(div)
    })
    let elements = sidebar_element.querySelectorAll(".items");

    // images = elements[0].querySelector('.images')
    h1 = elements[0].querySelector('h1')
    Click = elements[0].querySelector('.Click')
    Shadow = elements[0].querySelector('.Shadow')
    Content = elements[0].querySelector('.Content')

    images.classList.toggle('on')
    // h1.innerHTML = images.alt;
    Click.classList.toggle('on')
    Shadow.classList.toggle('on')
    Content.classList.toggle('on')

    elements.forEach((element) =>{
        element.addEventListener('click', function() {
            elements.forEach((element_tmp) => {
                images = element_tmp.querySelector('.images.on')
                h1 = element_tmp.querySelector('h1')
                Click = element_tmp.querySelector('.Click.on')
                Shadow = element_tmp.querySelector('.Shadow.on')
                Content = element_tmp.querySelector('.Content.on')
                // h1.innerHTML = images.alt.toLowerCase();

                if(images)
                    images.classList.toggle('on')
                if(Click)
                    Click.classList.toggle('on')
                if(Content)
                    Content.classList.toggle('on')
                if(Shadow)
                    Shadow.classList.toggle('on')
            })
            element.querySelector('.Shadow').classList.toggle('on')
            element.querySelector('.images').classList.toggle('on')
            element.querySelector('.Click').classList.toggle('on')
            element.querySelector('.Content').classList.toggle('on')
            // element.querySelector('h1').innerHTML = element.querySelector('img').alt;
        })
    })
})
}



Header()
sideBar()

