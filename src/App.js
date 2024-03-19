import './App.css';
import { useState,useEffect } from 'react';
import Addtask from './components/Addtask/Addtask';
import Header from './components/Header/Header';
import Showtask from './components/Showtask/Showtask';
import axios from 'axios';

function App() {
  
  const [keeperList,setkeeperList] = useState([]);
  useEffect(()=>{
    axios.get(`${window.location.origin}/api/getAll`)
    .then(res => setkeeperList(res.data));

  },[]);

  return (
    <>
    <div className='App'>
    <Header/>
    <Addtask keeperList={keeperList} setkeeperList={setkeeperList}/>
    <Showtask keeperList={keeperList} setkeeperList={setkeeperList}/>
    </div>
    </>
  
  );
}

export default App;
