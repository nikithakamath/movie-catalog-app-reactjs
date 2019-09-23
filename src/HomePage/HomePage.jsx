import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './HomePage.module.scss'
import HomePageActions from './actions';
import { Spin, Icon, Alert } from 'antd';

function HomePage({ history }) {
    const imgSrc = process.env.REACT_APP_IMAGE_URL;

    const [movieLoadingStatus, setMovieLoadingStatus] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [showErrorAlert, setErrorAlert] = useState(false);

    useEffect(() => {
        setMovieLoadingStatus(true);
        HomePageActions.getMovieList()
            .then(({ data }) => {
                setMovieList(data);
                setMovieLoadingStatus(false);
            })
            .catch(err => {
                setErrorAlert(true);
                setMovieLoadingStatus(false);
            })
    }, []);

    const navigateToMovieDetails = (id) => {
        history.push(`/movie/${id}`);
    }

    const movieListItem = movieList.length ?
        <ul>
            {
                movieList.map(movie => {
                    return (
                        <li key={movie.movie_id} onClick={() => navigateToMovieDetails(movie.movie_id)}>
                            <div>
                                <h3 className={styles.movie_title}>{movie.title}</h3>
                                <h5 className={styles.movie_tag}>{movie.tagline}</h5>
                                <p className={styles.movie_description}>{movie.overview}</p>
                                <div>
                                    <span>
                                        <Icon type="star" style={{ marginRight: 8 }} key="list-vertical-like-o" />
                                        {movie.vote_count}
                        </span>
                                </div>
                            </div>
                            <img src={imgSrc} />
                        </li>
                    )
                })
            }
        </ul>
        :
        <div className={styles.other_status}>
            {movieLoadingStatus ? <Spin spinning={movieLoadingStatus} /> : "No Data Found"}
        </div>

    return (
        <>
            {
                showErrorAlert && <Alert
                    message="Some error occured. Please try again."
                    type="error"
                    closable
                    afterClose={() => setErrorAlert(false)}
                />
            }
            <section className={styles.homeSection}>
                <div className={styles.movie_list_container}>
                    {movieListItem}
                </div>
            </section>
        </>
    );
}

export default withRouter(HomePage);
