import React from 'react';
import {useContext} from 'react';
import {AppContext , AppProvider ,Consumer} from "./context";

const Pagination = () => {

    const allStates = useContext(AppContext);
    const {nbpages,page, getprevpage, getnextpage} = allStates;
        

    return (
        <>
        <div className='pagination-btn'>
            <button onClick = {() => getprevpage() } className="prev-btn">PREV</button>
            <p>
                {page + 1} of {nbpages}
             </p>
             <button onClick = {() => getnextpage() } className="next-btn">NEXT</button>
        </div>
        </>
    );

};

export default Pagination;