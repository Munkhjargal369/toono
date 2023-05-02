
import Board from './component/ToonoBoard';
import './App.css';
import React from "react";
import { initialBoard } from './component/initialBoard';
import Referee from './Referee';

function App() {
  return (
    <div id="App">
        <Referee/>
    </div>
  );
}

export default App;
