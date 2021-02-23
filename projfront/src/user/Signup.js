import React, {useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper';



function Signup() {
    //setting React useState.
    const [values,setValues]=useState({ //value of 'values' in useState.for update use setState.
    name:'',
    email:'',
    password:'',
    error:'',
    success:false
});
//destructuring
const {name,email,password,error,success}=values;

//to handle any changes in input form; here sign up form.
const handleChange=(property)=>(event)=>{
    setValues({...values,error:false,[property]:event.target.value}); //...values--->here we are grabbing all the values from useState.
};  //event.target.value get its value from user when this fn trigger.

//handle submit button for signup.
const onSubmit=(event)=>{
event.preventDefault();
setValues({...values,error:false})
signup({name,email,password}) //execute 'signup fn' in auth-->helper-->index.js(fetch operation).
.then((data)=>{
    console.log(data);
    if(data.error){
        setValues({...values,error:data.error,success:false})
    }else{
        setValues({...values,name:'',email:'',password:'',error:'',success:true})
    }
})
.catch((error)=>console.log(error));
}

const signUpForm=()=>{  //declare globally...a signup form from bootstrap.
    return (
        <div className="form-signin w-50 offset-sm-3">
  <form>
  <label className="visually-hidden">Name</label>
    <input type="text" className="form-control" placeholder="Name" required onChange={handleChange('name')} value={name} />
    <label className="visually-hidden">Email address</label>
    <input type="email" className="form-control my-3" placeholder="Email address" required onChange={handleChange('email')} value={email}/>
    <label className="visually-hidden">Password</label>
    <input type="password" className="form-control" placeholder="Password" required onChange={handleChange('password')} value={password}/>
   <br/>
    <button onClick={onSubmit} className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</div>
    );
};
//above function will be called below inside the Signup fn.

const successMsg=()=>{
    return (
        <div className="alert alert-success w-50 p-2 offset-sm-3" style={{display:success ? '' : 'none'}}>
        User Created. Please Login <Link to='/signin'>Here</Link>
        </div>
    )
}

const failureMsg=()=>{
    return (
        <div className="alert alert-danger w-50 p-2 offset-sm-3" style={{display:error ? '' : 'none'}}>{error}</div>
    )
}

    return (
        
        <Base title="Signup page" description="A page for user to signup">
        {successMsg()}
        {failureMsg()}
            {signUpForm()}
            {/* <p className="text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signup
