import React from "react";
import ShowMoviesRow from "./ShowMoviesRow";

const BottomSec = (props) => {
    const bottomSec = () => {
        return (
            <div className="home-bottom-sec pb-lg-5">
                {props.homeSec.map((secName) => {
                    return (
                        <div className="pt-4" key={secName.id}>
                            <ShowMoviesRow
                                sec={secName.sec}
                                movieType={secName.movieType}
                                movieRowTitle={secName.movieRowTitle}
                                type={secName.type}
                            ></ShowMoviesRow>
                        </div>
                    );
                })}
            </div>
        );
    };
    return <React.Fragment>{bottomSec()}</React.Fragment>;
};

export default BottomSec;
