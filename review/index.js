import express from "express"; 

const app = express(); 

const PORT = 4001; 

const handleListening = () => {
    console.log(`Listening on : http://localhost:${PORT}`); 
}

const handleHome = (req, res) => {
    res.send("Hi from home"); 
}

const handleProfile = (req, res) => {
    res.send("Here is my profile page");
}

app.get("/", handleHome); 

app.get("/profile", handleProfile); 

app.listen(PORT, handleListening); 