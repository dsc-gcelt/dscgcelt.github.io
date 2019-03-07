//------------set up---------------------------------
var currentPage = 'home'

var main = document.getElementsByTagName('main')[0];

const menuBtn = document.getElementById('menuBtn')
const mainMenu = document.getElementById('mainMenu')
//-------------Scroll animation-----------------------

//-----------------states-----------------------------
var IS_MENU_OPEN = false

// ----------------events ----------------------------
document.addEventListener('DOMContentLoaded', async e => {
    await loadPage(currentPage)
    headerLoadAnimation()
    loadAnimation(currentPage)
})
menuBtn.addEventListener('click', async e => {
    await menuToggleAnimation(IS_MENU_OPEN)
    IS_MENU_OPEN = !IS_MENU_OPEN
})
_id('link-home').addEventListener('click', async e => {
    await load('home')
    await menuToggleAnimation(IS_MENU_OPEN)
    IS_MENU_OPEN = !IS_MENU_OPEN
})
_id('link-what').addEventListener('click', async e => {
    await load('what')
    await menuToggleAnimation(IS_MENU_OPEN)
    IS_MENU_OPEN = !IS_MENU_OPEN
})
_id('link-how').addEventListener('click', async e => {
    await load('how')
    await menuToggleAnimation(IS_MENU_OPEN)
    IS_MENU_OPEN = !IS_MENU_OPEN
})