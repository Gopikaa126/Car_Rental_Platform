import React, { useContext, useEffect, useState } from 'react';
 // Assuming you have a ReviewService for API calls
import { Link, useNavigate } from 'react-router-dom';
import ReviewsService from '../services/ReviewsService';
import AuthContext from '../context/Authprovider';
import { Button } from 'react-bootstrap';


export const ListReview = () => {
  const [reviews, setReviews] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const navigate = useNavigate();
  const{auth}=useContext(AuthContext)


  useEffect(() => {
    console.log("useEffect hook invoked");
    ReviewsService.getReviewsByUserID().then((response) => {
      console.log("Response received from API", response.data);
      setReviews(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [deleteStatus]);

  useEffect(()=>{
    console.log("useEffect invoked....")
    console.log("auth.accessToken")
    ReviewsService.getallreviews(auth.accessToken).then((response)=>{
        console.log("response from getallreviews API.....",response.data)
        setReviews(response.data)
    }).catch((error)=>{console.log("error from API ",error)})
},[])

  return (
    <div style={{ backgroundColor: "#b8c7c7",height: "300vh",padding: "20px" }}>

    <div className='container'>
      {console.log("App rendered")}
      <h2 className='text-center'>Reviews</h2>
      <table className='table table-bordered table-striped table-hover'>
        <thead>
          <tr>
            <th>Review ID</th>
            <th>User ID</th>
            <th>Vehicle ID</th>
            <th>Rating</th>
            <th>Review Text</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, key) => (
            <tr key={key}>
              <td>{review.reviewId}</td>
              <td>{review.user.userId}</td>
              <td>{review.vehicle.vehicleId}</td>
              <td>{review.rating}</td>
              <td>{review.reviewText}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="dark" onClick={() => navigate("/adminuse")}>
        Back
      </Button>
    </div>
    </div>
  );
};
