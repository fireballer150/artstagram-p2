import firebaseApp from '@config/firebaseApp';
import { __UPDATE_SESSION__ } from '@dispatchers/auth';
import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layouts';
import React from 'react'
import { useCallback,useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './css/index.css'

const Fauth = firebaseApp.auth();

function Login() {
    const dispatch = useDispatch()
    const history = useHistory();
    const [email,setEmail] = useState(undefined);
    const [password,setPassword] = useState(undefined);
    const __doLogin = useCallback((e)=>{
        e.preventDefault();
        // console.log("$$$$$$$$$$$$$$$$$email",email,password)
        Fauth.signInWithEmailAndPassword(email,password)
        .then((credential)=>{
            // const {user:{uid,displayName,email}} = credential;
            // console.log("$$$$LoginComponent",displayName)
            // dispatch({
            //     type:__UPDATE_SESSION__,
            //     payload:{uid,displayName,email}
            // })

            // dispatch({
            //     type:__UPDATE_HEADER_STATE__,
            //     payload:true
            // })
            history.push("/feed")
        })
        .catch((err)=>{
            console.log(err)
        })
        },[email,password,history])

        const __goJoin = useCallback(()=>{
        history.push('/join')
        },[history])

        useEffect(()=>{
            dispatch({
                type:__UPDATE_HEADER_STATE__,
                payload:false
            })
        },[dispatch])

  return (
    <div className='login'>
      <div className='wrapper'>
        <div className='logo'>
            <img src='/assets/welcome/logo.svg' alt='로고'></img>
        </div>
        <form className='login-contents' onSubmit={__doLogin}>
            <div className='email-inp custom-inp'>
                <div className='title txt-bold'>이메일</div>
                <div className='inp'>
                    <input 
                    type='email' 
                    required 
                    placeholder='이메일을 입력해주세요'
                    onBlur={(e)=>setEmail(e.target.value)}
                    ></input>
                </div>
            </div>
            <div className='password-inp custom-inp'>
                <div className='title txt-bold'>비밀번호</div>
                <div className='inp'>
                    <input 
                    type='password' 
                    required 
                    placeholder='비밀번호를 입력해주세요'
                    onBlur={(e)=>setPassword(e.target.value)}
                    ></input>
                </div>
            </div>
            <button type='submit' className='login-btn'>로그인하기</button>
        </form>
        <div className='go-join' onClick={__goJoin}>
            <div className='title txt-bold'>
                또는 회원가입하기
            </div>
            <div className='asset'>
                <img src='/assets/welcome/arrow.svg' alt='회원가입하기' />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
