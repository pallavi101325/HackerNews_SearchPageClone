import {React,useContext}  from 'react';
import {AppContext , AppProvider ,Consumer} from "./context";


const Stories = () => {

   const allStates = useContext(AppContext);
    const {hits} = allStates;

     const date = new Date();
     
   
    return(
        <>
        <div className = "stories-div">
            {hits.map((curPost) => {
                const {title, author, objectID , url , points, created_at , num_comments} = curPost;
                return (
                    <div classNmae = "card" key = {objectID}>
                        <h2>{title}</h2>
                        <h3>`( ${objectID} )`</h3>
                        <p>
                            <span>{author}</span> | <span>{points}</span> | <span>{num_comments}</span> | <span>`${ created_at - date}`</span>
                        </p>
                    
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Stories;