const express = require('express'); // require는 node module을 가져오는 역할을 함 
const app = express();  

const PORT = 4000;

function handleListening() {
    console.log(`Listening on : http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);