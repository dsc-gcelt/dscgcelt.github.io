async function load(page) {
    await loadPage(page)
    await loadAnimation(page)
    currentPage = page
}

async function loadAnimation(page) {
    switch (page) {
        case 'home':
            loadHomeAnimation()
            break;
        case 'what':
            loadWhatAnimation()
            break;
        case 'how':
            loadHowAnimation()
            break;
        default:
            break;
    }
}


//------------animations----------------------------
async function headerLoadAnimation() {
    //header bar animation
    anime.timeline({
        easing: 'easeInExpo',
        duration: 750
    })
        .add({
            targets: 'header',
            translateX: [-60, 0],
            duration: 340
        })
        .add({
            targets: 'header nav a',
            opacity: [0, 1],
            scale: [0.6, 1.5, 1],
            duration: 500,
            delay: (el, i) => i * 80
        })
        .add({
            targets: 'header > .menu-btn > div',
            scale: [0, 1],
            rotate: ['40deg', 1],
            delay: (el, i) => -(200 + i * 120)
        })
}

async function loadHomeAnimation() {
    console.log('loading home animation...')
    //banner page animation
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
    })
        .add({
            targets: '.layout-home > .banner-home',
            opacity: [0, 1],
            translateX: [-80, 0],
            delay: 200,
            easing: 'easeOutExpo',
        })
        .add({
            targets: '.layout-home > .text',
            translateX: [80, 0],
            opacity: [0, 1],
            delay: -100
        })
        .add({
            targets: '.layout-home > .banner-home',
            delay: 200,
            easing: 'easeOutExpo',
        })

}

async function loadWhatAnimation() {
    console.log('loading what animation ...')
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
    })
        .add({
            targets: '#page',
            opacity: [0, 1],
            translateX: [-80, 0],
            delay: -200,
            easing: 'easeOutExpo',
        })
        .add({
            targets: '.layout-what > .from-google',
            opacity: [0, 1],
            translateX: [-90, 0],
            delay: -200,
            easing: 'easeOutExpo',
        })
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
        .add({
            targets: '.layout-what > .dsc-logo-official',
            opacity: [0, 1],
            scale: [0, 1.1, 1],
            easing: 'easeOutExpo',
        })
    if (innerWidth < 600) {
        let hasRevil = false
        setTimeout(() =>
            document.addEventListener('scroll', e => {
                if (scrollY >= 900) {
                    if (!hasRevil) {
                        anime.timeline({
                            easing: 'easeOutExpo',
                            duration: 750
                        })
                            .add({
                                targets: '.layout-what > .from-us',
                                opacity: [0, 1],
                                translateX: [20, 0],
                                delay: 200,
                                easing: 'easeOutExpo',
                            })
                        hasRevil = true
                    }
                }
            }), 1000)
    }
}


async function loadHowAnimation() {
    console.log('loading how animation ...')
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
    })
        .add({
            targets: '.layout-how > .gallary > .box:nth-child(odd)',
            opacity: [0, 0.8],
            translateY: innerWidth < 600 ? 0 : -40,
            translateX: innerWidth < 600 ? [-80,0] : 0,
            delay: (el, i) => i * 200,
            easing: 'easeOutExpo',
        })
        .add({
            targets: '.layout-how > h1',
            opacity: [0, 1],
            translateX: [80, 0],
            delay: -200,
            easing: 'easeOutExpo',
        })

    anime.timeline({
        easing: 'easeOutExpo',
        duration: 750
    })
        .add({
            targets: '.layout-how > .gallary > .box:nth-child(even)',
            opacity: [0, 0.8],
            translateY: [-40, 0],
            delay: (el, i) => i * 300,
            easing: 'easeOutExpo',
        })
}

async function menuToggleAnimation(open) {
    let timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 550
    })
    if (!open) { //animation for opening menu
        document.getElementById('mainMenu').classList.remove('hidden')
        timeline.add({
            targets: '#mainMenu',
            opacity: [0, 1],
            width: [30, 'calc(100vw - var(--header-width))'],
            easing: 'easeInExpo'
        }).add({
            targets: '.section-links > a',
            opacity: [0, 1],
            translateX: [-200, 0],
            delay: (el, i) => - i * 200 + 100
        })

        anime.timeline({
            easing: 'easeOutExpo',
            duration: 550
        }).add({
            targets: 'header > .menu-btn > div:nth-child(odd)',
            width: 0,
            delay: 300
        })

        setTimeout(() => {
            document.getElementsByTagName('main')[0].classList.add('blur-it')
        }, 460)
    }
    else {
        document.getElementsByTagName('main')[0].classList.remove('blur-it')
        timeline.add({
            targets: '#mainMenu',
            opacity: [1, 0],
            width: 30,
            easing: 'easeInExpo',
        }).add({
            targets: 'header > .menu-btn > div:nth-child(odd)',
            width: (el, i) => i == 0 ? 20 : 28,
            delay: -100
        })
        setTimeout(() => {
            document.getElementById('mainMenu').classList.add('hidden')
        }, 740)
    }

}