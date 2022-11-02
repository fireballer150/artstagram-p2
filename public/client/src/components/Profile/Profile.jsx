import firebaseApp from '@config/firebaseApp'
import React from 'react'
import { useEffect } from 'react'
import { useState,useCallback } from 'react'
import { useSelector } from 'react-redux'
import './css/index.css'

const Fdatabase = firebaseApp.database()
const Fstorage = firebaseApp.storage()
function Profile() {
    const [userImage,setUserImage] = useState(undefined)
    const [quote,setQuote] = useState(undefined)
    const session = useSelector(state=>state.auth.session)

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
                        // console.log("snapshotgetdownloadurl",url)
                        setUserImage(()=>url)
                        __uploadImageUrlToDatabase(uid,url)
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    },[session])

    const __getImage = useCallback((e)=>{
        const filelist = e.target.files[0]
        console.log("filelist",filelist)
        const reader = new FileReader()
        reader.onload = (e)=>{
            // console.log("etargetImage",e.target.result)//base64 type source
            // setUserImage(()=>e.target.result)
            // console.log("Image",userImage)
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

    
    useEffect(()=>{
        if(session){
            const {image} = session
            // console.log("useEffectimage",image)
            if(image){
                // setUserImage(()=>image)
                // console.log(image)
            }else{setUserImage(undefined)}
        }
        return ()=>{}
    },[session])
    
    // useEffect(()=>{
    //     if(session){
    //         const {image} = session
    //         // console.log("useEffectimage",image)
    //         if(image){
    //             setUserImage(()=>image)
    //             console.log(image)
    //         }else{setUserImage(undefined)}
    //     }
    //     return ()=>{}
    // },[session])


    // const __uploadImageToStorage = useCallback(async(data)=>{
    //     if(session){
    //         const {uid} = session;
    //         await Fstorage.ref(`users/${uid}/profile.jpg`).putString(data.split(",")[1],'base64',{
    //             contentType:'image/jpg'
    //         }).then((snapshot)=>{
    //             snapshot.ref.getDownloadURL().then((url)=>{
    //                 alert('프로필 사진을 url로 업로드 했습니다.')
    //                 console.log("snapshotgetdownloadurl",url)
    //             }).catch(err=>console.log(err))
    //         }).catch(err=>console.log(err))
    //     }
    // },[session])

    // const __getImage = useCallback((e)=>{
    //     const filelist = e.target.files[0]
    //     console.log("filelist",filelist)
    //     const reader = new FileReader()
    //     reader.onload = (e)=>{
    //         // console.log("etargetImage",e.target.result)//base64 type source
    //         setUserImage(()=>e.target.result)
    //         // console.log("Image",userImage)
    //         __uploadImageToStorage(e.target.result)
    //     }
    //     reader.readAsDataURL(filelist)
        
    // },[__uploadImageToStorage])

    // const __onSubmit = useCallback((e)=>{
    //     e.preventDefault()
    //     if(session&&quote){
    //         const {uid} = session
    //         Fdatabase.ref(`users/${uid}/profile/quote`).set(quote)
    //             .then(()=>{
    //                 alert('한줄평이 변경되었습니다.')
    //             })
    //             .catch(err=>{console.log(err)})
    //     }
    //     console.log("submit!")
    // },[session,quote])
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
                        <textarea defaultValue={session? session.quote:undefined} 
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
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLG3yqTeZwD5zGhULfn0bDqMjhaBPBLUXj-A&usqp=CAU' alt='' />
                </div>
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvbuFlaLcHBvBbA7faxcix1kzm1nu88A81Q&usqp=CAU' alt='' />
                </div>
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSe_p6Z2V3cyoilJmvdDKf7IOMIEZhutZWZQ&usqp=CAU' alt='' />
                </div>
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAZiDugxvHYbgy20RP6yOnjQG240R7WtThOg&usqp=CAU' alt='' />
                </div>
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWIrSSEyd03qjz0fpuQcAI8TVqmmhejgKxA&usqp=CAU' alt='' />
                </div>
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa49FbiR-ce63WvbuCw0sPMJz2bg2dCj7fiA&usqp=CAU' alt='' />
                </div>
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRFUR6CMpA6Dqxx-SEaYdTUUSwEBWBJgSCqA&usqp=CAU' alt='' />
                </div>
                <div className='feed-image'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR16d1a1SaIVQNMS7QQbBKsHF5RyHtQzGIhQ&usqp=CAU' alt='' />
                </div>
            </div>
            <div className='profile-contents'>
                <div className='feed-list'>
                    <div className='title txt-bold'>작성한 글</div>
                    <div className='feeds'>
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
                </div>
                <div className='profile-info-desc'>
                    <div className='desc'>
                        <div className='title txt-bold'>좋아요</div>
                        <div className='count'>739,000</div>
                    </div>
                    <div className='desc'>
                        <div className='title txt-bold'>팔로워</div>
                        <div className='count'>2,539,000</div>
                    </div>
                    <div className='desc'>
                        <div className='title txt-bold'>포스트</div>
                        <div className='count'>320</div>
                    </div>
                    <div className='desc'>
                        <div className='title txt-bold'>친구</div>
                        <div className='count'>236,320</div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
