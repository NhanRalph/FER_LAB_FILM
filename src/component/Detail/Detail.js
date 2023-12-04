import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import filmByIDAPI from "../../api/filmByIDAPI";
import filmNowPlayingAPI from "../../api/filmNowPlayingAPI";
import CardMedia from "@mui/material/CardMedia";
import "./Detail.scss";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import videoMovieByIDAPI from "../../api/videoMovieByIDAPI";
import HdIcon from "@mui/icons-material/Hd";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

const Detail = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams(); // Retrieve the movie ID from the URL
  const [nowPlaying, setNowPlaying] = useState([]); // State to store the films
  const [movieDetails, setMovieDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState({});

  const detailStyle = {
    background: theme.backgroundColor,
    color: theme.color,
    transition: theme.transition,
  };

  useEffect(() => {
    // Fetch now playing movies when the component mounts
    filmNowPlayingAPI
      .getMovies()
      .then((data) => {
        setNowPlaying(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      console.log(id);
      // Fetch movie details when the ID is available
      filmByIDAPI
        .getById(id)
        .then((data) => {
          setMovieDetails(data);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      console.log(id);
      videoMovieByIDAPI
        .getById(id)
        .then((data) => {
          setVideo(data.results[0].key);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
        });
    }
  }, [id]);


  const handleDetail = (film) => {
    setSelectedFilm(film);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="detail-container" style={detailStyle}>
      {movieDetails && (
        <div className="detail-wrapper" key={movieDetails.id}>
          <div className="detail-header">
            <CardMedia
              className="detail-header-img"
              component="img"
              image={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
            />
            <div className="backgroundGradient"></div>

            <div className="detail-content">
              <div className="detail-content-text">
                <div className="detail-content-text-title">
                  {movieDetails.title}
                </div>
                <div className="detail-content-text-info">
                  <div className="detail-content-text-info-item">
                    {movieDetails.release_date}
                  </div>
                  <div className="detail-content-text-info-item ">
                    {movieDetails.runtime} minutes
                  </div>
                  <div className="detail-content-text-info-item btn-red">
                    {movieDetails.vote_average}
                  </div>
                  <HdIcon className="detail-content-text-info-item-icon" />
                </div>
                <div className="detail-content-text-desc">
                  {movieDetails.overview}
                </div>
                <div className="detail-content-text-subdata">
                  <div className="detail-content-text-subdata-title">
                    Genres:
                  </div>
                  <div className="detail-content-text-subdata-element">
                    {movieDetails.genres.map((genre) => (
                      <div className="detail-content-text-subdata-item">
                        | {genre.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="detail-content-text-subdata">
                  <div className="detail-content-text-subdata-title">
                    Countries:
                  </div>
                  <div className="detail-content-text-subdata-element">
                    {movieDetails.production_countries.map((country) => (
                      <div className="detail-content-text-subdata-item">
                        | {country.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="detail-content-text-subdata">
                  <div className="detail-content-text-subdata-title">
                    Language:
                  </div>
                  <div className="detail-content-text-subdata-element">
                    {movieDetails.spoken_languages.map((language) => (
                      <div className="detail-content-text-subdata-item">
                        | {language.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="detail-content-btn"
                variant="contained"
                disableElevation
                onClick={handleOpen}
              >
                Trailer <MovieCreationIcon sx={{ marginLeft: 1 }} />
              </Button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  className="video-modal"
                  sx={{
                    width: 1000,
                    margin: "150px  auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <iframe
                    width="1000px"
                    height="600px"
                    src={`https://www.youtube.com/embed/${video}`}
                    title={video.name}
                    allowFullScreen
                  ></iframe>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="detail-relate">
            <div className="new-content-item">
              <div className="new-content-item-title">Now Playing: </div>
              <Swiper
                slidesPerView={4}
                initialSlide={2}
                navigation={true}
                spaceBetween={30}
                centeredSlides={true}
                modules={[Navigation, Pagination]}
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
                          <span className="card-content-detail">
                            See more...
                          </span>
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
      )}
    </div>
  );
};

export default Detail;
