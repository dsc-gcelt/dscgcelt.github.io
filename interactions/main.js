let hasLoaded = false
let firstInteraction = true;

let modal
let animationRecord1, animationRecord2, animationRecord3
let animationTarget1
let blogExpanded = false


let preloader = `<div class='full-center'><div class="preloader-wrapper big active">
<div class="spinner-layer spinner-blue">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div></div>`

let events_demi = [
    {
        title: 'event 1 of many',
        date: '10-10-10',
        venue: 'lab 6',
        imgs: ['assets/back1.jpg'],
        detail: 'lorem ipsum dolor alsi sdaf dfwfs csaasf ddeins inainf. askw sianfbi aseubs aisbe iasan aebsb uabdabu. ausbd uabdsba uabc nke  yacac.'
    },
    {
        title: 'event 2 of many',
        date: '10-10-10',
        venue: 'lab 6',
        imgs: [],
        detail: 'lorem ipsum dolor alsi sdaf dfwfs csaasf ddeins inainf. askw sianfbi aseubs aisbe iasan aebsb uabdabu. ausbd uabdsba uabc nke  yacac.'
    },
    {
        title: 'event 3 of many',
        date: '10-10-10',
        venue: 'lab 6',
        imgs: ['assets/back2.jpg', 'domain'],
        detail: 'lorem ipsum dolor alsi sdaf dfwfs csaasf ddeins inainf. askw sianfbi aseubs aisbe iasan aebsb uabdabu. ausbd uabdsba uabc nke  yacac.'
    },
    {
        title: 'event 4 of many',
        date: '10-10-10',
        venue: 'lab 6',
        imgs: ['assets/back1.jpg'],
        detail: 'lorem ipsum dolor alsi sdaf dfwfs csaasf ddeins inainf. askw sianfbi aseubs aisbe iasan aebsb uabdabu. ausbd uabdsba uabc nke  yacac.'
    },
    {
        title: 'event 5 of many',
        date: '10-10-10',
        venue: 'lab 6',
        imgs: [],
        detail: 'lorem ipsum  inainf. askw sianfbi aseubs aisbe iasan aebsb uabdabu. ausbd  nke  yacac.'
    },
    {
        title: 'event 6 of many',
        date: '10-10-10',
        venue: 'lab 6',
        imgs: ['assets/back2.jpg', 'domain'],
        detail: 'lorem ipsum dolor alsi dfsdf dfdsf di baiebv sdaf dfwfs csaasf ddeins inainf. askw sianfbi aseubs aisbe iasan aebsb uabdabu. ausbd uabdsba uabc nke  yacac.'
    },
    {
        title: 'event 7 of many',
        date: '10-10-10',
        venue: 'lab 6',
        imgs: ['assets/back1.jpg'],
        detail: 'lorem ipsum dolor alsi sdaf dfwfs csaasf ddeins inainf. askw sianfbi aseubs aisbe iasan aebsb uabdabu. ausbd uabdsba uabc nke  yacac.'
    }
]




document.addEventListener('DOMContentLoaded', () => {
    if (!hasLoaded) {
        launcherStates.bindState('load')
        hasLoaded = false
        sidenav = M.Sidenav.init(document.querySelectorAll('.sidenav'), {
            onCloseStart: function () { launcherStates.bindState('icon') },
            onOpenStart: function () { launcherStates.bindState('menu') }
        })[0];
        modal = M.Modal.init(document.querySelectorAll('.modal'))[0]
    }
    launcher.root.addEventListener('click', () => {

        if (firstInteraction)
            router.goto('about')
        firstInteraction = false;
        if (launcherStates.currentState === 'icon')
            launcherStates.bindState('menu')
        else
            launcherStates.bindState('icon')
    })


})

//navigation events
function navAbout() {
    _id('router-outlet').innerHTML = preloader
    sidenav.close()
    router.goto('about')
}
async function navEvent() {
    _id('router-outlet').innerHTML = preloader
    sidenav.close()
    let  events = await getEvents()
    router.goto('events', {events})
}
async function navProject() {
    _id('router-outlet').innerHTML = preloader
    sidenav.close()
    let r = await fetch_github()
    let projs = r.map(({ name, created_at, contents_url, contributors_url, description, language }) => {
        return { name, created_at, contents_url, contributors_url, description, language }
    })
    let data = { projects: projs }
    console.log(data)
    router.goto('projects', data)
}

