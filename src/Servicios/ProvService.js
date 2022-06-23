import axios from 'axios';

const PROV_API = "http://localhost:8081/api/prov";
class ProvService{

    getProvs(){
        return axios.get(PROV_API);
    }
    createProv(proveedor){
        return axios.post(PROV_API, proveedor);
    }
    getProvById(provId){
        return axios.get(PROV_API + '/' + provId);
    }

    updateProv(prov, provId){
        return axios.put(PROV_API + '/' + provId, prov);
    }

    deleteProv(provId){
        return axios.delete(PROV_API + '/' + provId);
    }
}

export default new ProvService()