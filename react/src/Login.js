import React, { useContext, useState } from 'react';
import { CommonContext } from './CommonContext';

function Login() {
  const [username, setUsername] = useState("");

  const login = e => {
    e.preventDefault();
    setIsLoading(true);
    connect(username);
  }

  const {
    connect,
    isLoading, setIsLoading
  } = useContext(CommonContext);

  return (
    <div className="h-[100vh] flex justify-center items-center bg-blue-50">
      <form onSubmit={login} className="px-4 ms:px-0 w-full flex flex-wrap justify-center gap-2">
        <div className="w-full ms:w-auto">
          <input type="text" disabled={isLoading} value={username} onChange={e => setUsername(e.target.value)} className="w-full px-6 py-2 rounded-full outline outline-1 text-slate-600 outline-green-400" placeholder="Username" />
        </div>
        <div className="w-full ms:w-auto">
          {
            isLoading ?
              <button type="submit" className="w-full px-6 py-2 italic rounded-full opacity-60 text-white bg-green-800">Login...</button> :
              <button type="submit" className="w-full px-6 py-2 rounded-full text-white bg-green-600">Login</button>
          }
        </div>
      </form>
    </div>
  );
}

export default Login;
