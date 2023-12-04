import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

import "./News.scss";

import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Link } from "react-router-dom";

import filmNowPlayingAPI from "../../api/filmNowPlayingAPI";
import filmPopularAPI from "../../api/filmPopularAPI";
import filmUpcomingAPI from "../../api/filmUpcomingAPI";
import filmTopRateAPI from "../../api/filmNowPlayingAPI";

import Loading from "../Loading/Loading";

export default function News() {
  const [nowPlaying, setNowPlaying] = useState([]); // State to store the films
  const [popular, setPopular] = useState([]); // State to store the films
  const [topRate, setTopRate] = useState([]); // State to store the films
  const [upcoming, setUpcoming] = useState([]); // State to store the films
  const [selectedFilm, setSelectedFilm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate a 0.5-second loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    Promise.all([
      filmNowPlayingAPI.getMovies(),
      filmPopularAPI.getMovies(),
      filmTopRateAPI.getMovies(),
      filmUpcomingAPI.getMovies(),
    ])
      .then(([nowPlayingData, popularData, topRateData, upcomingData]) => {
        setNowPlaying(nowPlayingData.results);
        setPopular(popularData.results);
        setTopRate(topRateData.results);
        setUpcoming(upcomingData.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        // Handle the error, possibly show an error message to the user
      });
  }, []);

  const handleDetail = (film) => {
    setSelectedFilm(film);
  };

  return isLoading ? (<div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <Loading /> </div>) : 
  (
    <>
      <div className="news-container">
        <div className="news-header">News</div>
        <div className="news-content">
            <div className="new-content-item">
                <div className="new-content-item-title">Upcoming: </div>
                <Swiper
                    slidesPerView={4}
                    initialSlide={2}
                    navigation={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    modules={[Navigation,Pagination]}
                    className="news-swiper"
                >
                    {upcoming.map((film) => (
                    <SwiperSlide key={film.id}>
                        <Card className="card" key={film.id}>
                        <CardMedia
                            className="card-img"
                            component="img"
                            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
                            alt={film.title}
                        />

                        <Link
                            to={`/detail/${film.id}`}
                            className="card-content"
                            onClick={() => handleDetail(film)}
                        >
                            <CardContent>
                            <span className="card-content-detail">See more...</span>
                            </CardContent>
                        </Link>
                        </Card>
                        <div className="news-swiper-title">{film.title}</div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="new-content-item">
                <div className="new-content-item-title">Now Playing: </div>
                <Swiper
                    slidesPerView={4}
                    initialSlide={2}
                    navigation={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    modules={[Navigation,Pagination]}
                    className="news-swiper"
                >
                    {nowPlaying.map((film) => (
                    <SwiperSlide key={film.id}>
                        <Card className="card" key={film.id}>
                        <CardMedia
                            className="card-img"
                            component="img"
                            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
                            alt={film.title}
                        />

                        <Link
                            to={`/detail/${film.id}`}
                            className="card-content"
                            onClick={() => handleDetail(film)}
                        >
                            <CardContent>
                            <span className="card-content-detail">See more...</span>
                            </CardContent>
                        </Link>
                        </Card>
                        <div className="news-swiper-title">{film.title}</div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="new-content-item">
                <div className="new-content-item-title">Popular: </div>
                <Swiper
                    slidesPerView={4}
                    initialSlide={2}
                    navigation={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    modules={[Navigation,Pagination]}
                    className="news-swiper"
                >
                    {popular.map((film) => (
                    <SwiperSlide key={film.id}>
                        <Card className="card" key={film.id}>
                        <CardMedia
                            className="card-img"
                            component="img"
                            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
                            alt={film.title}
                        />

                        <Link
                            to={`/detail/${film.id}`}
                            className="card-content"
                            onClick={() => handleDetail(film)}
                        >
                            <CardContent>
                            <span className="card-content-detail">See more...</span>
                            </CardContent>
                        </Link>
                        </Card>
                        <div className="news-swiper-title">{film.title}</div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="new-content-item">
                <div className="new-content-item-title">Top Rate: </div>
                <Swiper
                    slidesPerView={4}
                    initialSlide={2}
                    navigation={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    modules={[Navigation,Pagination]}
                    className="news-swiper"
                >
                    {topRate.map((film) => (
                    <SwiperSlide key={film.id}>
                        <Card className="card" key={film.id}>
                        <CardMedia
                            className="card-img"
                            component="img"
                            src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
                            alt={film.title}
                        />

                        <Link
                            to={`/detail/${film.id}`}
                            className="card-content"
                            onClick={() => handleDetail(film)}
                        >
                            <CardContent>
                            <span className="card-content-detail">See more...</span>
                            </CardContent>
                        </Link>
                        </Card>
                        <div className="news-swiper-title">{film.title}</div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
      </div>
    </>
  );
}
