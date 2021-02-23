import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'


const AdminDashboard=()=>{
const {user:{name,email,role}}=isAuthenticated();

    const adminLeftSide=()=>{
        return(
            <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
            <li className="list-group-item">
                <Link to='/admin/create/category' className='nav-link text-success'>Create Categories</Link>
            </li>
            <li className="list-group-item">
                <Link to='/admin/categories' className='nav-link text-success'>Manage Categories</Link>
            </li>
            <li className="list-group-item">
                <Link to='/admin/create/product' className='nav-link text-success'>Create Product</Link>
            </li>
            <li className="list-group-item">
                <Link to='/admin/products' className='nav-link text-success'>Manage Product</Link>
            </li>
            <li className="list-group-item">
                <Link to='/admin/orders' className='nav-link text-success'>Manage Orders</Link>
            </li>
        </ul>
        </div>
        )
    }
    //Note: Bootstrap badges are not able to load properly, thats why i have used custom CSS.
    const adminRightSide=()=>{
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success">Name:</span>&nbsp;{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success">Email: </span>&nbsp;{email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success" style={{backgroundColor:'red'}}>Admin Area</span>
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <Base title='You are on the Admin Page' description='Manage all of your products here' className='container bg-success p-4'>
            <div className="row">
                <div className="col-3">
                {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashboard;