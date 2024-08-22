import React from 'react'
import userImg from '../../img/7309683.jpg'
function Storycard({ companyName = '', companyManagerName = '', companyManagerTitle = '', avatar = '', content = '' }) {
  

  
  return (
    <>
        <div className="card" > {/* h-100 sınıfı ile kartların yüksekliklerini eşitleyebiliriz */}
  <img src={avatar} className="card-img-top" alt="Manager Avatar" />
  <div className="card-body">
    <h5 className="card-title">{companyName}</h5>
    <p className="card-text">{content}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">{companyManagerName} - {companyName}</li>
    <li className="list-group-item">{companyManagerTitle}</li>
  </ul>
</div>
    </>
  )
}

export default Storycard