const express = require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')
const requestIp = require('request-ip');
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require("mongoose")
// const socketIO = require('socket.io');
// const chat = require('./socket/chatSocket.js');
// const { Server } = require('socket.io');

const app=express()

// const server = require('http').createServer(app)
// const io = require('socket.io').Server()


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestIp.mw());
app.use(bodyParser.json());






mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://harbor_capital_club:W4oqJL5pmf5I7NIG@todo.vxypr2w.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connection Successfull!'))
  .catch((err)=>console.log(err));




const connectMongoDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb+srv://harbor_capital_club:W4oqJL5pmf5I7NIG@todo.vxypr2w.mongodb.net/?retryWrites=true&w=majority')
        console.log("Successfully Connected")
    }catch(error){
        console.log('Error in connecting DataBase ${error}.bgRed.white')
    }
}

connectMongoDB()





// const server = http.createServer(app);
// const io = socketIO(server);


// routers
const userRouter = require('./routes/userRoutes.js')
const loginRouter = require('./routes/loginRoutes.js');
const { url } = require('./config/dbConfig.js');








app.use('/apis/user',userRouter)
app.use('/apis/login',loginRouter)






app.use(express.static(__dirname + '/Images'))




// testing
app.get('/',(req,res)=>{
    res.json({ message:'Success'})
})


const PORT=process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})

// const server = require('http').createServer(app)
// server.listen(8001)
// console.log(server);

// const io = new Server(server, {
//     cors: {
//         cors: true,
//     }
// })


// const io = new Server()


// chat(io) 