const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined)
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

const mic=document.getElementById('mic')

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    addVideoStream(myVideo, stream)
    socket.on('user-connected', userId => { 
        connectToNewUser(userId, stream)
    })
    
    myPeer.on('call',call=>{
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)

        })
    })
})

/* myPeer.on('call',call=>{
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream=>{
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)

        })
    })
}) */

socket.on('user-disconnected', userId => {
    if(peers[userId]){
        peers[userId].close()
    }
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId,stream)
    const video = document.createElement('video')
    console.log('called')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })
    peers[userId]= call
}
function addVideoStream(video, stream){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
    video.play()
    })
    videoGrid.append(video)
}

mic.addEventListener('click',()=>{
    if(a===true){
        a=false
        mic.src="mic_off.svg"
    }
    else{
        a=true
        mic.src="mic_on.svg"
    }
})