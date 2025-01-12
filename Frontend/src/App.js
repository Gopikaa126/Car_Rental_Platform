import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserList } from './components/UserList';
import { RegisterComponent } from './components/RegisterComponent';
import { LoginComponent } from './components/LoginComponent';
import RequireAuth from './components/RequireAuth';
import { VehicleList } from './components/VehicleList';
import { ReservationList } from './components/ReservationList';
import { PaymentForm } from './components/PaymentForm';
import { WelcomePage } from './components/WelcomePage';
import { AdminLoginComponent } from './components/AdminLoginComponent';
import { AdminRegisterComponent } from './components/AdminRegisterComponent';
import { AdminVehiclesList } from './components/AdminVehiclesList';
import { AdminUse } from './components/AdminUse';
import { AddVehicles } from './components/AddVehicles';
import { ListReview } from './components/ListReview';
import { AddReview } from './components/AddReview';
import { AdminReservationList } from './components/AdminReservationList';
import { AdminPaymentList } from './components/AdminPaymentList';
import { UserReviewList } from './components/UserReviewList';
import { UserData } from './components/UserData';
import { UpdateUser } from './components/UpdateUser';
import { Congratulations } from './components/Congratulations';
import { MyReservations } from './components/MyReservations';
import { AdminData } from './components/AdminData';
import { UpdateAdmin } from './components/UpdateAdmin';


function App() {
  return (
    <div className="App">

       <BrowserRouter>
       <div className='AppNew'>
        <Routes>
        <Route path="/" element={<WelcomePage/>}/>

        <Route path="/welcome" element={<WelcomePage/>}/>
            {/* Protect routes requiring authentication */}

          <Route element={<RequireAuth/>}>
          <Route path="/userslist" element={<UserList/>} />
          <Route path="/adminvehicleslist" element={<AdminVehiclesList/>} />
          <Route path="/adminuse" element={<AdminUse/>}/>
          <Route path="/addvehicle" element={<AddVehicles/>}/>
          <Route path="/addvehicle/:vehicleId" element={<AddVehicles/>}/>
          <Route path="/reviewlist" element={<ListReview/>}/>
          <Route path="/AddReview/:userId/:vehicleId" element={<AddReview/>}/>
          <Route path="/editreview/:reviewId" element={<AddReview/>}/>
          <Route path='adminreservationlist' element={<AdminReservationList/>}/>
          <Route path='adminpaymentlist' element={<AdminPaymentList/>}/>
          <Route path="/admindata/:adminId" element={<AdminData />} />
          <Route path="/updateadmin/:adminId" element={<UpdateAdmin />} />



          <Route path="/vehicleslist" element={<VehicleList/>}/>
          <Route path="/createreservation/:userId/:vehicleId" element={<ReservationList />} />
          <Route path="/createpayments/:reservationId/:vehicleId/:userId" element={<PaymentForm/>} />
          <Route path="/viewreview/:vehicleId" element={<UserReviewList/>}/>
          <Route path="/userdata/:userId" element={<UserData />} />
          <Route path="/updateuser/:userId" element={<UpdateUser />} />
          <Route path="/congratulations" element={<Congratulations />} />
          <Route path="/myreservations/:userId" element={<MyReservations />} />


          </Route>

          <Route path="/userregister" element={<RegisterComponent/>}/>
          <Route path="/userlogin" element={<LoginComponent/>}/>
          <Route path="/adminregister" element={<AdminRegisterComponent/>}/>
          <Route path="/adminlogin" element={<AdminLoginComponent/>}/>


        </Routes>
        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;
