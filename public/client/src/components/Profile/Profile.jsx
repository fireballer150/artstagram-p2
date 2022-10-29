import React from 'react'
import './css/index.css'

function Profile() {
  return (
    <div className='profile'>
        <div className='wrapper'>
            <div className='info'>
                <div className='profile-image'>

                </div>
                <div className='profile-desc'>
                    <div className='nickname txt-bold'>
                        codename
                    </div>
                    {false?
                    <div className='quote'>
                        <textarea placeholder='자신의 한줄평을 입력해주세요.'></textarea>
                    </div>:
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
