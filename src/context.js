import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import useContext from 'react';
import {createContext} from 'react';
import { format } from "date-fns";
import moment from "moment";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
//import "./setupProxy";

let Api = "http://hn.algolia.com/api/v1/";

const AppContext = createContext();
dayjs.locale('en');

const AppProvider = ({children}) => {

const [searchElem, setSearchElem] = useState("All");
const [byElem , setByElem] = useState("search");
const [forElem, setForElem] = useState("");
const [hits, setHits] =  useState([]);
const [minDate , setMinDate] = useState();
const [maxDate, setMaxDate] = useState();
const [dates, setDates] = useState([]);
const [modalOpen,setModalOpen]=useState(false);
const [query , setQuery] = useState("");
const [nbpages, setnbpages] = useState(0);
const [page, setpage] = useState(0);
const [customTag , setCustomTag] = useState('Custom_Range');
const [processingTime, setProcessingTime] = useState(null);



function formatDate(date) {
  const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

  const updateTag = (val) => {
    setCustomTag(val);
   };
  const updateFor = (val) => {
    if(val === 'Custom_Range'){
      setModalOpen(true);
    }
     setForElem(val);
     console.log("forelem : ")
     console.log(forElem);
   };
  const updateBy = (val) => {
    setByElem(val);
  }; 
  const updateSearch = (val) => {
    setSearchElem(val);
  }; 
  const updateModalOpen = (val) => {
    setModalOpen(val);
  };
  const getprevpage = () => {
      let temp = page + 1;
      if(temp >= nbpages){
        setpage(temp);
      }
      else{
        setpage(0);
      }
  };
  const getnextpage = () => {
    let temp = page - 1;
    if(temp <= 0){
        setpage(0);
    }
    setpage(temp);
  };
  const searchPost = (prop) => {
    setQuery(prop);
  };
  const handleReset = () => {
    setForElem("");
  };
 const updateMinDate = (val) => {
    // let nd = val.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    // const nd = val.format('DD-MM-YYYY');
     const nd =  dayjs(val);//.format('DD/MM/YYYY')
     setMinDate(nd);
     console.log(minDate);
     
 };
 const updateMaxDate = (val) => {
    const nd =  dayjs(val);//.format('DD/MM/YYYY')
     setMaxDate(nd);
     console.log(maxDate);
 };
 const fetchApiData = async (url) => {
        let res , data;
    try{
          if(forElem === "All_Time" || forElem === "")
          {  
           // , { mode: 'no-cors' }
             console.log("inside all time");
             console.log(byElem);
             console.log(query);
             console.log(searchElem);
              const tempres = await fetch(`http://hn.algolia.com/api/v1/${byElem}?query=${query}&tags=${searchElem}/`)
              .then(function(){
              let headers = new Headers();

              headers.append('Content-Type', 'application/json');
              headers.append('Accept', 'application/json');
              headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
              headers.append('Access-Control-Allow-Credentials', 'true');
              headers.append('GET', 'POST', 'OPTIONS');
            })
            .then (response => {

              if (response.ok) {
                // Successful request (status code 200-299)
                console.log('Request succeeded!');
                console.log('Status:', response.status);
                // Continue processing the response
               
              } else {
                // Request failed (status code outside 200-299)
                console.log('Request failed!');
                console.log('Status:', response.status);
                // Handle the error
                throw new Error('Request failed');
              }
            })
            console.log(tempres);
            data = await res.json();
            console.log("data");
            console.log(data);
            // setHits(data.hits);
            // setnbpages(data.nbPages);
            // console.log(res);
            // console.log(hits);
          }
          else
          {    
               if(forElem ===  "Custom_Range"){
                  console.log("inside custom range");
                  const now = dayjs();
                  const selected1 = dayjs(minDate);
                  const x = selected1.diff(now, 'second');
                  const selected2 = dayjs(maxDate);
                  const y = selected2.diff(now, 'second');
                  
                  res = await fetch(`http://hn.algolia.com/api/v1/${byElem}?query=${query}&tags=${searchElem}&numericFilters=created_at_i>${x},created_at_i<${y}`);
                  data = await res.json();
                  setHits(data.hits);
                  setnbpages(data.nbPages);
                  console.log(x);
                  console.log(y);
               }
               else{
                console.log("inside else block");
                const x = parseInt(forElem);
                console.log(x);
                res = await fetch(`http://hn.algolia.com/api/v1/${byElem}?query=${query}&tags=${searchElem}&numericFilters=created_at_i>${x}`);
                data = await res.json();
                console.log(data);
                setHits(data.hits);
                setnbpages(data.nbPages);
                
               }
              
          }

        }
        catch(error){
            console.log(error);
        }
};


useEffect (() => {
    const startTime = performance.now();
        fetchApiData();
   const endTime = performance.now();
    const timeDiff = endTime - startTime;
    setProcessingTime(timeDiff);
    
} , [searchElem,byElem,forElem,query,modalOpen, minDate, maxDate,setForElem, customTag]);

const AllStates = {
  searchElem,
   byElem,
   forElem,
   hits,
   minDate ,
   maxDate,
   dates,
   modalOpen,
   query,
   nbpages,
   page,
   customTag,
   processingTime,
   updateBy,
   updateFor,
   updateSearch,
   updateModalOpen,
   getprevpage,
   getnextpage,
   searchPost,
   handleReset,
   updateMaxDate,
   updateMinDate,
   updateTag

}

return (
    <AppContext.Provider
    value ={AllStates}
    >
   {children}
    </AppContext.Provider>
)
};
// const useGlobalContext = () => {
//     return useContext(AppContext);
// };
const { Consumer } = AppContext;
export { AppContext , AppProvider ,Consumer};
