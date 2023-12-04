import React from "react";
import "./About.scss";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import {Link} from 'react-router-dom'

export default function About() {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <div className="about-avt">
          <Card >
              <CardMedia
              className="about-avt-img"
                component="img"
                image="./assets/avt/avt.jpg"
                alt="avt"
              />
          </Card>
        </div>
        <div className="about-content">
            <div className="about-content-sub">FER201m:</div>
            <div className="about-content-title">About:</div>
              <div className="about-content-detail-name">Leader Project: Dao Nguyen Huy Nhan</div>
              <div className="about-content-detail-desc">This project is a LAB for the subject FER201m, created by Dao Nguyen Huy Nhan. This project uses ReactJS Library, using SCSS for design.</div>
            
            <div className="about-content-contact">
                <Link to="https://www.facebook.com/ralph.nhan/" target="_blank" className="about-content-contact-item">
                    <FacebookIcon className="about-content-contact-item-icon"/>
                </Link>
                <Link to="https://github.com/NhanRalph" target="_blank" className="about-content-contact-item">
                    <GitHubIcon className="about-content-contact-item-icon"/>
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
