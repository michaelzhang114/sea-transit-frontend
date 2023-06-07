import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api?route_id=100275&stop_id=2255").then(
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
