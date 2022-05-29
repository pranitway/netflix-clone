import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/netflix-logo.png";

const Navbar = () => {
    return (
        <React.Fragment>
            {/* <nav className="navbar navbar-dark">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
            </nav> */}

            <nav className="navbar navbar-expand-lg  fixed-top">
                <div className="navbar-in">
                    <Link to="/browse" className="navbar-brand logo">
                        <img
                            src={logo}
                            alt=""
                            style={{ width: "100px", height: "25px" }}
                        ></img>
                    </Link>
                    <div className="navbar-nav">
                        <Link to="/browse" className="nav-link">
                            <li className="nav-tab">Home</li>
                        </Link>
                        <Link to="/browse/tv-shows" className="nav-link">
                            <li className="nav-tab">TV Shows</li>
                        </Link>
                        <Link to="/browse/movies" className="nav-link">
                            <li className="nav-tab">Movies</li>
                        </Link>
                        <Link to="/browse/new-and-popular" className="nav-link">
                            <li className="nav-tab">New & Popular</li>
                        </Link>
                        <Link to="/browse/my-list" className="nav-link">
                            <li className="nav-tab">My List</li>
                        </Link>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;
