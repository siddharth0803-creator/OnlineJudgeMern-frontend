import React,{useState} from 'react'
import image from '../BackgroundImage.jpg'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
const HomePage = () => {
  const [problemName, setproblemName] = useState("")
  const {id}=useParams()
  const GetDetail=async ()=>{
  const payload={problemId:id}
  try{
    const {data}=await axios.post("https://ojbackend.onrender.com/getinfoById",payload)
      setproblemName(data.problemName)
    }catch({response}){
      
      if(response){
        const err=response.data.err.stderr;
      console.log(err)
      }else{
        console.log("Error Connecting to server!!")
      }
    }
  }
  GetDetail()
  return (
<div>
    <div style={{
      color:"#6D67E4",
      textAlign:"center",
      backgroundImage:`url(${image})`,
      height:'60vh',
      width:'100vw',
      backgroundSize:'cover'
    }}>
    <p style={{
      fontSize:"75px",
      position:'absolute',
      top:'70px',
      left:'345px',
      fontWeight:'bolder'
    }}>
    Problem A Day Keeps
    <br/>
    Fear of Interview Away
    </p>
    <Link to="/addProblem">
  <button className="bg-green-500 hover:bg-green-700 
  text-white font-bold py-2 px-4 rounded"
    style={{
      position:'relative',
      left:'610px',
      top:'20px',
      width:'250px',
    }}
    >
    Contribute Problem
  </button>
  </Link>
    </div>
    <div style={{display: "inline-flex", 
    alignItems: "center",
    backgroundSize:'cover'
    }}
    >

    { problemName === "" ? (<img 
    style={{
      marginLeft:"550px"
    }}
    src="https://media.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif" 
    alt="gif"/> ):
  (
    <>
    <textarea className=" resize mt-20 ml-80 placeholder:italic placeholder:text-slate-400 
    block bg-white h-500px w-2/5 border border-slate-300 rounded-md 
    py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 
    focus:ring-sky-500 focus:ring-1 sm:text-sm" 
    placeholder="" 
    type="text" value={problemName}
    style={{
      height:'45px',
      width:'700px',
      fontSize:'45px',
      textAlign:'center'
    }}
  >
  </textarea>
  <Link to={`/problem/${id}`}>
  <button className="mt-20 ml-10 bg-green-500 hover:bg-green-700 
  text-white font-bold py-3 px-20 rounded"
    >
      Solve
  </button>
  </Link>
  </>
    )}
</div>

</div>


  )
}

export default HomePage
