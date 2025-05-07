import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/user/register`, {
          email,
          name,
          password,
        });
        if(response.data.success){
          setToken(response.data.success)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      } else {
        // handle login logic here
        const response = await axios.post(backendUrl+ '/user/login',{
          email,
          password
        })

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response?.data?.message)
        }
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong")

    }
  };


  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
  
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] m-auto mt-14 text-gray-800 gap-4">
      <div className="inline-flex items-center gap-2 mb-4 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState !== 'Login' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-[80%] max-w-sm px-3 py-2 border border-gray-800 rounded"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-[80%] max-w-sm px-3 py-2 border border-gray-800 rounded"
        placeholder="Email"
        required
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-[80%] max-w-sm px-3 py-2 border border-gray-800 rounded"
        placeholder="Password"
        required
      />

      <div className="w-[80%] max-w-sm flex justify-between text-sm text-gray-800">
        <p className="cursor-pointer hover:underline">Forgot Your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:underline">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:underline">
            Login Here
          </p>
        )}
      </div>

      <div>
        <button type='submit' className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Login;
