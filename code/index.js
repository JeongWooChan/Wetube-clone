const express = require('express'); // require는 node module을 가져오는 역할을 함 
const app = express();  

const PORT = 4000;

function handleListening() {
    console.log(`Listening on : http://localhost:${PORT}`);
}

function handleHome(req, res) {
    console.log(req);
    res.send('Hello from hone!!');
}

function handleProfile(req, res) {
    res.send("You are on my profile");
}

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);