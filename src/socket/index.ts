//@ts-nocheck
import socketIO from 'socket.io';
import _ from 'lodash';
import {app} from './../server'
export default (server) => {
    // const io = socketIO(server, { pingInterval: 20000 })
    const io = socketIO(server)
    let interval;

    const poolMap = new Map();

    io.on("connection", (socket) => {
        console.log("New client connected");
        if (interval) {
            clearInterval(interval);
        }
        socket.on("login", (arg= {})=>{
            console.log(arg, socket.id);
           var username = arg.username || {};
           const data = poolMap.get(username)
            if(!data || !Array.isArray(data)) {
                poolMap.set(arg.username, [socket.id])
            }else{
                data.push(socket.id);
                poolMap.set(username, _.uniq(data))
            }
           
            socket.join('name-' + username, (err)=> {
                console.log("join room,. eee", err);
                io.to('name-'+username).emit("logincallbak", username + ' have login')
            })
            // console.log(poolMap)
        })
        // getApiAndEmit(socket)
        // interval = setInterval(() => getApiAndEmit(socket), 3000);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });

    const getApiAndEmit = socket => {
        // console.log(socket)

        const response = new Date();
        // 向客户端发送事件
        socket.emit("FromAPI", response);
    };
    return io

}