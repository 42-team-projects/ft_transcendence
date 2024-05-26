const header_element = document.querySelector('header')
const sidebar_element = document.querySelector('.side-bar')


function Header()
{
    fetch('header-bar.html')
    .then((respons)=>{
        if(respons.ok)
            return respons.text()
        else
            console.log('error')
    }).then((text) => {
        // console.log(text)
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
}).then((text) => {
    // console.log(text)
    sidebar_element.innerHTML = text
})
}

sidebar_element.addEventListener('click', ()=>{
    console.log('hiiii')
})


Header()
sideBar()
