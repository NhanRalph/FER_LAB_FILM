import React, { useState, useEffect } from "react";
import "./Film.css";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import filmNowPlayingAPI from "../../api/filmNowPlayingAPI";
import filmPopularAPI from "../../api/filmPopularAPI";

export default function Film() {
  const { theme, toggle, dark } = useContext(ThemeContext);

  const [films, setFilms] = useState([]); // State to store the films
  const [selectedFilm, setSelectedFilm] = useState({});
  const [activeList, setActiveList] = useState("nowPlaying"); // State to track the active film list


  useEffect(() => {
    // Fetch movies based on the active list when the component mounts
    const api =
      activeList === "nowPlaying" ? filmNowPlayingAPI : filmPopularAPI;

    api
      .getMovies()
      .then((data) => {
        setFilms(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [activeList]);

  const handleDetail = (film) => {
    setSelectedFilm(film);
  };


  const switchToList = (listType) => {
    setActiveList(listType);
  };

  const borderStyle = {
    border: `1px solid ${theme.color}`,
  };

  return (
    <div className="content">
      <div className="content-btn-choose-film">
        <Button
          onClick={() => switchToList("nowPlaying")}
          variant="outlined"
          className={
            activeList === "nowPlaying" ? "active-button" : "inactive-button"
          }
          style={borderStyle}
        >
          Now Playing
        </Button>
        <Button
          onClick={() => switchToList("popular")}
          variant="outlined"
          className={
            activeList === "popular" ? "active-button" : "inactive-button"
          }
          style={borderStyle}
        >
          Popular
        </Button>
      </div>
      {films.map((film) => (
        <Card
          className="card"
          key={film.id}
          sx={{ maxWidth: "200px" }}
        >
          <CardMedia
            className="card-img"
            component="img"
            src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
            alt={film.title}
          />

          <Link to={`/detail/${film.id}`} 
              className="card-content"
              onClick={() => handleDetail(film)}>
            <CardContent
            >
              <div className="card-content-title">{film.title}</div>
            <span className="card-content-detail">See more...</span>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
