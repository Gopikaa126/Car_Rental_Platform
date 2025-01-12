import axios from "axios"

const BASE_URL="http://localhost:8080/vehicleapi/v1"

class VehiclesService{

    createvehicle(vehicle,token){
        return axios({
            method: 'post',
            url: BASE_URL+"/createvehicle",
            data: vehicle,       // Include the object in the request
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    updatevehicle(id,vehicle,token){
        return axios({
            method: 'put',
            url: BASE_URL+'/updatevehicle/'+id,
            data: vehicle,       // Include the object in the request
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    getVehicldById(id,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getVehicldById/"+id,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getVehicldByStatus(status,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getVehicldByStatus/"+status,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getallVehicles(token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getallVehicles",
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    deletevehiclebyId(vehicleId,token){
        return axios({
            method: 'delete',
            url: BASE_URL + "/deletevehiclebyId/" + vehicleId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    getVehicldBymake(make,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getVehicldByMake/"+make,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getVehicldBymodel(model,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getVehicldBymodel/"+model,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getVehicldBylocation(location,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getVehicldBylocation/"+location,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getVehicldBycapacity(capacity,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getVehicldBycapacity/"+capacity,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getVehicldBypricePerDay(pricePerDay,token){
        return axios({
            method: 'get',
            url: BASE_URL+"/getVehicldBypricePerDay/"+pricePerDay,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateVehicleStatus(id,vehicle,token){
        return axios({
            method: 'put',
            url: BASE_URL+'/updateVehicleStatus/'+id,
            data:vehicle,       // Include the object in the request
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

}
export default new VehiclesService();