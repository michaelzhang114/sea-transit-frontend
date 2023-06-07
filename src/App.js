import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("https://seattle-transit-front.onrender.com/api?route_id=100252&stop_id=6220").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>App</div>
  )
}

export default App;
