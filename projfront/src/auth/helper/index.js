import {API} from '../../backend'

//fetch operation starts here---
export const signup=(user)=>{
return fetch(`${API}/signup`,{
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify(user)
})
.then((response)=>{
    return response.json();
})
.catch(err=>console.log(err));
};

export const signin=(user)=>{   //user : email & password.
    return fetch(`${API}/signin`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(user)
    })
    .then((response)=>{
        return response.json();
    })
    .catch(err=>console.log(err));
    };

export const authenticate=(data,next)=>{ //data includes: token and Signed-In user information.
    if(typeof window!=="ündefined"){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
}

export const signout=next=>{
    if(typeof window!=="ündefined"){
        localStorage.removeItem('jwt'); // we do have to remove the token from the browser storage also.
        next();
        return fetch(`${API}/signout`,{   //get back to backend.
            method:'GET'
        })
        .then((response)=>console.log(response)) //Response received from backend.
        .catch((err)=>console.log(err))
    }
    };

    export const isAuthenticated=()=>{ // check if user is signed in or not.
        if(typeof window=='undefined'){
            return false
        }
        if(localStorage.getItem('jwt') && typeof window!=='undefined'){
            return JSON.parse(localStorage.getItem('jwt'))
        }else{
            return false;
        }
    }
  
