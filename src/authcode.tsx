import './App.css';
import React, {useState, useEffect} from 'react';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);



  const generateCodeVerifier = () => {
    const array = new Uint8Array(45);
    window.crypto.getRandomValues(array);
    const codeVerifier = btoa(String.fromCharCode.apply(null, array))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    return codeVerifier;
  };
  
  
 

  const generateCodeChallenge = (codeVerifier) => {
    const hashedVerifier = sha256(codeVerifier);
    const base64EncodedVerifier = Base64.stringify(hashedVerifier);
    const codeChallenge = base64EncodedVerifier
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    return codeChallenge;
  };



  
  function callapiForAuthorization(){
  
    const codeVerifier = generateCodeVerifier();
    const codeChallenge =  generateCodeChallenge(codeVerifier);
    console.log("codeChallenge is ........ ", codeChallenge)
    console.log("codeVerifier is ........ ", codeVerifier)
    localStorage.setItem('codeVerifier', codeVerifier);
    localStorage.setItem('codeChallenge',codeChallenge);

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const params = {
      response_type:'code',
      client_id: 'authreact',
      redirect_uri:'http://localhost:3000',
      code_challenge: localStorage.getItem('codeChallenge'),
      code_challenge_method: 'S256',
      // nonce: "azlWZlBscHBqbHhzeXBsZ3dVbFFPNUEteE5IcUcxWklDcmk5aHJXWG5hZkNq",
      // culture:" en-GB",
      // state:" azlWZlBscHBqbHhzeXBsZ3dVbFFPNUEteE5IcUcxWklDcmk5aHJXWG5hZkNq",
      // uiculture: "en-GB"  ,
      scope:'openid offline_access BookStore address email profile roles phone'
    }

    fetch('https://localhost:44369/connect/authorize', {
      method: 'POST',
      body: new URLSearchParams(params).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      if (response.status === 200) {
        window.location.href = response.url;
      } else {
        // handle other response codes
      }
    }).catch(error => {
      // handle errors
    });
  }

  useEffect(() => {
    console.log(count)
    if(!count){
      setCount(1);
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
      const state = urlParams.get('state');
      console.log(state);
      const params = {
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: 'http://localhost:3000',
          code_verifier:localStorage.getItem('codeVerifier'),
          client_id: 'authreact'
      }
      
      fetch('https://localhost:44369/connect/token', {
        method: 'POST',
        body: new URLSearchParams(params).toString(),
        headers: {
          'Accept-Language': 'en-GB',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(response => {
        console.log(response)
        if (response.ok) {
          // Success! Parse the response and store the access token
          return response.json().then(data => {
            debugger
            const accessToken = data.access_token;
            // Store the access token in local storage or a cookie
            localStorage.setItem('accessToken', accessToken)
            // Redirect the user to the main application page
          });
        } else {
          // Handle errors
          throw new Error('Unable to retrieve access token');
        }
      }).catch(error => {
        console.error(error);
      });
    }
  },[]);
  





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

      <div> 
        get some data from api:
        {/* <button onClick={getData}> Get the fu*king data</button> */}
      </div>
    </>
  );
}

export default App;

