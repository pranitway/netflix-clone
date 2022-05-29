import React from "react";
import BannerImg from "../assests/trial-banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faPlay } from "@fortawesome/free-solid-svg-icons";
import ShowMoviesRow from "./ShowMoviesRow";
import { useDispatch, useSelector } from "react-redux";
import { trendingMovies } from "./../../store/movies";
import { useEffect, useState } from "react";

let imgBaseLink = "https://image.tmdb.org/t/p/original/";

const Banner = () => {
    let movies = useSelector((state) => state.trendingMovies);
    // console.log("This is from Banner Component", movies);

    let [bannerImgInfo, setBannerImgInfo] = useState([]);
    let randNumb = Math.floor(Math.random() * 10);

    // while (!movies[randNumb].backdrop_path !== null) {
    //     bannerImgInfo = movies[randNumb];
    //     // break;
    // }

    useEffect(() => {
        // bannerImgInfo = movies[randNumb];
        setBannerImgInfo(movies[randNumb]);
    }, []);
    // console.log("")

    return (
        <React.Fragment>
            <div className="main-view billboard position-relative">
                <div className="info-banner">
                    <div className="logo-text">
                        <div className="title-wrapper text-light">
                            <h1>{bannerImgInfo.title || bannerImgInfo.name}</h1>
                        </div>
                    </div>
                    <div className="info-wrapper text-light">
                        <h5>
                            {/* A terminally ill chemistry teacher teams with a
                            former student to manufacture crystal meth to secure
                            his family's future. */}
                            {bannerImgInfo.overview}
                        </h5>
                    </div>
                    <div className="billboard-btn-wrap">
                        <button className="btn btn-light play-btn">
                            <FontAwesomeIcon
                                icon={faPlay}
                                className="fa-solid icon"
                            />
                            Play
                        </button>

                        <button
                            className="btn btn-light info-btn more-info-btn"
                            data-toggle="modal"
                            // data-target="#exampleModal"
                            data-target={"#_" + bannerImgInfo.id}
                            type="button"
                        >
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                className="fa-solid icon"
                            />
                            More Info
                        </button>
                    </div>
                </div>
                <div className="hero-vignette vignette-layer">
                    {/* <ShowMoviesRow
                        sec="bannerSec"
                        // movies={movies}
                        movieType="trendingMovies"
                        movieRowTitle="New Releases"
                    ></ShowMoviesRow> */}
                </div>

                {/* <img src={BannerImg} className="img img-fluid" alt=""></img> */}
                <img
                    src={imgBaseLink + bannerImgInfo.backdrop_path}
                    className="img img-fluid"
                    alt=""
                ></img>
            </div>

            <div
                class="modal fade"
                // id="exampleModal"
                id={"_" + bannerImgInfo.id}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Video Not Available
                            </h5>
                            <button
                                type="button"
                                class="close text-light"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <table className="table table-striped table-dark">
                                <tbody>
                                    <tr>
                                        <th colSpan="2" className="display-4">
                                            {/* <></> */}
                                            {bannerImgInfo.title ||
                                                bannerImgInfo.name}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Release Date:</th>
                                        <td>
                                            {bannerImgInfo.release_date ||
                                                bannerImgInfo.first_air_date}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Rating:</th>
                                        <td>{bannerImgInfo.vote_average}</td>
                                    </tr>
                                    <tr>
                                        <th>Movie ID:</th>
                                        <td>{bannerImgInfo.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Description: </th>
                                        <td>{bannerImgInfo.overview}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Banner;
