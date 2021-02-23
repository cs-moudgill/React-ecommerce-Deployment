import { API } from '../../backend';

function getAllProducts() {
    return fetch(`${API}/products`,{
        method:'GET'
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err)=>{
        console.log(err);
    })
}

export default getAllProducts;
