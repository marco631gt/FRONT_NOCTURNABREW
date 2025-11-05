import React from "react";

const Cards = ({ name, description, image }) => {
    return (
        <div className="col-6 mx-auto mt-5">
            <div className="card bg-white">
                <img src={image} alt={name} style={{ height: '250px' }} />
                <div className="card-body">
                    <h4 className="card-title">{name}</h4>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Cards;
