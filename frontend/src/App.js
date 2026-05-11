import logo from './logo.svg';
import './App.css';

function App() {

const[mail,setmail]=useState('')



const send=async()=>{
  const result=await fetch('http://localhost:9000/api/nodemail',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email:mail})
  })
if(result.ok){
  const data=await result.json()
  if(data.statuscode===1){
    alert("Email sent successfully!")
  } else {
    alert("Error occurred while sending email.")
  }
}

}

  return (
   <>
   <input type='text' value={mail} onChange={(e)=>setmail(e.target.value)}></input>
   <br></br>
   <button onClick={send} >send</button>
   </>
  );
}

export default App;
