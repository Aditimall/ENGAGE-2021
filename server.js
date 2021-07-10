const express=require('express')
const app=express()
const server=require('http').Server(app)
const io=require('socket.io')(server)
const {v4: uuidV4 }=require('uuid')
var users={}

app.set('view engine','ejs')

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId: req.params.room})
})

io.on('connection',socket =>{

    socket.on('join-room', (roomId, userId,name) =>{
        console.log(roomId, userId)
        socket.join(roomId)
        users[userId]=name

        socket.broadcast.to(roomId).emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId)
        })

        socket.on('message',data=>{
            io.emit('new message',{
              user:users[userId],
              message:data
            });
        });
    })

})
const port=process.env.PORT||3000
server.listen(port)