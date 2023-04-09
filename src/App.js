import './App.css';
import React, {useState} from 'react';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("NOthing");
  const [accessToken, setAccessToken] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get('code');
  console.log(authorizationCode);

  function callapiForAuthorization(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const params = {
    response_type:'code',
    // username: username,
    // password: password,
    client_id: 'authreact',
    // client_secret:'1q2w3E*'
    redirect_uri:'http://localhost:3000',
    scope: 'address roles phone email profile BookStore'
    // grant_type=client_credentials&client_id=s6BhdRkqt3&client_secret=gX1fBat3bV
  }
    // const options = { 
    //   method: 'POST',
    //   headers:headers,
    //   body: new URLSearchParams(params).toString(),
    // };
    
    // fetch('https://localhost:44369/connect/authorize', options)
    //   .then(response => response.json())
    //   .then(data => {
    //     debugger
    //     console.log(data);
    //   }
    //   )
    //   .catch(error => console.error(error));

    fetch('https://localhost:44369/connect/authorize', {
      method: 'POST',
      body: new URLSearchParams(params).toString(),
      headers: {
        // 'Content-Type': 'application/json'
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
  function getData(){
    const options={
      method:"GET",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`
      }
  }


fetch("https://localhost:44369/api/language-management/languages/all",options).then((res)=>(console.log(res))).catch(error=>console.log(error))
  }
  
  if(authorizationCode){
    fetch('https://localhost:44369/connect/token', {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: 'authreact',
        redirect_uri: 'http://localhost:3000'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        // Success! Parse the response and store the access token
        return response.json().then(data => {
          const accessToken = data.access_token;
          // Store the access token in local storage or a cookie
          // Redirect the user to the main application page
          window.location.href = 'your_application_url';
        });
      } else {
        // Handle errors
        throw new Error('Unable to retrieve access token');
      }
    }).catch(error => {
      console.error(error);
    });
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

      <div> 
        get some data from api:
        <button onClick={getData}> Get the fu*king data</button>
      </div>
    </>
  );
}

export default App;
