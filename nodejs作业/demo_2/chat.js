const ws = require('ws');

let chatServer = new ws.Server({port: 3000},()=>{
    console.log('server is running');
});
chatServer.on('connection',function(socket){
    socket.on('message',function(data){
        chatServer.clients.forEach(client=>{
            if(client.readyState===ws.OPEN){
                data = JSON.parse(data);
                switch(data.type){
                    case 1:
                        client.send('欢迎 '+data.user+' 加入聊天室\r\n');
                        break;
                    case 2:
                        client.send(data.user+' 离开了聊天室\r\n');
                        break;
                    default:
                        client.send(data.user+':\r\n'+data.value+'\r\n');
                        break;    
                }
            }
        })
    })
})