const header_element = document.querySelector('header')


function Header()
{
    fetch('header-bar.html')
    .then((respons)=>{
        if(respons.ok)
            return respons.text()
        else
            console.log('error')
    }).then((text) => {
        console.log(text)
        header_element.innerHTML = text
    })
}

Header()