import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../../components/molecules/NavBar';

import { AppDispatch, RootState } from '../../store';
import { fetchGetCommentList, IComments } from '../../store/future/commentSlice';

function UserStories() {
  const dispatch = useDispatch<AppDispatch>();

  // Use selector to get the state
  const { comments, loading, error, page, size } = useSelector((state: RootState) => state.comment);
  const isFetching = useRef(false);

  // Debounce page changes to avoid excessive fetches
  useEffect(() => {
    if (!isFetching.current && !loading) {
      isFetching.current = true;
      dispatch(fetchGetCommentList({ page, size }))
        .then(() => isFetching.current = false)
        .catch(() => isFetching.current = false);
    }
  }, [dispatch, page, size, loading]);

  return (
    <>
    <div className="row">
      <NavBar />
    </div>
  
    
      <div className="row mt-5">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {comments.length === 0 && !loading && <p>No comments available</p>}
        <div className="col-12 mt-5" >
          <div className="row justify-content-start ">
            {comments.map((comment, index) => (
              <div className="col-md-6 col-lg-4 mt-5 " key={index}> {/* col-lg-4 ile geniş ekranlarda 3 kart yan yana, col-md-6 ile daha küçük ekranlarda 2 kart */}
                <div className="card h-100 " >
                  <img src={comment.companyManagerAvatar || "https://via.placeholder.com/150"} className="card-img-top" alt="Manager Avatar" />
                  <div className="card-body">
                    <h5 className="card-title">{comment.companyName}</h5>
                    <p className="card-text">{comment.content}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{comment.companyManagerFirstName} - {comment.companyName}</li>
                    <li className="list-group-item">{"Personel Müdürü"}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  </>
  
  
  );
}

export default UserStories;
