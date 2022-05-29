import React from "react";
import { useState, useEffect } from "react";
import Banner from "./common/Banner";
import BottomSec from "./common/BottomSec";
// import { useDispatch, useSelector, connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/movies";
import { loadMovieData } from "../store/movies";

const Home = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMovieData());

        // dispatch({
        //     type: "apiCall",
        //     payload: {
        //         url: [
        //             `https://api.themoviedb.org/3/trending/all/week?api_key=3e9ea35a5fcdd22c28f994cdeddff43c`,
        //             `https://api.themoviedb.org/3/tv/popular?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&page=1`,
        //             `https://api.themoviedb.org/3/discover/movie?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&region=in&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate`,
        //         ],
        //         onSuccess: "moviesReceived",
        //         onError: "apiRequestFailed",
        //     },
        // });
    }, []);

    const storeData = useSelector((state) => state);
    // console.log("this is from home component", storeData);
    return (
        <React.Fragment>
            <Banner></Banner>
            <BottomSec homeSec={props.homeSec}></BottomSec>
        </React.Fragment>
    );
};

export default Home;
