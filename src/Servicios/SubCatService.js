import axios from 'axios';

const SUBCAT_API_BASE_URL = "http://localhost:8081/api/subCat";

class EmployeeService {

    getSubCats(){
        return axios.get(SUBCAT_API_BASE_URL);
    }

    createSubCat(subCat){
        return axios.post(SUBCAT_API_BASE_URL, subCat);
    }

    getSubCatById(subCatId){
        return axios.get(SUBCAT_API_BASE_URL + '/' + subCatId);
    }

    updateSubCat(subCat, subCatId){
        return axios.put(SUBCAT_API_BASE_URL + '/' + subCatId, subCat);
    }

    deleteSubCat(subCatId){
        return axios.delete(SUBCAT_API_BASE_URL + '/' + subCatId);
    }
}

export default new EmployeeService()