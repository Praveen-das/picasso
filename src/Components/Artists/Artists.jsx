import React from 'react'
import './artists.css'
import member1 from '../../Assets/Members/Member1.jpg'
import member2 from '../../Assets/Members/Member2.jpg'
import member3 from '../../Assets/Members/Member3.jpg'
import member4 from '../../Assets/Members/Member4.jpg'

function Artists() {
    return (
        <>
            <div className="artists">
                <label htmlFor="">MEET OUR TOP ARTISTS</label>
                <hr />
                <div className="artists-container">
                    <div className="artists-card zoom">
                        <img className='members' src={member1} alt="" />
                        <label htmlFor="">John doe</label>
                    </div>
                    <div className="artists-card zoom">
                        <img className='members' src={member2} alt="" />
                        <label htmlFor="">Jamini Roy</label>
                    </div>
                    <div className="artists-card zoom">
                        <img className='members' src={member3} alt="" />
                        <label htmlFor="">Frederic Church</label>
                    </div>
                    <div className="artists-card zoom">
                        <img className='members' src={member4} alt="" />
                        <label htmlFor="">Mary Cassatt</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Artists
