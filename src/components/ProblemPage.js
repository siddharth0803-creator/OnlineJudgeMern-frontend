import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../App.css'
import CodeMirror from '@uiw/react-codemirror';
import { darcula, darculaInit } from '@uiw/codemirror-theme-darcula';
import { cpp, cppLanguage } from '@codemirror/lang-cpp';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ProblemPage = () => {
  const [problemStatement, setproblemStatement] = useState("")
  const [inputFormat, setinputFormat] = useState("")
  const [constraint, setconstraint] = useState("")
  const [outputFormat, setoutputFormat] = useState("")
  const [Id, setId] = useState("")
  const [Loading, setLoading] = useState(false)
  const { id } = useParams();
  let totinput=[]
  let totoutput=[]
  const [problemName, setproblemName] = useState("")
  const [inputarray, setinputarray] = useState([])
  const [outputarray, setoutputarray] = useState([])
  const [SubmitLoading, setSubmitLoading] = useState(false)
  const [verdict, setverdict] = useState(1)
  const [SubmitUsed, setSubmitUsed] = useState(false)
  const navigate=useNavigate()
  
  
  const GetDetail = async (problemId) => {
    const payload = { problemId };
    try {
      const { data } = await axios.post("http://localhost:5000/getinfoById", payload);
      setproblemName(data.problemName)
      //console.log(`${problemName} of GetDetail`)
      
      setproblemStatement(data.problemStatement);
      setinputFormat(data.inputFormat);
      setoutputFormat(data.outputFormat);
      setconstraint(data.constraint);
      setId(problemId);
    } catch ({ response }) {
      if (response) {
        const err = response.data.err.stderr;
        console.log(err);
      } else {
        console.log("Error Connecting to server!!");
      }
    }
  };

  const GetInputDetail = async () => {
    //console.log(`${problemName} of GetinputDetail`)
    const payload = { problemName };
    return axios.post("http://localhost:5000/getinput", payload)
    .then(({ data }) => {
      let arr=data.input
      arr.map((e)=>{
        totinput.push(e.input)
      })
      //console.log(totinput);
      setinputarray(totinput)
    })
    .catch(({ response }) => {
      if (response) {
        const err = response.data.err.stderr;
        console.log(err);
      } else {
        console.log("Error Connecting to server!!");
      }
    });
  };
  
  const GetOutputDetail = async () => {
    const payload = { problemName };
    return axios.post("http://localhost:5000/getoutput", payload)
    .then(({ data }) => {

      let arr=data.output
      arr.map((e)=>{
        totoutput.push(e.output)
      })
      setoutputarray(totoutput)
      //console.log(totoutput);
    })
    .catch(({ response }) => {
      if (response) {
        const err = response.data.err.stderr;
        console.log(err);
      } else {
        console.log("Error Connecting to server!!");
      }
    });
  };
  

const main= async (id)=>{
  await GetDetail(id)
  await GetInputDetail()
  await GetOutputDetail()
}

useEffect(() => {
  GetDetail(id)
}, [])


useEffect(() => {
  if(problemName)
  main(id)
}, [problemName,id])

  
  
    const Boilerplate=`#include<bits/stdc++.h>
using namespace std;
int main(){
  cout<<"Hello World";
  return 0;
}




















`
  const [code, setcode] = useState(Boilerplate)
  const [output, setoutput] = useState(`
  
  
  
  
  `)
  const [input, setinput] = useState(`
  
  
  
  
  `)
  const handleSubmit=async ()=>{
    setLoading(true)
    const payload={
      language:"cpp",
      code,
      input
    }
    try{
    const {data}=await axios.post("http://localhost:5000/run",payload)
    let ObtainedOutput=data.output
    ObtainedOutput+=`
  
  
  
  
    `
    setoutput(ObtainedOutput)
    setLoading(false)
    }catch({response}){
      if(response){
        console.log(response.data)
        let err=response.data.err.toString('utf8');
        err+=`
  
  
  
  
        `
        setoutput(err)
      }else{
        setoutput("Error Connecting to server!!")
      }
      setLoading(false)
    }
    //console.log(output)
  }

const SubmitProblem = async () => {
  setSubmitLoading(true);
  for (let i = 0; i < inputarray.length; i++) {
    const payload = {
      language: "cpp",
      code,
      input: inputarray[i],
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      let ObtainedOutput = data.output;
      if (ObtainedOutput != outputarray[i]) {
        setverdict(0)
        break;
      }
    } catch ({ response }) {
      if (response) {
        console.log(response);
      } else {
        console.log("Error Connecting to server!!");
      }
      setverdict(0)
      break;
    }
  }
  setSubmitUsed(true)
  setSubmitLoading(false);
};
useEffect(() => {
  if (SubmitUsed) {
    navigate(`/Submission/${Id}/${verdict}`)
  }
}, [SubmitUsed])

  return (
    <>
    <div className='problem mt-10 mb-10 ml-10 mr-10'>
      <h1><b>Problem Statement</b></h1>
      <br/>
      <p dangerouslySetInnerHTML={{ __html: problemStatement }} />

        <br/>

        <h1><b>Input</b></h1>
        <br/>
        <p dangerouslySetInnerHTML={{ __html: inputFormat }} />

        <br/>

        <h1><b>Constraints</b></h1>
        <br/>
        <p dangerouslySetInnerHTML={{ __html: constraint }} />

        <br/>

        <h1><b>Output</b></h1>
        <br/>
        <p dangerouslySetInnerHTML={{ __html: outputFormat }}/>

        <br />
        <br />
       <div><h1><b>Example</b></h1>
        <br/>
        <h1><b>Input</b></h1>
        <p style={{color:'#33FFFF'}}>{inputarray[0]}</p>
        <br/>
        <h1><b>Ouput</b></h1>
        <p style={{color:'#33FFFF'}}>{outputarray[0]}</p> </div> 

      </div>
      <div className="EditorContainer mt-6 mb-6 ml-10 mr-10">
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={code}
        extensions={[cppLanguage]}
        onChange={(value, viewUpdate) => {
          setcode(value);
        }}
      />
      </div>
      <div>
      <button className=" ml-10 mt-4 mb-4 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      onClick={handleSubmit}>
      {Loading ? <i className="fas fa-spinner fa-spin"></i> : "Run"}
      </button>
      <button
    className=" ml-10 mt-4 mb-4 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
    onClick={SubmitProblem}
    >
      {SubmitLoading ? (
      <i className="fas fa-spinner fa-spin"></i>
      ) : (
      "Submit"
      )}
      </button>
      </div>
      <div className='Input mt-6 mb-6 ml-10 mr-10'>
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={input}
        extensions={[cppLanguage]}
        onChange={(value, viewUpdate) => {
          setinput(value);
        }}
      />
      </div>
      <div className='Input mt-6 ml-10 mr-10'>
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={output}
        extensions={[cppLanguage]}
        onChange={(value, viewUpdate) => {
          setoutput(value);
        }}
      />
      </div>
      </>
  )
}

export default ProblemPage
