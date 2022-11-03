import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@styles/core.css';
// import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Join from './Join/Join';
import MainFeed from './MainFeed/MainFeed';
import Header from './Header/Header';
import Detail from './Detail/Detail';
import Profile from './Profile/Profile';
import { useCallback } from 'react';
import { useEffect } from 'react';
import firebaseApp from '@config/firebaseApp';
import { useDispatch,useSelector } from 'react-redux';
import { __NICKNAME_SERVICE_UPDATE__ } from '@dispatchers/config';
import { __UPDATE_SESSION__ } from '@dispatchers/auth';
import { __UPDATE_HEADER_STATE__ } from '@dispatchers/layouts';

const Fdatabase = firebaseApp.database();
const Fauth = firebaseApp.auth()
function App() {
  const dispatch = useDispatch()
  const isHeaderOpen = useSelector(state=>state.layouts.isHeaderOpen)
  const __getNicknames = useCallback(()=>{
    const nicknameRef = Fdatabase.ref('statics/nicknames')
    nicknameRef.on("value",snapshot=>{
      if(snapshot.exists()){
        //데이터가 존재할때는 리덕스상태로 업데이트
        dispatch({
          type:__NICKNAME_SERVICE_UPDATE__,
          payload: Object.values(snapshot.val())
        })
      }else{
        //데어터가 없을때
        dispatch({
          type:__NICKNAME_SERVICE_UPDATE__,
          payload: []
        })
      }
      return nicknameRef
    })
  },[dispatch])

  useEffect(()=>{
    const nicknameRef = __getNicknames();
    return ()=>{
      nicknameRef.off()
    }
  },[__getNicknames])

  useEffect(()=>{
    Fauth.onAuthStateChanged((users)=>{
      const {uid,displayname,email} = users
      console.log("users$$$$$$$$$$",users)
      if(users){
        dispatch({
          type:__UPDATE_HEADER_STATE__,
          payload:true
        })
        dispatch({
          type: __UPDATE_SESSION__,
          payload: {
            uid,displayname,email
          }
        })
      }else{
        dispatch({
          type: __UPDATE_SESSION__,
          payload: undefined
        })
      }
    })
  },[dispatch])


  return (
    <Router>
      {isHeaderOpen && <Header />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join}></Route>
        <Route path="/feed" exact component={MainFeed}></Route>
        <Route path="/profile" exact component={Profile}></Route>
      </Switch>
      {false && <Detail></Detail>}
    </Router>
  );
}

export default App;
