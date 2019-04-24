
//github
const client_id = 'Iv1.7ac9d0c7c7e6beb0'
const client_secret = '85262d1c9061f47205bffe7eee7607a235418c44'
const client_token = 'd80464bf1424110f751d3be8716f50c6e01ea3a2'

const fetch_github = async () => {
    let api_call = await fetch(`https://api.github.com/orgs/dscgcelt/repos?client_id=${client_id}&&client_secret=${client_secret}`,
        {
            headers: {
                'content-type': 'application/json',
                'Authorization': `token ${client_token}`
            }
        })
    let data = await api_call.json()
    return data
}

const fetch_github_repo = async (contents_url) => {
    let api_call = await fetch(`${contents_url}?client_id=${client_id}&&client_secret=${client_secret}`,
        {
            headers: {
                'content-type': 'application/json',
                'Authorization': `token ${client_token}`
            }
        })
    let data = await api_call.json()
    return data
}


//unable to use due to limited times of use
const fetch_github_members = async (contents_url) => {
    let api_call = await fetch(`https://api.github.com/orgs/dscgcelt/members?client_id=${client_id}&&client_secret=${client_secret}`,
        {
            headers: {
                'content-type': 'application/json',
                'Authorization': `token ${client_token}`
            }
        })
    let data = await api_call.json()
    let members = []
    for(let i in data) {
        api_call = await fetch(`https://api.github.com/users/${data[i].login}`)
        let res = await api_call.json()
        console.log(res)
        const {avatar_url, login, name, location, bio} = res
        members.push({avatar_url, login, name, location, bio})
    }
    return members
}

//firebase

const fire_config = {
    apiKey: "AIzaSyCg_Av3SYxD_pbsLCHBYlAgAJdfcFN3lNk",
    authDomain: "dsc-gcelt.firebaseapp.com",
    databaseURL: "https://dsc-gcelt.firebaseio.com",
    projectId: "dsc-gcelt",
    storageBucket: "dsc-gcelt.appspot.com",
    messagingSenderId: "958183751582"
}
firebase.initializeApp(fire_config)
let db = firebase.firestore()
let storage = firebase.storage().ref()

//blog
let Blogs = db.collection('blogs')
let Evs = db.collection('events')
let Team = db.collection('team')
let Msg = db.collection('message')

const storeImage = async (id) => {
    const file = _id(id).files[0]
    const name = (+new Date()) + '-' + file.name
    const metadata = {
        contentType: file.type
    };
    const task = await storage.child(name).put(file, metadata)
    const url = await task.ref.getDownloadURL()
    return url
}

const getBlogs = async () => {
    let blogs = []
    await Blogs.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                blogs.push({ id: doc.id, data: doc.data() })
            })
        })
    blogs = blogs.sort((a, b) => a.data.date.seconds < b.data.date.seconds)
    return blogs
}

const addBlog = async (title, content, image) => {
    let date = new Date()
    let r = await Blogs.add({ title, content, date, image })
    console.log(`${r.id} is added to blogs.`)
    alert('blog uploaded successfully')
}

const getEvents = async () => {
    let evs = []
    await Evs.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                evs.push({ id: doc.id, data: doc.data() })
            })
        })
    return evs
}
const addEvent = async (title,venue,imgs, details, date) => {
    let r = await Evs.add({ title,venue,imgs, details, date})
    console.log(`${r.id} is added to events.`)
    alert('events uploaded successfully')
}

//json data
const getTeam = async () => {
    let t = []
    await Team.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                t.push({ id: doc.id, data: doc.data() })
            })
        })
    return t
}
const addTeam = async (name, github, facebook, bio, rank, field, image) => {
    let r = await Team.add({ name, github, facebook, bio, rank, field, image})
    console.log(`${r.id} is added to team.`)
    alert('Member uploaded successfully')
}

const addMsg =async (name, email, phone, message) => {
    let r = await Msg.add({name, email, phone, message})
    console.log(`${r.id} is added to message.`)
    alert('Message Submitted Successfully')
}