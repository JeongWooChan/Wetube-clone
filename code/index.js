import express from "express"; // require는 node module을 가져오는 역할을 함 
const app = express();  

const PORT = 4000;

const handleListening = () => { console.log(`Listening on : http://localhost:${PORT}`); }

const handleHome = (req, res) => s.   res.send('Hello from hone!!');

const handleProfile = (req, res) => res.send("You are on my profile");

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);