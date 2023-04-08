import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("NOthing");

  function callapiForAuthorization(){
    setResult("NONE YEt");

  }


  return (
    <>
      <div>
        <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

        <button onClick={callapiForAuthorization}>Login</button>

      </div>

      <div style={{marginTop:'50px'}}>
        <div>username:{username}</div>
        <div>password:{password}</div>
        {result}

      </div>
    </>
  );
}

export default App;
