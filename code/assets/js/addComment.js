import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment"); 
const commentList = document.getElementById("jsCommentList"); 
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1; 
}

const addComment = (comment, commentId) => {
    const li = document.createElement("li"); 
    const span = document.createElement("span"); 
    const button = document.createElement("button");
    button.innerText = "❌"; 
    button.id = commentId;
    span.innerHTML = comment; 
    li.appendChild(span);
    li.appendChild(button);
    commentList.prepend(li); 
    increaseNumber(); 
}

const sendComment = async comment => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST", 
        data: {
            comment
        }
    }); 
    if(response.status === 200) {
        addComment(comment, response.data); 
    }
}

const handleSubmit = (event) => {
    event.preventDefault(); 
    const commentInput = addCommentForm.querySelector("input"); 
    const comment = commentInput.value; 
    sendComment(comment); 
    commentInput.value = ""; 
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit); 
}

if(addCommentForm) {
    init(); 
}