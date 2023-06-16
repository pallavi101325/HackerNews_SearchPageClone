//import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Searchpage from "./Searchpage";
import Pagination from './Pagination';
import Stories from './Stories';
import Modal from './Modal';
import { useContext } from 'react';
import {AppContext , AppProvider ,Consumer} from "./context";


const App = () => {
  const allStates = useContext(AppContext);
  const {modalOpen} = allStates;
  return (
    <>
    <Searchpage/>
    {modalOpen && <Modal/>}
    <Stories/>
    <Pagination/>

    </>
  );
};



export default App;

