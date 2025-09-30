const http = require('node:http');

// const server = http.createServer(function (req, res)
// {
//     console.log(`Incomming request at [${Date.now()}]`);
//     console.log(req.headers);
    
//     res.writeHead(200);
//     res.end('Ok!');
// });

const server = http.createServer(function (req, res)
{
    console.log(`Incomming request at [${Date.now()}]`);
    console.log(req.url);
    
    // ..
    switch (req.url)
    {
        case '/':
        res.writeHead(200);
        return res.end(`Homepage`);

    case '/contact-us':
        res.writeHead(200);
        return res.end(`Contact Me at xyz@gmail.com`);
    
    case '/about':
        res.writeHead(200);
        return res.end('I am a software eng');

    default:
        res.writeHead(404);
        return res.end("You are lost");
    }
     
});

server.listen(8000, () =>
{
    console.log(`Http server is up and running on Port: 8000`);
});
