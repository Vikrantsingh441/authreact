import './App.css';
import React, {useState, useEffect} from 'react';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  
  function callapiForAuthorization() {
    debugger
    const params = {
      response_type: 'token',
      client_id: 'authreact',
      redirect_uri: 'http://localhost:3000',
      nonce: "azlWZlBscHBqbHhzeXBsZ3dVbFFPNUEteE5IcUcxWklDcmk5aHJXWG5hZkNq" ,
      scope: 'openid offline_access BookStore address email profile roles phone'
    };
  
    const authEndpoint = 'https://localhost:44369/connect/authorize';
    // const redirectUrl = `${params.redirect_uri}#`;
    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = `${authEndpoint}?${queryParams}`;
  
    window.location.href = fullUrl;
  }

  useEffect(() => {
    if (!count) {
      setCount(1);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const tokenType = hashParams.get('token_type');
      const expiresIn = hashParams.get('expires_in');
  
      if (accessToken && tokenType && expiresIn) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('tokenType', tokenType);
        localStorage.setItem('expiresIn', expiresIn);
      }
    }
  }, []);
  





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
    

      </div>
    </>
  );
}

export default App;

