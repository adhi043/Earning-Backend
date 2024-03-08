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
mongoose.connect('mongodb://127.0.0.1/earningapi')
  .then(() => console.log('Connection Successfull!'))
  .catch((err)=>console.log(err));




const connectMongoDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1/earningapi')
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
const depositRouter = require('./routes/depositRoutes.js')
const referralEarningRouter = require('./routes/referralEarningRoutes.js')
const loginRouter = require('./routes/loginRoutes.js');
const { url } = require('./config/dbConfig.js');








app.use('/apis/user',userRouter)
app.use('/apis/deposit',depositRouter)
app.use('/apis/referralEarning',referralEarningRouter)
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