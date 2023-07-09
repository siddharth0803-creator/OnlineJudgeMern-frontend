import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { darcula, darculaInit } from '@uiw/codemirror-theme-darcula';

const ProblemDescription = () => {
  const space = `
  
  
  
  `
  const extraSpace = `





  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  `
  const [problemName, setproblemName] = useState(space)
  const [problemStatement, setproblemStatement] = useState(extraSpace)
  const [constraint, setconstraint] = useState(space)
  const [inputFormat, setinputFormat] = useState(space)
  const [outputFormat, setoutputFormat] = useState(space)
  const [success, setsuccess] = useState(false)
  const [error, seterror] = useState(false)

  const HandleSubmit=async ()=>{
    const payload={
      problemName,
      problemStatement,
      constraint,
      inputFormat,
      outputFormat
    }
    try{
    const {data}=await axios.post("https://ojbackend.onrender.com/addProblem",payload)
      setsuccess(true)
    }catch({response}){
      
      if(response){
        const err=response.data.err.stderr;
      console.log(err)
      }else{
        console.log("Error Connecting to server!!")
      }
      seterror(true)

    }
  }

  return (
    <div>
      <p style={{
        fontWeight:'bolder',
        fontSize:'50px',
        color:'yellowgreen',
        marginLeft:'35px'
      }}>
        Problem Name
      </p>
      <div className='Input mt-6 mb-6 ml-10 mr-10'>
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={problemName}
        onChange={(value, viewUpdate) => {
          setproblemName(value);
        }}
      />
      </div>

  <p style={{
        fontWeight:'bolder',
        fontSize:'50px',
        color:'yellowgreen',
        marginLeft:'35px',
        marginTop:'100px'
      }}>
        Problem Statement
      </p>
      <div className="EditorContainer mt-6 mb-6 ml-10 mr-10">
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={problemStatement}
        onChange={(value, viewUpdate) => {
          setproblemStatement(value);
        }}
      />
      </div>

  <p style={{
        fontWeight:'bolder',
        fontSize:'50px',
        color:'yellowgreen',
        marginLeft:'35px',
        marginTop:'100px'
      }}>
        Input Format
      </p>
      <div className='Input mt-6 mb-6 ml-10 mr-10'>
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={inputFormat}
        onChange={(value, viewUpdate) => {
          setinputFormat(value);
        }}
      />
      </div>


  <p style={{
        fontWeight:'bolder',
        fontSize:'50px',
        color:'yellowgreen',
        marginLeft:'35px',
        marginTop:'100px'
      }}>
        Constraints
      </p>
      <div className='Input mt-6 mb-6 ml-10 mr-10'>
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={constraint}
        onChange={(value, viewUpdate) => {
          setconstraint(value);
        }}
      />
      </div>


  <p style={{
        fontWeight:'bolder',
        fontSize:'50px',
        color:'yellowgreen',
        marginLeft:'35px',
        marginTop:'100px'
      }}>
        Output Format
      </p>
      <div className='Input mt-6 mb-6 ml-10 mr-10'>
      <CodeMirror 
        className="Editor" 
        theme={darculaInit({
          settings: {
            fontFamily: 'monospace',
          }
        })}
        value={outputFormat}
        onChange={(value, viewUpdate) => {
          setoutputFormat(value);
        }}
      />
      </div>

  <div style={{
    display: "inline-flex",
    alignItems: "center"
  }}>
  <button className="bg-green-500 hover:bg-green-700 
  text-white font-bold py-2 px-4 rounded"
    style={{
      marginLeft:'35px',
      marginTop:'25px',
      marginBottom:'50px',
      width:'250px',
    }}
    onClick={HandleSubmit}
    >
    Add Problem
  </button>
  
  {success && <div style={{marginLeft:'150px',marginBottom:'15px'}}>
  <div class="max-w-xs bg-green-500 text-sm text-white rounded-md shadow-lg" role="alert">
    <div class="flex p-4">
      Problem Added Successfully

      <div class="ml-auto">
        <button type="button" class="inline-flex flex-shrink-0 
        justify-center items-center h-4 w-4 rounded-md text-white/[.5] 
        hover:text-white focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-offset-green-800 
        focus:ring-green-500 transition-all text-sm 
        dark:focus:ring-offset-green-500 dark:focus:ring-green-700"
        onClick={()=>setsuccess(false)}
        >
          <span class="sr-only">Close</span>
          <svg class="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>}

  {error && <div style={{marginLeft:'150px',marginBottom:'15px'}}>
  <div class="max-w-xs bg-red-500 text-sm text-white rounded-md shadow-lg" role="alert">
    <div class="flex p-4">
      Problem Could Not be Added

      <div class="ml-auto">
        <button type="button" class="inline-flex flex-shrink-0 
        justify-center items-center h-4 w-4 rounded-md text-white/[.5] 
        hover:text-white focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-offset-red-800 
        focus:ring-red-500 transition-all text-sm 
        dark:focus:ring-offset-red-500 dark:focus:ring-red-700"
        onClick={()=>seterror(false)}
        >
          <span class="sr-only">Close</span>
          <svg class="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>}

<Link to="/addTestcase">
<button className="bg-green-500 hover:bg-green-700 
  text-white font-bold py-2 px-4 rounded"
    style={{
      marginLeft:'50px',
      marginTop:'25px',
      marginBottom:'50px',
      width:'250px',
    }}
    >
    Add TestCases
  </button>
  </Link>

    </div>
    </div>
  )
}

export default ProblemDescription
