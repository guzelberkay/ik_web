import React from 'react'
import NavBar from '../../components/molecules/NavBar'
import Storycard from '../../components/molecules/Storycard'

function UserStories() {
  return (
    <>
      <div className="row">
        <NavBar />
      </div>
    
      <div className="row justify-content-center mt-5">
        <div className="col-6 mt-5">
          <div className="row mt-5">
            <div className="col-4 mt-2">
              <Storycard />
            </div>
            <div className="col-4 mt-2">
              <Storycard />
            </div>
            <div className="col-4 mt-2">
              <Storycard />
            </div>
            <div className="col-4 mt-2">
              <Storycard />
            </div>
            <div className="col-4 mt-2">
              <Storycard />
            </div>
            <div className="col-4 mt-2">
              <Storycard />
            </div>
            <div className="col-4 mt-2">
              <Storycard />
            </div>
          </div>
        </div>
      </div>
    
    
    
    </>
  )
}

export default UserStories