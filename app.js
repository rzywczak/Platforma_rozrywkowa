// const { response } = require('express');
const express = require('express');
// const { userInfo } = require('os');
const path = require('path');
const app = express();
const port = 3000;
const server = app.listen(port);
const io = require('socket.io')(server);
require('./db/mongoose');
const Room = require('./db/models/user');

app.use(express.json({ limit: '1mb' }));

app.set('view engine', 'hbs');

app.get('/css/main.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/css/main.css'));
});
app.get('/public/client.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/client.js'));
});
app.get('/public/.env', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/client.js'));
});

app.get('/', (req, res) => {
    res.render('index.hbs');

});
app.get('/gra', (req, res) => {
    res.render('gra.hbs');
});

io.on('connection', socket => {
    console.log('new user connected : ', socket.id);
    socket.on('disconnect', socket => {
        console.log(' user disconnected');
    });
});
// Tworzenie nowego rooma 
app.post('/api', (req, res) => {
   
    const createroom = async function() {
        try {
            const data = {
                roomName: req.body.roomName,
                password: req.body.password,
                roomId: req.body.roomId
            }
            const room = new Room(data)
            await room.save()
            res.send('success');
            console.log(room)
        }
        catch(error){
            console.log(error)
        }
    }
    createroom();  

});

// app.get('/', (req, res) => {
//     res.render('index.hbs');

// });


// wyswietlenie roomow

// const showRooms = async () => {
//     try {
//         const rooms = await Room.find({})
//         console.log(rooms)
//     }
//     catch (error){
//         console.log(error)
//     }
// }
// showRooms();