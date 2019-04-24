const parser = new DOMParser()


class Router {
    constructor(routesFolder) {
        this.current = ''
        this.prev = ''
        this.interceptor = ''
        this.folder = routesFolder
        this.sm = new StateMachine()
        this.clears = new StateMachine()
        this.addRoute = this.addRoute.bind(this)
        this.goto = this.goto.bind(this)
    }
    addRoute(route, mkreadyFunc, clearFunc) {
        this.sm.addState(route, mkreadyFunc)
        this.clears.addState(route, clearFunc)
    }
    async goto(route, data) {
        if (this.prev !== '') {
            this.clears.bindState(this.prev)
        }
        this.prev = this.current
        this.current = route

        let r = await fetch(`../${this.folder}/${route}.html`)
        r = await r.text()
        if (data !== undefined)
            r = await TemplateEngine(r, data)
        r = parser.parseFromString(r, 'text/html')
        r = r.getElementsByTagName('section')[0]

        _id('router-outlet').innerHTML = r.innerHTML;
        this.sm.getFunction(route)(r)
    }

}

let router = new Router('components')
router.addRoute('about', r => {
    TM.from(_id('router-outlet'), .3, { opacity: 0 }).delay(0.3)
    let parals = document.querySelectorAll('.parallax')
    M.Parallax.init(parals)
    M.Carousel.init(document.querySelectorAll('.carousel'))

    let intOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    }
    this.interceptor = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.intersectionRatio > 0) {
                let elem = e.target
                TM.from(elem, 0.4, { opacity: 0 }).delay(0.3)
            }
        })
    }, intOptions)

    let intercepts = [..._class('xz'), ..._class('card')]
    intercepts.forEach(i => { this.interceptor.observe(i) })

}, () => {
    delete this.interceptor
    this.interceptor = null
})

router.addRoute('events', r => {
    TM.from(_id('router-outlet'), .6, { opacity: 0 }).delay(0.3)

    let intOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    }
    this.interceptor = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.intersectionRatio > 0) {
                let elem = e.target
                TM.from(elem, 0.5, { opacity: 0 }).delay(0.3)
            }
        })
    }, intOptions)

    let intercepts = [..._class('xz')]
    console.log(intercepts.length)
    intercepts.forEach(i => { this.interceptor.observe(i) })
}, () => {
    delete this.interceptor
    this.interceptor = null
})

router.addRoute('projects', r => {
    TM.from(_id('router-outlet'), .6, { opacity: 0 }).delay(0.3)
    let intOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.01
    }
    this.interceptor = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.intersectionRatio > 0) {
                let elem = e.target
                TM.from(elem, 0.8, { opacity: 0 }).delay(0.5)
            }
        })
    }, intOptions)

    let intercepts = [..._class('xz')]
    console.log(intercepts.length)
    intercepts.forEach(i => { this.interceptor.observe(i) })
}, () => {
    delete this.interceptor
    this.interceptor = null
})

router.addRoute('blogs', r => {
    TM.from(_id('router-outlet'), .6, { opacity: 0 }).delay(0.3)
}, () => {

})

router.addRoute('team', r => {
    TM.from(_id('router-outlet'), .6, { opacity: 0 }).delay(0.3)
}, () => {
})

router.addRoute('contact', r => {
    TM.from(_id('router-outlet'), .6, { opacity: 0 }).delay(0.3)
    _id('message_create').addEventListener('submit', contactMsgListener)
}, () => {
    _id('message_create').removeEventListener('submit', contactMsgListener)
})

let contactMsgListener = async e => {
    e.preventDefault()
    let name = _id('message_name').value,
        email = _id('message_email').value,
        phone = _id('message_phone').value,
        msg = _id('message_msg').value

    await addMsg(name, email, phone, msg)
    location.reload()
}
