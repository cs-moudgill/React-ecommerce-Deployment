import React, {useState} from 'react'
import Base from '../core/Base'
import {Redirect} from 'react-router-dom'
import { authenticate, isAuthenticated, signin } from '../auth/helper/index';



const Signin=()=>{
    const [values,setValues]=useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        didRedirect:false  //Redirect is part of react router dom.
    });
    
    const {email,password,error,loading,didRedirect}=values;
    const {user}=isAuthenticated();
    const handleChange=(property)=>(event)=>{
        setValues({...values,error:false,[property]:event.target.value}); //...values--->here we are grabbing all the values from useState.
    };

    const onSubmit=(event)=>{
    event.preventDefault();
    setValues({...values,error:false,loading:true});
    signin({email,password})
    .then((data)=>{   //here data is 'token and user information' (processed from signin at Backend).
        if(data.error){
            setValues({...values,error:true,loading:false});
        }else{
            authenticate(data,()=>{
             setValues({...values,error:false,didRedirect:true});
            })
        }
    })
    .catch(console.log('Sign In request failed.'));
    }


    const loadingMsg=()=>{
        return (
            loading && (
                <div className="alert alert-info" style={{display:loading ? '' : 'none'}}>
                    <h2>Loading...</h2>
                </div>
            )
        );
    };
    
    const failureMsg=()=>{
        return (
            <div className="alert alert-danger w-50 p-2 offset-sm-3" style={{display:error ? '' : 'none'}}>Unable to signin</div>
        )
    }


const signInForm=()=>{  //declare globally

    return (
        <div className="form-signin w-50 offset-sm-3">
  <form>
    <label className="visually-hidden">Email address</label>
    <input onChange={handleChange('email')} value={email} type="email" id="inputEmail" className="form-control my-3" placeholder="Email address" required />
    <label className="visually-hidden">Password</label>
    <input onChange={handleChange('password')} value={password} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
   <br/>
    <button onClick={onSubmit} className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
  </form>
</div>
    )
}

const performRedirect=()=>{
    if(didRedirect){
        if(user.role===1){
            return <Redirect to='/admin/dashboard' />
        }else{
            return <Redirect to='/user/dashboard' />
        }
    }
    if(isAuthenticated()){
        return <Redirect to='/' />;
    }
}

    return (
        <Base title="Sign in page" description="A page for user to signin">
            {loadingMsg()}
            {failureMsg()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}


export default Signin
