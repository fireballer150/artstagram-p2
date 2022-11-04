import firebaseApp from '@config/firebaseApp'
import React from 'react'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import { useSelector } from 'react-redux'
import Feed from '../Feed/Feed'
import './css/index.css'

const Fdatabase = firebaseApp.database()
const Fstorage = firebaseApp.storage()
function Profile() {
    const [userImage,setUserImage] = useState(undefined)
    const [quote,setQuote] = useState(undefined)
    const [feeds,setFeeds] = useState([])
    const [likeCount,setLikeCount] = useState(0);
    const session = useSelector(state=>state.auth.session)
    // console.log("$$$$$$$$$$session",session)
    const __uploadImageUrlToDatabase = useCallback(async(uid,url)=>{
        await Fdatabase.ref(`users/${uid}/profile/image`).set(url)
            .then(()=>{
                alert('프로필 사진을 url로 업로드 했습니다.')
            }).catch(err=>{console.log(err)})
    },[])
    const __uploadImageToStorage = useCallback(async(data)=>{
        if(session){
            const {uid} = session;
            await Fstorage.ref(`users/${uid}/profile.jpg`)
                .putString(data.split(",")[1],'base64',{
                contentType:'image/jpg'
                })
                .then((snapshot)=>{
                    snapshot.ref.getDownloadURL().then((url)=>{
                        setUserImage(url)
                        __uploadImageUrlToDatabase(uid,url)
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    },[session,__uploadImageUrlToDatabase])

    const __getImage = useCallback((e)=>{
        const filelist = e.target.files[0]
        console.log("filelist",filelist)
        const reader = new FileReader()
        reader.onload = (e)=>{
            __uploadImageToStorage(e.target.result)
        }
        reader.readAsDataURL(filelist)

    },[__uploadImageToStorage])

    const __onSubmit = useCallback((e)=>{
        e.preventDefault()
        if(session&&quote){
            const {uid} = session
            Fdatabase.ref(`users/${uid}/profile/quote`).set(quote)
                .then(()=>{
                    alert('한줄평이 변경되었습니다.')
                })
                .catch(err=>{console.log(err)})
        }
        console.log("submit!")
    },[session,quote])

    const __getUserProfileFromServer = useCallback(()=>{
        if(session){
            const {uid} = session
            let url = '/user/profile/image'

            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Allow-Control-Access-Origin':'*',
                },
                body:JSON.stringify({
                 uid
                })
            })
            .then((res)=>
                res.json()
            )
            .then(({image})=>{
                setUserImage(image)
            })
            .catch(err=>{console.log(err)})
        }
    },[session])

    const __getUserQuoteFromServer = useCallback(()=>{
        if(session){
            const {uid} = session
            console.log("$$$$$$$$uid",uid)
            let url = '/user/profile/quote'

            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Allow-Control-Access-Origin':'*',
                },
                body:JSON.stringify({
                 uid
                })
            })
            .then((res)=>res.json())
            .then(({quote})=>{
                setQuote(quote)
            })
            .catch(err=>{console.log(err)})
        }
    },[session])
    
    const __getUserFeed = useCallback(()=>{
        if(session){
        const {uid} =session
        let url = '/user/feed'

            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Allow-Control-Access-Origin':'*',
                },
                body:JSON.stringify({
                uid
                })
            })
            .then((res)=>res.json())
            .then(({feed,msg})=>{
                const totalLikeCount = feed.reduce((prev,next)=>{
                    return prev+next.feed.like
                },0)
                setLikeCount(totalLikeCount)
                // console.log("받아온 피드",feed)
                setFeeds(feed.reverse())
            })
            .catch(err=>{console.log(err)})
    }
        }
    ,[session])

    useEffect(()=>{
      __getUserProfileFromServer()
      __getUserQuoteFromServer()
      __getUserFeed()
        return ()=>{}
    },[__getUserProfileFromServer,__getUserQuoteFromServer,__getUserFeed])
    
    return (
    <div className='profile'>
        <div className='wrapper'>
            <div className='info'>
                <div className='profile-image' style={userImage && {backgroundImage : `url(${userImage})`}}>
                    {true && <input type='file' onChange={__getImage}/>}
                </div>
                <div className='profile-desc'>
                    <div className='nickname txt-bold'>
                        {session ? session.displayName:"codename"}
                    </div>
                    {true?
                    <form className='quote' onSubmit={__onSubmit}>
                        <textarea defaultValue={quote} 
                            placeholder='자신의 한줄평을 입력해주세요.'
                            onBlur={(e)=>setQuote(e.target.value)}
                        ></textarea>
                        <button type='Submit' className='follow-btn txt-bold' >저장하기</button>
                    </form>
                    :
                    <>
                    <div className='quote'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quisquam nihil illo
                    </div>
                    <div className='follow-btn txt-bold' >팔로우하기</div>
                    </>
                    }
                </div>
            </div>
            <div className='feed-images'>
                    {feeds.filter(i=>i.feed.image).map((item,idx)=>{
                        console.log(item)
                        const {feed:{image}} = item;
                        return (
                            <div className='feed-image' key={idx}>
                                <img src={image} alt='피드 이미지' />
                            </div>
                        )
                    })}
            </div>
            <div className='profile-contents'>
                <div className='feed-list'>
                    <div className='title txt-bold'>작성한 글</div>
                    <div className='feeds'>
                        {feeds.map((item,idx)=>{
                            return <Feed data={item} key={idx} />
                        })}
                    </div>
                </div>
                <div className='profile-info-desc'>
                    <div className='desc'>
                        <div className='title txt-bold'>좋아요</div>
                        <div className='count'>{likeCount}</div>
                    </div>
                    <div className='desc'>
                        <div className='title txt-bold'>팔로워</div>
                        <div className='count'>0</div>
                    </div>
                    <div className='desc'>
                        <div className='title txt-bold'>포스트</div>
                        <div className='count'>{feeds.length}</div>
                    </div>
                    <div className='desc'>
                        <div className='title txt-bold'>친구</div>
                        <div className='count'>0</div>
                    </div>

                    <div className='my-friends'>
                    <div className='title txt-bold'>
                        추천친구
                    </div>
                    <ul className='friend-list-wrapper'>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname txt-bold'>
                                cutterballer
                            </div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname txt-bold'>
                                cutterballer
                            </div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname txt-bold'>
                                cutterballer
                            </div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname txt-bold'>
                                cutterballer
                            </div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname txt-bold'>
                                cutterballer
                            </div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname txt-bold'>
                                cutterballer
                            </div>
                        </li>
                        <li className='friend'>
                            <div className='profile-image'></div>
                            <div className='nickname txt-bold'>
                                cutterballer
                            </div>
                        </li>
                    </ul>
                </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
