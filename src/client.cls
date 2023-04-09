% import './App.css';
% import React, {useState} from 'react';

% function App() {
%   const [username, setUsername] = useState("");
%   const [password, setPassword] = useState("");
%   const [result, setResult] = useState("NOthing");
%   const [accessToken, setAccessToken] = useState("");

%   function callapiForAuthorization(){
%     const headers = new Headers();
%     headers.append('Content-Type', 'application/x-www-form-urlencoded');
%     const params = {
%     grant_type:'client_credentials',
%     // username: username,
%     // password: password,
%     client_id: 'authreact',
%     client_secret:'1q2w3E*'
%     // scope: 'address roles phone email profile BookStore'
%     // grant_type=client_credentials&client_id=s6BhdRkqt3&client_secret=gX1fBat3bV
%   }
%     const options = { 
%       method: 'POST',
%       headers:headers,
%       body: new URLSearchParams(params).toString(),
%     };
    
%     fetch('https://localhost:44369/connect/token', options)
%       .then(response => response.json())
%       .then(data => {
%         console.log(data);
%         setResult(JSON.stringify(data));
%         setAccessToken(data.access_token)
%       }
%       )
%       .catch(error => console.error(error));

%   }
%   function getData(){
%     const options={
%       method:"GET",
%       headers: {
%         'Content-Type': 'application/x-www-form-urlencoded',
%         'Authorization': `Bearer ${accessToken}`
%       }
  
%   }
% fetch("https://localhost:44369/api/language-management/languages/all",options).then((res)=>(console.log(res))).catch(error=>console.log(error))
%   }


%   return (
%     <>
%       <div>
%         <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
%         <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

%         <button onClick={callapiForAuthorization}>Login</button>

%       </div>

%       <div style={{marginTop:'50px'}}>
%         <div>username:{username}</div>
%         <div>password:{password}</div>
%         {result}

%       </div>

%       <div> 
%         get some data from api:
%         <button onClick={getData}> Get the fu*king data</button>
%       </div>
%     </>
%   );
% }

% export default App;
