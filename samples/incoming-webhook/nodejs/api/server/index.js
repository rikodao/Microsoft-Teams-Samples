const express = require('express');
const PORT = process.env.PORT || 3001;
const server = express();
const axios = require('axios');
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));


server.get('/', async (req, res) => {
    console.log(req)
  res.send(`Hi! Node.js version: ${process.version}`)
})

server.post('/', async (req, res) => {
        console.log(req.header)
        console.log(req.body)
    
    const body = req.body;
    const response = {
        'type': 'message',
        'text': 'hello! Mr. ' + body.from.name + '. You said : ' + body.text
    };
    console.log(response)


  res.json(response)
})

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
