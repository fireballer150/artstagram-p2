import React, { useCallback } from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

function Feed(res) {
    const {feed:{like,comment,context,image},
            profile:{uid},
            timestamp
    }= res.data
    const session = useSelector(state=>state.auth.session)
    const [userImage,setUserImage] = useState(undefined)

    const __getUserProfileFromServer = useCallback(async()=>{
        if(session){
            const {uid} = session
            
            let url = '/user/profile/image'

            await fetch(url,{
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

    useEffect(()=>{
        __getUserProfileFromServer()
        return ()=>{}
    },[__getUserProfileFromServer])
  return (
    <div className='feed'>
        <div className='top'>
            <div className='profile-image' style={userImage &&{backgroundImage:`url(${userImage})`}}></div>
            <div className='profile-desc'>
                <div className='nickname txt-bold'>
                    {session ? session.displayName:"codename"}
                </div>
                <div className='timestamp'>
                    8:15 pm, yesterday
                </div>
            </div>
        </div>
        <div className='contents'>
            {context}
            {image && 
            <div className='image'
                style={{backgroundImage:`url(${image})`}}></div>
            }
        </div>
        <div className='bottom'>
            <div className='like'>
                <div className='asset'>
                    <img src='./assets/feed/like-dac.svg' alt='좋아요'/>
                </div>
                <div className='count txt-bold'>
                    {like? '100':0}
                </div>
            </div>
            <div className='comment'>
                <div className='asset'>
                    <img src='./assets/feed/comment.svg' alt='댓글'/>
                </div>
                <div className='count txt-bold'>
                    {comment ? '100':0}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Feed