async function navTeam() {
    _id('router-outlet').innerHTML = preloader
    sidenav.close()
    const members = await getTeam()
    console.log(members)
    router.goto('team', {members})
}

function navContact() {
    _id('router-outlet').innerHTML = preloader
    sidenav.close()
    router.goto('contact')
}

async function navBlog() {
    _id('router-outlet').innerHTML = preloader
    sidenav.close()
    let blogs = await getBlogs()
    let data = { blogs }
    console.log(data)
    router.goto('blogs', data)
}

function expandBlog(target) {
    if (!blogExpanded) {
        console.log('called')
        animationTarget1 = target
        target.classList.add('z-depth-4')
        //target.style.position = 'fixed'
        target.style.zIndex = 10
        target.style.overflowY = 'scroll'
        target.style.overflowX = 'hidden'
        _childClass(target, 'close-btn btn-floating white').style.visibility = 'visible'
        let cover = _childClass(target, 'cover z-depth-2')
        let content = _childClass(target, 'content')
        content.style.display = 'block'
        let rect = target.getBoundingClientRect()
        let bx = _class('galary')[0].getBoundingClientRect()
        bx = bx.right - bx.left
        console.log(rect.left, rect.x)
        let offX = 140 * (rect.left) / bx
        animationRecord1 = TM.to(target, .3, { x: -rect.left + offX, y: -rect.top + 80, width: '86vw', height: '80vh' })
        animationRecord2 = TM.to(cover, 0.4, { height: '200px', ease: Elastic.easeOut.config(1, 0.42) })
        TM.from(content, 0.5, { opacity: 0 }).delay(0.2)
        blogExpanded = true
    }
}
function revertBlog() {
    console.log('reversing')
    animationRecord1.reverse()
    animationRecord2.reverse()
    setTimeout(() => {
        blogExpanded = false
        animationTarget1.classList.remove('z-depth-4')
        animationTarget1.style.position = 'relative'
        animationTarget1.style.zIndex = 1
        animationTarget1.style.overflowY = 'visible'
        animationTarget1.style.overflowX = 'visible'
        _childClass(animationTarget1, 'close-btn btn-floating white').style.visibility = 'hidden'
        _childClass(animationTarget1, 'content').style.display = 'none'
    }, 200)
}


const git_template1 = `<h5>files</h5>
<ul class="collection">
    <%for(let i in this.files){%>
        <li class="collection-item" onclick="readGit('<%this.files[i].download_url%>', '<%this.files[i].path%>')">
            <%this.files[i].name%>
        </li>
    <%}%>
</ul>`
const git_template2 = `<div class="row">
<a onclick="gobackGit()" href="#"><i class="fas fa-arrow-left"></i></a>
<div class="divider"></div>
</div>
<div id="rawview"></div>`
const git_template3 = `<a onclick="gobackGit()" href="#"><i class="fas fa-arrow-left"></i></a>
<h5>files</h5>
<ul class="collection">
    <%for(let i in this.files){%>
        <li class="collection-item" onclick="readGit('<%this.files[i].download_url%>', '<%this.files[i].path%>')">
            <%this.files[i].name%>
        </li>
    <%}%>
</ul>`


let git_history = []
let git_history_pointer = 0;

async function openCodebase(contents_url) {
    git_history = []
    contents_url = contents_url.split('{')[0]
    modal.open()
    let res = await fetch_github_repo(contents_url)
    let files = res.map(({ download_url, name, url }) => {
        return { download_url, name, path: url }
    })
    let data = { files }
    let content = await TemplateEngine(git_template1, data)
    _id('mcont').innerHTML = content
    git_history.push(content)
    git_history_pointer = 0
}

async function readGit(download_url, path) {
        console.log('enter folder')
    if (download_url === '' || download_url === null) {
        let res = await fetch(path)
        res = await res.json()
        let files = res.map(({ download_url, name, url }) => {
            return { download_url, name, path: url }
        })
        let data = { files }
        let content = await TemplateEngine(git_template3, data)
        _id('mcont').innerHTML = content
        git_history.push(content)
        git_history_pointer++
    } else {
        let dat = await fetch(download_url)
        dat = await dat.text()
        //let text = await fetch_github_file(download_url)
        _id('mcont').innerHTML = git_template2
        _id('rawview').innerText = dat
    }
}
function gobackGit() {
    _id('mcont').innerHTML = git_history[git_history_pointer--]
}
