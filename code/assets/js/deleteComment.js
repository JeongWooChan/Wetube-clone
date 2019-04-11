import axios from "axios"; 

const commentList = document.getElementById("jsCommentList"); 
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const removeComment = (commentId) => {
    document.getElementById(commentId).parentElement.remove();
    decreaseNumber(); 
}

const handleDelete = async (event) => {
    const btnId = event.target;
    const response = await axios({
        url: `/api/${btnId.id}/delete`, 
        method: "POST"
    }); 
    if(response.status === 200) {
        removeComment(btnId.id); 
    }
}

function init() {
    commentList.addEventListener("click", handleDelete); 
}

if(commentList) {
    init(); 
}