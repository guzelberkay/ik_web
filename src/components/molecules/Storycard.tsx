import React from 'react'
import userImg from '../../img/7309683.jpg'
function Storycard() {
  return (
    <>
        <div className="card" style={{width: '18rem'}}>
              <img src={userImg} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">ER Software Solutions</h5>
                <p className="card-text">Aylardır şirketimiz bünyesinde kullanıyoruz. Mükemmel bir uygulama. Yapanlar çok profesyonel.</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Salih Ertuğrul ER - ER Software Solutions</li>
                <li className="list-group-item">Personel Müdürü</li>
              </ul>
        </div>
    </>
  )
}

export default Storycard