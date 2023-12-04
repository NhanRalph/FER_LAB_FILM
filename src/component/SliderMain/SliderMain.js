import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Autoplay, Mousewheel, Keyboard } from "swiper/modules";

import CardMedia from "@mui/material/CardMedia";
import "./SliderMain.scss";
import filmNowPlayingAPI from "../../api/filmNowPlayingAPI"; // Import your filmNowPlayingAPI

import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function SliderMain() {
  const [films, setFilms] = useState([]); // State to store the films
  const [selectedFilm, setSelectedFilm] = useState({});

  useEffect(() => {
    // Fetch now playing movies when the component mounts
    filmNowPlayingAPI
      .getMovies()
      .then((data) => {
        setFilms(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleDetail = (film) => {
    setSelectedFilm(film);
  };

  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
        className="slider-main-swiper"
      >
        {films.map((film) => (
          <SwiperSlide key={film.id}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
              alt={film.title}
            />
            <div className="backgroundGradient"></div>

            <div className="slide-content">
              <div className="slide-content-text">
                <div className="slide-content-text-title">{film.title}</div>
                <div className="slide-content-text-desc">
                  {film.overview}
                  <Link
                    to={`/detail/${film.id}`}
                    className="slide-content-more-detail"
                    onClick={() => handleDetail(film)}
                  >
                    <span>See more</span>
                    <ArrowForwardIosIcon className="slide-content-more-detail-icon" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
