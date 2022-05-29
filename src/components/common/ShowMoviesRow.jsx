import React from "react";
// import one from "../assests/some-pics/1.jpg";
import "./carousel.css";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { imgNotAvail } from "./imgNotAvail";

const API_KEY = "3e9ea35a5fcdd22c28f994cdeddff43c";
let SmallImgBaseUrl = "https://image.tmdb.org/t/p/w500/";

const ShowMoviesRow = (props) => {
    let { sec } = props;
    let count = 1;

    let secArr = [sec + count++, sec + count++, sec + count++];
    // console.log("section Array", secArr);

    let moviesArr = useSelector((state) => state[props.movieType]);

    let [videoLinks, setVideoLinks] = useState({});

    // for video links

    async function loadVideoLinks() {
        let movNameID = moviesArr.slice(0, 15).map((movie) => {
            if (movie.media_type === "movie") {
                return `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;
            } else if (movie.media_type === "tv") {
                return `https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;
            } else if (props.type === "tv") {
                return `https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;
            }
        });

        let data = axios
            .all(
                movNameID.map(async (mov) => {
                    return axios.get(mov).catch((error) => {
                        return null;
                    });
                })
            )
            .then((response) => {
                let data = response.filter((movie) => {
                    if (movie) return movie;
                });
                data = data.map((movie) => {
                    // if (movie.data.results[0]?.key)
                    return {
                        id: movie.data.id,
                        results: movie.data.results[0]?.key || null,
                    };
                });
                console.log("data", data);
                let videoKeys = {};
                data.forEach((data) => {
                    videoKeys[data.id] = data.results;
                });
                // console.log(response);
                setVideoLinks({ ...videoLinks, ...videoKeys });
                // return data;
            })
            .catch((error) => {
                console.log("Error", error.response);
                return null;
            });
        console.log(data);
    }

    useEffect(() => {
        loadVideoLinks();
    }, []);

    console.log("state", videoLinks);

    // for rendering carousal
    let movies = _.chunk(moviesArr, 5).slice(0, 3);

    // console.log("Sliced Movie Array", movies);

    const createMoviesRow = () => {
        let secIdCount = 3;
        let anchorKey = 1;
        let itemKey = 1;

        return (
            <div className="movie-rows" key={props.movieRowTitle}>
                <h4>{props.movieRowTitle}</h4>
                <div className="wrapper" key={props.movieType}>
                    {secArr.flatMap((sec) => {
                        return (
                            <section id={sec} key={sec}>
                                <a
                                    href={"#" + secArr[--secIdCount]}
                                    className="arrow__btn"
                                    key={"anchor" + anchorKey++}
                                    // onClick={(e) => {
                                    //     e.preventDefault();
                                    // }}
                                >
                                    <span>‹</span>
                                </a>
                                {movies[secArr.indexOf(sec)].map((movie) => {
                                    return (
                                        <React.Fragment>
                                            <div
                                                className="item"
                                                key={"item" + itemKey++}
                                                data-toggle="modal"
                                                data-target={"#_" + movie.id}
                                                // data-target="#exampleModal"
                                                type="button"
                                            >
                                                <img
                                                    src={
                                                        movie.backdrop_path
                                                            ? SmallImgBaseUrl +
                                                              movie.backdrop_path
                                                            : imgNotAvail
                                                    }
                                                    key={movie.id}
                                                    alt={movie.id}
                                                    className="img-fluid"
                                                />
                                                <div className="card-title pl-3 d-flex align-items-end h-100 w-100">
                                                    <h5>
                                                        {movie.name ||
                                                            movie.title}
                                                    </h5>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    );
                                    // });
                                })}
                                {
                                    (secIdCount =
                                        secIdCount === 0 ? 3 : secIdCount)
                                }
                                <a
                                    // onClick={(e) => {
                                    //     e.preventDefault();
                                    // }}
                                    href={"#" + secArr[--secIdCount]}
                                    className="arrow__btn"
                                    key={"anchor" + anchorKey++}
                                >
                                    <span>›</span>
                                </a>
                            </section>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {createMoviesRow()}

            {movies
                .map((movieArr) => {
                    return movieArr.map((movie) => {
                        return (
                            <div
                                key={movie.id}
                                className="modal fade"
                                // id={String(movie.media_type || movie.med + movie.id)}
                                id={"_" + movie.id}
                                // id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div
                                    className="modal-dialog"
                                    key={"a" + movie.id}
                                >
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            {videoLinks[movie.id] ? (
                                                <iframe
                                                    width="100%"
                                                    height="315"
                                                    src={
                                                        "https://www.youtube.com/embed/" +
                                                        videoLinks[movie.id]
                                                    }
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <h3>Video Not Available</h3>
                                            )}
                                            {/* <h3>Video Not Available</h3> */}
                                            <button
                                                type="button"
                                                className="close text-light"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <span aria-hidden="true">
                                                    &times;
                                                </span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <table className="table table-striped table-dark">
                                                <tbody>
                                                    <tr>
                                                        <th
                                                            colSpan="2"
                                                            className="display-4"
                                                        >
                                                            {/* <></> */}
                                                            {movie.title ||
                                                                movie.name}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>Release Date:</th>
                                                        <td>
                                                            {movie.release_date ||
                                                                movie.first_air_date}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Rating:</th>
                                                        <td>
                                                            {movie.vote_average}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Movie ID:</th>
                                                        <td>{movie.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Description: </th>
                                                        <td>
                                                            {movie.overview}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {/* <h3
                                                className="modal-title"
                                                id="exampleModalLabel"
                                            >
                                                {movie.title || movie.name}
                                            </h3>
                                            <div className="d-flex gap-2">
                                                <h5>Release Date: </h5>
                                                <p>{movie.release_date}</p>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <h5>Movie ID:</h5>
                                                <span> {movie.id}</span>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <h5>Rating:</h5>
                                                <p>{movie.vote_average}</p>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <h5>Description: </h5>
                                                <p>{movie.overview}</p>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                })
                .flat()}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        </React.Fragment>
    );
};

export default ShowMoviesRow;
