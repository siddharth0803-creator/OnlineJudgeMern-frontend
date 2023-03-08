import React from 'react'
import { useParams,Link } from 'react-router-dom'

const Submission = () => {
  let text = "ACCEPTED"
  let color = "yellowgreen"
  let top = "120px"
  let left = "30px"
  let textcolor = "green"
  const {id,verdict}=useParams()
  const ver=Number(verdict)
  const Id=Number(id)
  if(!ver){
    text="WRONG ANSWER"
    color="darkred"
    left="50px"
    top="80px"
    textcolor="red"
  }
  return (
    <div style={{
      backgroundColor: `${textcolor}`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
    }}>
    <div style={{
      position:'relative',
      top:'160px',
      height:'350px',
      width:'350px',
      left:'600px',
      backgroundColor:`${color}`,
      borderRadius:'25px',
      boxShadow:'inherit'
    }}>
    <p style={{
      position:'relative',
      top:`${top}`,
      left:`${left}`,
      color:`${textcolor}`,
      fontWeight:'bolder',
      fontSize:"60px"
    }}>
    {text}
    </p>
  </div>

  {!ver && <div style={{
    marginTop:'100px',
    marginLeft:'625px'
  }}>
  <Link to={`/problem/${Id}`}>
    <button className="mt-20 ml-10 bg-red-500 hover:bg-red-700 
  text-white font-bold py-3 px-20 rounded"
    >
    Try Again
  </button>
  </Link>
  </div>}
  
</div>

  )
}

export default Submission
