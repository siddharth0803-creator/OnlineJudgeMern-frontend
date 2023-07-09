import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import image from '../BackgroundImage.jpg'

const RandomProblem = () => {
  const total = async () => {
    const { data } = await axios.get("https://ojbackend.onrender.com/totalProblem");
    const total_question = Number(data.total);
    const id = Math.floor((Math.random() * total_question) + 1);
    return Number(id);
  };

  const [id, setId] = useState(1);

  useEffect(() => {
    async function main() {
      const result = await total();
      setId(result);
    }
    main();
  }, []);

  return (
    <>
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
    <div>
      <Link to={`/${id}`}>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          style={{
            position: "relative",
            left: "500px",
            top: "100px",
            width: "500px",
          }}
        >
          Generate Problem of the Day
        </button>
      </Link>
    </div>
    </>
  );
};


export default RandomProblem
