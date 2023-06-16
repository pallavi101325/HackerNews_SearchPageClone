import React, { useState , useEffect ,useContext } from "react";
import "./Searchpage.css";
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
import axios from "axios";
import Modal from './Modal';
import {AppContext , AppProvider ,Consumer} from "./context";
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';



const Searchpage = () => {

  const allStates = useContext(AppContext);

const { searchElem,
   byElem,
   forElem,
   hits,
   modalOpen,
   query,
   customTag,
   processingTime,
   updateBy,
   updateFor,
   updateSearch,
   searchPost
   } = allStates;
   
  
    
    // const fetchStories = async (url) => {
        
    //     if(forElem === "All_Time"){
    //         const res = await fetch(`http://hn.algolia.com/api/v1/${byElem}?tags=${searchElem}`)
    //         const data = await res.json();
    //         console.log(data);
    //     }
    //     else{
    //     const x = 0;
    //     const y = parseInt(forElem);
    //       if(forElem === "Custom_Range"){
    //         setModalOpen(true);
    //         console.log("inside custom range");
    //        }
    //     //   const  res = await fetch (`http://hn.algolia.com/api/v1/${byElem}?tags=${searchElem}&numericFilters=created_at_i>${x},created_at_i<${y}`);
    //     //   const data = await res.json();
    //     //   console.log(data);
    //     } 
        

    // }
    // useEffect (() => {
    // //   async function getData(){
    //   console.log(forElem);

    //     fetchStories();
    //     // const res = await axios.get(`http://hn.algolia.com/api/v1/${byElem}?tags=${searchElem},${forElem}`);
    //     // console.log(res.data);
    // //   }
    // }, [searchElem,byElem,forElem]);

    
    
    // const initialState = {
    //     query : "",
    //     searchElem : "",
    //     byElem : "",
    //     forElem : "",

    // }
    // const Appcontext = React.createContext();
    // const AppProvider = ((children)) => {
    //     const [state, dispatch]
    // } 
    return (
  

        // const searchParams = [
        //     {label : 'All', value : 0},
        //     {label : 'Stories' , value : 1},
        //     {label : 'Comments' , value : 2}
        // ]
        // const searchBy = [
        //     {}
        // ]

       <>
        <div className="container">
            <header className="searchHeader">

                <div className="innerHeader">
                    <span >
                        <a href = "https://news.ycombinator.com/">
                            <img  className = "headerImg" src = "https://d1sz9gun5ag95e.cloudfront.net/packs/media/images/logo-hn-search-a822432b.png" 
                            width="54" 
                            height="54"
                             alt = "hacker-news_logo"
                             ></img>
        
                        </a>
                        <a href = "/" className="header_label">
                            <div >
                            Search
                            <br/>
                            Hacker News
                            </div>
                        </a>
                    </span>
                  
                    <div className = "searchInputHeader">
                         <button className = "user">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                        </button>
                        <form onSubmit = {(e) => e.preventDefault()}>
                        <input 
                        type = "search" 
                        placeholder = "Search stories by title , url or author" 
                        className = "SearchInput" 
                        value = {query}
                        onChange = {(event) => searchPost(event.target.value)}
                        ></input>
                        </form>
                        <div className = "PoweredBy">
                        <span className = "searchBy" >Search By    </span>
                        <a  href = "https://www.algolia.com/?utm_source=hn_search&amp;utm_medium=link&amp;utm_term=logo&amp;utm_campaign=hn_algolia" 
                        title = "Realtime Search Engine"
                        target = "_blank"
                        rel="noreferrer"
                        >
                        <img src = "https://d1sz9gun5ag95e.cloudfront.net/packs/media/images/logo-algolia-blue-35c461b6.svg" alt = "Algolia Logo"></img>
                        </a>
                       
                        </div>
                    </div>
                    <div className = "header_setting">
                           <button className="settingIcon">
                           <SettingsIcon class = "muiIcons"/>
                           </button>
                          <a href = "/settings" className="settingsText" >
                          <span className = "textSpan" color="black">Settings</span>
                          </a>
                    </div>
                </div>
            </header>
            <div>
                <form className = "filter_div">
                  <h3>Search by </h3>
                  <select name="stories" className="filters" label = {searchElem} value = {searchElem} onChange = {(event) => {
                    updateSearch(event.target.value);
                  }} >
                    <option value="All">All</option>
                    <option value="Stories">Stories</option>
                    <option value="Comments">Comments</option>
                  </select>
                  <h3>by</h3>
                  <select name="popularity" className="filters"  label = {byElem} value = {byElem} onChange = {(event) => {
                    updateBy(event.target.value);
                  }}>
                    <option value="search">popularity</option>
                    <option value="search_by_date">Date</option>
                  </select>
                  <h3>for</h3>
                  <select name = "dateRange" className="filters" label = {forElem} value = {forElem} onChange = {(event) => {
                    updateFor(event.target.value);
                  }}>
                    <option value="All_Time">All Time</option>
                    <option value="86400">Last 24h</option>
                    <option value="604800">Past Week</option>
                    <option value="2592000">Past Month</option>
                    <option value="31557600">Past Year</option>
                    <option value={customTag}>{customTag}</option>
                    {/* {customTag !== "" && <option value = {customTag}>{customTag}</option>} */}
                    {modalOpen && <Modal/>}
                  </select>
                </form>
            </div>
           <div className="meta_data">
            <p>{hits.length} result ( {processingTime} seconds )  </p>
            <div className="share_button">
            <IconButton  >
             <ShareIcon />
            </IconButton>
            </div>
           </div>
        </div>
        </>
    );
};

export default Searchpage;