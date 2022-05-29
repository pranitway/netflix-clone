import React from "react";
import { useState, useEffect } from "react";
import Banner from "./common/Banner";
import BottomSec from "./common/BottomSec";

import { useDispatch, useSelector } from "react-redux";

import { loadMovieData } from "../store/movies";

const Home = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMovieData());
    }, []);

    return (
        <React.Fragment>
            <Banner></Banner>
            <BottomSec homeSec={props.homeSec}></BottomSec>
        </React.Fragment>
    );
};

export default Home;
