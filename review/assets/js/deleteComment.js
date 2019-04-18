import axios from "axios"; 

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const removeComment = commentId => {
    document.getElementById(commentId).parentElement.remove();
    decreaseNumber(); 
}

const deleteComment = async commentId => {
    const response = await axios({
        url: `/api/${commentId}/delete`,
        method: "POST",
        data: {
            commentId
        }
    }); 
    if(response.status === 200) {
        removeComment(commentId); 
    }
}

const handleClick = event => {
    event.preventDefault(); 
    const commentId = event.target.id; 
    deleteComment(commentId); 
}

function init() {
    commentList.addEventListener("click", handleClick);
}

if(commentList) {
    init();
}