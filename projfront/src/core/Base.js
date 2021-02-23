import React from 'react';
import Menu from './Menu';


const Base=({
    title="My Title",
    description="My description",
    className="text-white p-4",
    children
})=> {
    return (
        <div>
        <Menu /> 
            <div className="container-fluid">
                <div className="jumbotron bg-darktext-white text-center text-white">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer #343a40 mt-auto py-2">
                <div className="container-fluid bg-success text-white text-center py-2">
                    <h4>If you got any question, feel free to reach out!</h4>
                    <button className="btn btn-md btn-warning">Contact us</button>
                </div>
                <div className="container">
                    <span className="text-muted">An <span className="text-white">Amazing</span> Place to buy tshirt</span>
                </div>
            </footer>
        </div>
    );
}

export default Base
