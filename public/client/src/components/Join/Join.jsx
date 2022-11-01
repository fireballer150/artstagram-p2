import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layouts';
import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './css/index.css'
function Join() {
    const dispatch = useDispatch()
    const nicknames = useSelector(state=> state.config.service.nicknames)
    const [email,setEmail] = useState(undefined);
    const [password,setPassword] = useState(undefined);
    const [nickname,setNickname] = useState(undefined);
    const [isNicknameExist,setIsNicknameExist] = useState(false);
    const history = useHistory();

    const __createUser = useCallback(()=>{
        if(email&&nickname&&!isNicknameExist&&password&&password.length>=8){
            let url = '/user/new'

            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Allow-Control-Access-Origin':'*'
                },
                body:JSON.stringify({
                    email,
                    password,
                    nickname
                })
            })
                .then((res)=>res.json())
                .then(({msg})=>{
                    console.log("msg",msg)
                    history.push("/")
                })
                .catch(err=>console.log("fetchErr",err))
        }else{
            alert('조건에 부합하지 않습니다.')
        }
    },[email,password,nickname,history,isNicknameExist])
    const __checkNickname = useCallback(()=>{
        if(nicknames.indexOf(nickname) !== -1){
            // console.log('닉네임이 존재합니다.')
            setIsNicknameExist(true)
        }else{
            // console.log('닉네임이 존재하지않습니다.')
            setIsNicknameExist(false)
        }
    },[nicknames,nickname])

    useEffect(()=>{
       __checkNickname()
        return ()=>{

        }
    },[__checkNickname])

    useEffect(()=>{
        dispatch({
            type:__UPDATE_HEADER_STATE__,
            payload:false
        })
    },[dispatch])
  return (
    <div className='join'>
        <div className='wrapper'>
            <div className='logo'>
                <img src='./assets/welcome/logo.svg' alt='로고' />
            </div>
            <form className='join-contents' onSubmit={(e)=>{
                e.preventDefault()
                __createUser()
            }}>
            <div className='email-inp custom-inp'>
               <div className='top'>
                    <div className='title txt-bold'>이메일</div>
                    <div className='warning'></div>
               </div>
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
               <div className='top'>
                    <div className='title txt-bold'>비밀번호</div>
                    <div className='warning'>
                        {password && password.length<8 && '비밀번호는 8자리 이상이여야 합니다.'}
                    </div>
               </div>
                    <div className='inp'>
                        <input 
                        type='password' 
                        required 
                        placeholder='비밀번호를 8자리 이상 입력해주세요'
                        onChange={(e)=>setPassword(e.target.value)}
                        ></input>
                    </div>
            </div>
            <div className='nickname-inp custom-inp'>
               <div className='top'>
                    <div className='title txt-bold'>닉네임</div>
                    <div className='warning'>
                        {isNicknameExist&&"이미 사용하고 있는 닉네임입니다."}
                    </div>
               </div>
                    <div className='inp'>
                        <input 
                        type='text' 
                        required 
                        placeholder='닉네임을 입력해주세요'
                        onChange={(e)=>setNickname(e.target.value)}
                        ></input>
                    </div>
            </div>
            <button type='submit' className='join-btn'>회원가입하기</button>
            </form>
        </div>
    </div>
  )
}

export default Join
