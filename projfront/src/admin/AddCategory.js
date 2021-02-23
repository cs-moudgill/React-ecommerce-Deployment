import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link
        className="btn btn-sm btn-success rounded mb-2"
        to="/admin/dashboard"
      >
        Back to Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    createCategory(user._id,token,{name}) //here name is category name.
    .then((data)=>{
        if (data.error) {
            setError(true)
        }else{
            setError('');
            setSuccess(true);
            setName('');
        }
    })
  };

  const successMsg=()=>{
    if(success){
        return <h4 className='text-success'>Category created Successfully</h4>
    }
  }

  const warningMsg=()=>{
     if(error){
        return <h4 className='text-warning'>Failed to create new Category</h4>
    }
  }

  const myCategoryForm = () => {
    return (
      <div className="row bg-white">
        <div className="col-md-12 offset">
          <form>
            <div className="form-group p-2">
              <p className="lead">Enter the category</p>
              <input
                onChange={handleChange}
                type="text"
                className="form-control my-3"
                autoFocus
                required
                placeholder="For Ex. summer"
                value={name}
              />
              <button
                className="btn btn-outline-info rounded"
                onClick={onSubmit}
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };


  return (
    <Base
      title="Create a Category here"
      description="Add a new Category for tshirts."
      className="container bg-info p-4 rounded"
    >
      <div className="row bg-white">
        <div className="col-md-8 offset-md-2">
        {successMsg()}
        {warningMsg()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
