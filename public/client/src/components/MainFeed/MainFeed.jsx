import firebaseApp from '@config/firebaseApp';
import React, { useCallback,useRef,useState } from 'react'
import { useSelector } from 'react-redux';
import './css/index.css'
import 'firebase/compat/database';

const Fstorage = firebaseApp.storage()

function uploadImageToFirebaseStorage(data,timestamp){
    return new Promise((resolve,reject)=>{
        Fstorage.ref(`feed/timestamp/feed.jpg`)
        .putString(data.split(",")[1],'base64',{
            contentType:'image/jpg'
        }).then(snapshot=>{
            snapshot.ref.getDownloadURL()
                .then(url=>{
                    console.log('이미지 업로드완료')
                    resolve(url)
                })
                .catch((err)=>{reject(err)})
        }).catch(err=>{
            reject(err)
        })
    })
}
function MainFeed() {
    const contextRef = useRef(null)
    const session = useSelector(state=>state.auth.session)
    const [context,setContext] = useState("");
    const [feed_image,setFeed_image] = useState(undefined);
    
    const __makeFeed = useCallback(async(e)=>{
        e.preventDefault()
        if(session&&(context||feed_image)){
            const nowTime = Date.now()
            let downloadUrl = undefined;
            if(feed_image){
                downloadUrl = await uploadImageToFirebaseStorage(feed_image,nowTime)
                                .catch(err=>{console.log(err)})
            }
            const {uid} = session
            let url = '/feed/new';
            await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Allow-Control-Access-Origin':'*',
                },
                body:JSON.stringify({
                    feed:{
                        context,
                        image: downloadUrl,
                        like:0,
                    },
                    profile:{
                        uid
                    },
                    timestamp: nowTime
                })
            })
                .then((res)=>{
                    // console.log("$$MainFeed$$",res.json())
                    return res.json()
                })
                .then((msg)=>{
                    contextRef.current.value = '';
                    setContext(undefined);
                    setFeed_image(undefined)
                    alert(JSON.stringify(msg.msg))
                    // console.log(msg)
                })
                .catch(err=>console.log("fetchErr",err))
        }
    },[context,feed_image,session,contextRef])

    const __getData64FromImage = useCallback((e)=>{
        const filelist = e.target.files[0]
        const reader = new FileReader()
        reader.onload=(e)=>{
            setFeed_image(e.target.result)
        }
        reader.readAsDataURL(filelist)
    },[])

  return (
    <div className='mainfeed'>
      <div className='wrapper'>
        <div className='feed-list'>
            <form className='write-feed' onSubmit={__makeFeed}>
                <div className='profile-image'>
                </div>
                <div className='inp'>
                    <input type='text' placeholder='오늘 무슨 일이 있었나요?'
                    onChange={(e)=>setContext(e.target.value)}
                    ref={contextRef}
                    />
                </div>
                <div className='get-image'>
                    <label htmlFor='get-image-input'>
                        <img src='/assets/main/add-image.svg' alt='이미지 추가하기' />
                    </label>
                    <input id='get-image-input' type='file'
                    onChange={__getData64FromImage}/>
                </div>
            {/* <button type='submit' className='login-btn'>작성하기</button> */}
            </form>
            <div className='feed'>
                <div className='top'>
                    <div className='profile-image'></div>
                    <div className='profile-desc'>
                        <div className='nickname txt-bold'>
                            codename
                        </div>
                        <div className='timestamp'>
                            8:15 pm, yesterday
                        </div>
                    </div>
                </div>
                <div className='contents'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quos id delectus autem officiis laudantium temporibus? Quam, molestias voluptatibus? Maxime aperiam ipsam adipisci ullam illum nihil recusandae obcaecati quidem aspernatur?
                </div>
                <div className='bottom'>
                    <div className='like'>
                        <div className='asset'>
                            <img src='./assets/feed/like-dac.svg' alt='좋아요'/>
                        </div>
                        <div className='count txt-bold'>
                            25k
                        </div>
                    </div>
                    <div className='comment'>
                        <div className='asset'>
                            <img src='./assets/feed/comment.svg' alt='댓글'/>
                        </div>
                        <div className='count txt-bold'>
                            2k
                        </div>
                    </div>
                </div>
            </div>
            <div className='feed'>
                <div className='top'>
                    <div className='profile-image'></div>
                    <div className='profile-desc'>
                        <div className='nickname txt-bold'>
                            codename
                        </div>
                        <div className='timestamp'>
                            8:15 pm, yesterday
                        </div>
                    </div>
                </div>
                <div className='contents'>
                    <div className='image'></div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quos id delectus autem officiis laudantium temporibus? Quam, molestias voluptatibus? Maxime aperiam ipsam adipisci ullam illum nihil recusandae obcaecati quidem aspernatur?
                </div>
                <div className='bottom'>
                    <div className='like'>
                        <div className='asset'>
                            <img src='./assets/feed/like-dac.svg' alt='좋아요'/>
                        </div>
                        <div className='count txt-bold'>
                            25k
                        </div>
                    </div>
                    <div className='comment'>
                        <div className='asset'>
                            <img src='./assets/feed/comment.svg' alt='댓글'/>
                        </div>
                        <div className='count txt-bold'>
                            2k
                        </div>
                    </div>
                </div>
            </div>
            <div className='feed'>
                <div className='top'>
                    <div className='profile-image'></div>
                    <div className='profile-desc'>
                        <div className='nickname txt-bold'>
                            codename
                        </div>
                        <div className='timestamp'>
                            8:15 pm, yesterday
                        </div>
                    </div>
                </div>
                <div className='contents'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quos id delectus autem officiis laudantium temporibus? Quam, molestias voluptatibus? Maxime aperiam ipsam adipisci ullam illum nihil recusandae obcaecati quidem aspernatur?
                </div>
                <div className='bottom'>
                    <div className='like'>
                        <div className='asset'>
                            <img src='./assets/feed/like-dac.svg' alt='좋아요'/>
                        </div>
                        <div className='count txt-bold'>
                            25k
                        </div>
                    </div>
                    <div className='comment'>
                        <div className='asset'>
                            <img src='./assets/feed/comment.svg' alt='댓글'/>
                        </div>
                        <div className='count txt-bold'>
                            2k
                        </div>
                    </div>
                </div>
            </div>
            <div className='feed'>
                <div className='top'>
                    <div className='profile-image'></div>
                    <div className='profile-desc'>
                        <div className='nickname txt-bold'>
                            codename
                        </div>
                        <div className='timestamp'>
                            8:15 pm, yesterday
                        </div>
                    </div>
                </div>
                <div className='contents'>
                    <div className='image'></div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quos id delectus autem officiis laudantium temporibus? Quam, molestias voluptatibus? Maxime aperiam ipsam adipisci ullam illum nihil recusandae obcaecati quidem aspernatur?
                </div>
                <div className='bottom'>
                    <div className='like'>
                        <div className='asset'>
                            <img src='./assets/feed/like-dac.svg' alt='좋아요'/>
                        </div>
                        <div className='count txt-bold'>
                            25k
                        </div>
                    </div>
                    <div className='comment'>
                        <div className='asset'>
                            <img src='./assets/feed/comment.svg' alt='댓글'/>
                        </div>
                        <div className='count txt-bold'>
                            2k
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className='friend-list'>
                <div className='my-profile'>
                    <div className='profile-image'></div>
                    <div className='nickname'>코드네임</div>
                </div>
                <div className='my-friends'>
                    <div className='title txt-bold'>
                        나의친구
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
  )
}

export default MainFeed