// import { useState } from "react";

function DeleteReview({ handleDelete, review }){
   
    return(     
        <button onClick={() => handleDelete(review)}>Delete</button>    
    )
}

export default DeleteReview;