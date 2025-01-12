import React, { useContext, useEffect, useState } from 'react';
import ReviewsService from '../services/ReviewsService'; // Assuming you have a ReviewService for API calls
import { useNavigate, Link, useParams } from 'react-router-dom';
import AuthContext from '../context/Authprovider';
import { Button } from 'react-bootstrap';

export const AddReview = () => {
  const [userId, setUserId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();
  const { reviewId } = useParams(); 
  const { auth } = useContext(AuthContext);
  const { userId: userIdparam, vehicleId: vehicleIdparam } = useParams(); 

  useEffect(() => {
    // Set userId and vehicleId from URL parameters when the component mounts
    if (userIdparam && vehicleIdparam) {
      setUserId(userIdparam);
      setVehicleId(vehicleIdparam);
    }
  }, [userIdparam, vehicleIdparam]);


  const saveReview = (e) => {
    e.preventDefault();
    const obj = { userId, vehicleId, rating, reviewText };
    ReviewsService.createReviews(userId,vehicleId,obj, auth.accessToken).then((res) => {
      console.log("Response Received From API", res.data);
      navigate("/myreservations/"+auth.userId); 
    }).catch((error) => {
      console.log("Error found", error);
    });
  };

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "100vh", padding: "20px" }}>
      <div className='container'>
        <h2 className='text-center'>Add Review</h2>
        <div className='card col-md-6 offset-md-3'>
          <div className='card-body'>
            <form>

              <div className='form-group mb-2'>
                <label className='form-label'>User ID</label>
                <input 
                  type="text" 
                  className='form-control' 
                  value={userId} 
                  readOnly /> 
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Car ID</label>
                <input 
                  type="text" 
                  className='form-control' 
                  value={vehicleId} 
                  readOnly /> 
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Rating</label>
                <input 
                  type='number' 
                  placeholder='Enter Rating (1-5)' 
                  className='form-control' 
                  value={rating} 
                  name='rating' 
                  onChange={(e) => setRating(e.target.value)} 
                  min="1" max="5" />
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Review Text</label>
                <textarea 
                  placeholder='Enter your review' 
                  className='form-control' 
                  value={reviewText} 
                  name='reviewText'
                  onChange={(e) => setReviewText(e.target.value)} />
              </div>

              <button className='btn btn-success' onClick={(e) => saveReview(e)}>Save</button>

              <Button style={{ position:"absolute",left:"20%",top:"87%" }}className='btn btn-danger' onClick={() => navigate("/myreservations/" + auth.userId)}> Cancel </Button> 

              </form>
          </div>
        </div>
      </div>
    </div>
  );
};
