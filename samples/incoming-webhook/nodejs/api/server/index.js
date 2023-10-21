const { Bedrock } = require('langchain/llms/bedrock');
const express = require('express');
const PORT = process.env.PORT || 3001;
const server = express();
server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));
const model = new Bedrock({
    model: 'anthropic.claude-instant-v1',
    region: 'us-east-1'
});

server.get('/', async (req, res) => {
    console.log(req);
    res.send(`Hi! Node.js version: ${ process.version }`);
});

server.post('/', async (req, res) => {
    console.log(req.headers);
    console.log(req.body);
    const body = req.body;

    const text = await model.invoke(prompting(body));

    const response = {
        type: 'message',
        text: text
    };
    console.log(response);

    res.json(response);
});

function prompting(body) {
    return `\n\nHuman: 以下の質問に答えて<question>${ body }</question>\n\nAssistant:`;
}

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${ PORT }`);
});
