/**
 * Application primary entry point.
 * Author - Gautam
 */

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const handlers = require('./routes');

// Create a basic http server
const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true);
    // Remove leading and trailing slash
    const path = parsedURL.pathname.replace(/^\/+|\/+$/g, '');

    // Parse the payload in case it's a POST or PUT
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', data => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        // Transfer to handler.
        if (typeof handlers[path] === 'function') {
            handlers[path](buffer, (statusCode = 200, response = {}) => {
                res.writeHead(statusCode, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(response));
            });
        } else {
            res.writeHead(404);
            res.end('Sorry! Invalid url.')
        }
    });
});

// Listen to a port
server.listen(3000, () => {
    console.info('Server is listening on port 3000');
});