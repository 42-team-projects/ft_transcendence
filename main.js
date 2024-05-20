const header_element = document.querySelector('header')

header_object = [
    {
        tag : 'img',
        id : 'pingpong-logo',
        src : './images/pingpong-icon.svg'
    },
    // {
    //     type : '',
    //     id : 'pingpong-logo',
    //     src : './images/pingpong-icon.svg'
    // },
    // {
    //     type : 'img',
    //     id : 'pingpong-logo',
    //     src : './images/pingpong-icon.svg'
    // },
    // {
    //     type : 'img',
    //     id : 'pingpong-logo',
    //     src : './images/pingpong-icon.svg'
    // },
];

function Header()
{
    header_object.forEach(element => {
        let tag = document.createElement(`${element.tag}`);
        tag.src = element.src;
        tag.id = element.id;
        header_element.appendChild(tag);
    });
}


Header()