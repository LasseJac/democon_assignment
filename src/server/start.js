const express = require('express');
const path = require('path');
const eventRouter = require('./api/routes/events');

const dist = path.resolve(__dirname, '..', '..', 'dist');

const start = () => {
    const server = express();
    
    server.use('/api/events', eventRouter());

    server.use(express.static(dist));
    
    server.get((_, res) => {
        res.type('html');

        res.sendFile(path.join(dist + '/index.html'));
    });

    server.listen(process.env.PORT, () => {
        console.log(`Server listening on port: ${process.env.PORT}`);
    });
};

start();