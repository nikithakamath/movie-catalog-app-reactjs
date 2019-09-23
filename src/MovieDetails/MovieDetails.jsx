import React, { useState, useEffect } from 'react';
import { Alert, Spin, Icon } from 'antd';
import { withRouter } from 'react-router';
import MovieDetailsActions from './actions';
import style from './MovieDetails.module.scss';

function MovieDetails({ match }) {
    const src = process.env.REACT_APP_IMAGE_URL;

    const [movieDetails, setMovieDetails] = useState({});
    const [detailsApiStatus, setApiStatus] = useState(false);
    const [showErrorAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        setApiStatus(true);
        const id = match.params.movie_id;
        MovieDetailsActions.getMovieDetails(id)
            .then((data) => {
                setMovieDetails(data.data);
                setApiStatus(false);
            })
            .catch(err => {
                setErrorAlert(true);
                setApiStatus(false);
            });
    }, [])

    return (
        <>
            {
                showErrorAlert && <Alert
                    message="Some Error Occured. Please Try Again."
                    type="error"
                    closable
                    afterClose={() => setErrorAlert(false)}
                />
            }
            {
                Object.keys(movieDetails).length ?
                    (
                        <section className={style.movie_details_section}>
                            <div className={style.movie_details_container}>
                                <div className={style.single_column}>
                                    <div className={style.inner_content}>
                                        <div className={style.poster}>
                                            <img src={src} />
                                        </div>
                                        <div className={style.movie_details_info}>
                                            <section>
                                                <div className={style.title}>
                                                    <h2>{movieDetails.title} <span>{movieDetails.release_date}</span></h2>
                                                </div>
                                                <div className={style.actions}>

                                                </div>
                                                <div children={style.movie_info}>
                                                    <h3>Overview</h3>
                                                    <div className={style.overview}>
                                                        <p>{movieDetails.overview}</p>
                                                    </div>
                                                </div>
                                                <div children={style.movie_info}>
                                                    <div className={style.overview}>
                                                      <h3>Tagline</h3>
                                                      <p>{movieDetails.tagline?movieDetails.tagline:'-'}</p>
                                                      <h3>Budget</h3>
                                                      <p>{movieDetails.budget?movieDetails.budget:'-'}</p>
                                                      <h3>Revenue</h3>
                                                      <p>{movieDetails.revenue?movieDetails.revenue:'-'}</p>
                                                      <Icon type="star" style={{ marginRight: 8 }} key="list-vertical-like-o" />
                                                      {movieDetails.vote_count}
                                                    </div>
                                                </div>
                                                <br/>
                                                <div children={style.movie_info}>
                                                    <div className={style.overview}>
                                                    <h3>Status</h3>
                                                    <p>{movieDetails.status}</p>
                                                    <Icon type="clock-circle" style={{ marginRight: 8 }} key="list-vertical-like-o" />
                                                    {(movieDetails.runtime)/60} hours
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : <div className={style.other_status}>
                        {detailsApiStatus ? <Spin spinning={detailsApiStatus} /> : "No Data Found"}
                    </div>
            }
        </>
    )
}

export default withRouter(MovieDetails);
