import axios from "axios"

const BASE_URL="http://localhost:8080/paymentsapi/v1"

class PaymentService{

    createpayments(reservationId,vehicleId,userId,payment,token){
        return axios({
            method: 'post',
            url: BASE_URL+"/createpayments/"+reservationId+"/"+vehicleId+"/"+userId,
            data: payment,       // Include the object in the request
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findByPaymentsByReservationId(reservationId,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/findByPaymentsByReservationId/"+reservationId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    findByPaymentId(paymentId,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/findByPaymentId/"+paymentId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    findpaymentsByUserId(userId,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/findpaymentsByUserId/"+userId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    getallpayments(token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getallpayments",
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    findpaymentsByreservationIdvehicleId(reservationId,vehicleId,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/findpaymentsByreservationIdvehicleId/"+reservationId+"/"+vehicleId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

}

export default new PaymentService();