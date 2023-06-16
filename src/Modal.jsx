import "./Modal.css";
import { useContext } from "react";
import {AppContext , AppProvider ,Consumer} from "./context";
import {DatePicker} from "antd";
import {moment} from "moment";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
// import 'antd/dist/reset.css';

const {RangePicker} = DatePicker;


export default function Modal() {
  const allStates = useContext(AppContext);

  const {minDate,maxDate,dates,updateFor,updateModalOpen,handleReset,updateMinDate,updateMaxDate,updateTag} = allStates;
  
    
	const closeModal=()=>{
		updateModalOpen(false);
    updateMinDate(null);
    updateMaxDate(null);
   // handleReset();
	};
	const applyFor = () => {
   updateTag("custom_date");
    updateModalOpen(false);
  };
  const handleRangeChange = (ranges) => {
    console.log(ranges);
    // setDateRange([ranges.selection]);
  };
	return (
		<div className="modal">
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal-content">
            {/* <RangePicker
            format="DD/MM/YYYY"
            //value = {dates}
            // onchange = {handleRangeChange}
            onchange = {(values) => {
              const value1 = moment(values[0]).format('DD-MM-YYYY')
              const value2 = moment(values[1]).format('DD-MM-YYYY')
              updateMinDate(value1)
              updateMaxDate(value2)
            }}
            /> */}

           <DatePicker
            label = "Start Date"
            dateFormat="dd/MM/yyyy"
            onChange={(date) => updateMinDate(date)}
           />
           <DatePicker
            label = "End Date"
            dateFormat="dd/MM/yyyy"
            onChange={(date) => updateMaxDate(date)}
            />
            <button className="apply-modal" onClick = {applyFor}>
              APPLY
              </button>
            <button className="close-modal" onClick = {closeModal}>
              CLOSE
            </button>
          </div>
        </div>
    );
}
