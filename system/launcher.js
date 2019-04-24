const launcher = {
    root: _id('launcher'),
    outer: _id('l-outer'),
    frame: _id('l-frame'),
    left: _id('l-left'),
    right: _id('l-right'),
    red: _id('l-red'),
    blue: _id('l-blue'),
    green: _id('l-green'),
    yellow: _id('l-yellow')
}
let launcherStates = new StateMachine()
let icon = {
    width: 30,
    height: 10
}
let loaded = false
let sidenav
launcherStates.addState('load', () => {
    




    loaded = true

    _id('l-outer').style.opacity = 1;
    _class('l-h1')[0].style.display = 'block'
    TM.from([launcher.red, launcher.blue, launcher.yellow, launcher.green], 0.6,
        { rotation: 0, ease: Elastic.easeOut.config(1, 0.42) }).delay(0.4)
    TM.from(launcher.root, 1, { opacity: 0 })
    TM.from(launcher.left, 0.4, { x: 100 })
    TM.from(launcher.right, 0.4, { x: -100 })
    TM.from(_class('l-h1'), 0.3, { opacity: 0, ease: Power2.easeOut, delay: 0.6 })

})
launcherStates.addState('icon', () => {
    sidenav.close()
    setTimeout(()=> {_tag('footer')[0].style.display = 'block';}, 1000)
    
    TM.to(launcher.root, 0.4, { width: '70px', height: '60px', ease: Elastic.easeOut.config(1, 0.42) })
    TM.to(launcher.frame, 0.6,
        { scale: 0.2, ease: Elastic.easeOut.config(1, 0.42) })
    _class('l-h1')[0].style.display = 'none'
    TM.to(launcher.right, 0.6,
        { rotation: 0,  marginLeft: 0,  ease: Elastic.easeOut.config(1, 0.42) }).delay(0.2)
    TM.to(launcher.left, 0.6,
        { rotation: 0,  ease: Elastic.easeOut.config(1, 0.42) }).delay(0.2)
})

launcherStates.addState('menu', () => {
    sidenav.open()
    TM.to(launcher.right, 0.6,
        { rotation: 180, marginLeft: '-50px', ease: Elastic.easeOut.config(1, 0.42) }).delay(0.2)
    TM.to(launcher.left, 0.6,
        { rotation: 180, ease: Elastic.easeOut.config(1, 0.42) }).delay(0.2)
})
