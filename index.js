const fs = require('fs');
const http = require('http')
const url = require('url')

let model = fs.readFileSync('./my_model/model.json')
let metadata = fs.readFileSync('./my_model/metadata.json')
let weights = fs.readFileSync('./my_model/weights.bin')

http.createServer(function(req, res) {
    let query = url.parse(req.url, true).pathname;
    if(query == "/model")
    {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(model)
    }
    else if(query == "/metadata")
    {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(metadata)
    }
    else if(query == "/weights.bin")
    {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(weights)
    }
}).listen(3000);



module.exports.modelData = model;
module.exports.metadataURL = metadata;