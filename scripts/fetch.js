var CurrentDOMContent;
const parser  = new DOMParser();

function _id(id) {
    return document.getElementById(id)
}

async function loadPage(page) {
    let baseRef = `${window.location.protocol}//${window.location.host}`
    let pageAdd = `${baseRef}/pages/${page}.html`
    let res = await fetch(pageAdd)
    res = await res.text()
    let content = parser.parseFromString(res, 'text/html')
    CurrentDOMContent = content.documentElement.querySelector('#page')
    main.innerHTML = ''
    main.appendChild(CurrentDOMContent)
}