import React from 'react'
import './index.css'
import './App.css'
import { Route,Routes } from "react-router-dom";
import ProblemPage from './components/ProblemPage';
import HomePage from './components/HomePage';
import Submission from './components/Submission';
import ProblemDescription from './components/ProblemDescription';
import Testcase from './components/Testcase';
import RandomProblem from './components/RandomProblem';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<RandomProblem/>} exact />
      <Route path='/:id' element={<HomePage/>}  />
      <Route path='/problem/:id' element={<ProblemPage/>} />
      <Route path='/Submission/:id/:verdict' element={<Submission/>} exact/>
      <Route path='/addProblem' element={<ProblemDescription/>} />
      <Route path='/addTestcase' element={<Testcase/>} />
    </Routes>
    </div>
  );
}

export default App;
