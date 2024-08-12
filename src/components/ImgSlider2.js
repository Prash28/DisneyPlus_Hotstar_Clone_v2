import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import sliderImg1 from "../assets/images/slider-badag.jpg";
import sliderImg2 from "../assets/images/slider-badging.jpg";
import sliderImg3 from "../assets/images/slider-scale.jpg";
import sliderImg4 from "../assets/images/slider-scales.jpg";
import data from "../disneyPlusMoviesData.json";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";
import playBtn from "../assets/images/play-icon-white.png";

import db from "../firebaseConf";

const ImgSlider2 = (props) => {
    let settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    const {id} = useParams();
    const [carouselData, setcarouselData] = useState([]);
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);
    const[isFetched, setIsFetched] = useState(false);
    const handleWatchlistToggle = () => {
        setAddedToWatchlist(!addedToWatchlist);
        // Here, you can also dispatch an action or make an API call to save the state to a backend
    };

    useEffect(() => {
        if(!isFetched){
        db.collection("movies").get()
            .then((snapshot) => {
            if (!snapshot.empty){
                const moviesArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setcarouselData(moviesArray);
                console.log("carousel data")
                console.log(carouselData)
                setIsFetched(true);
            } else{
                console.log("no such doc");
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    }, [carouselData, isFetched]);

    return(
            <Carousel {...settings}>
                <Vignette className="vignette" />
                {carouselData.map((movie, id) => (
                    <Wrap key={id}>
                    <a>
                        <img src={movie.backgroundImg} alt={movie.title} />
                    </a>
                    <MovieOverlay>
                    <ImageTitle>
            <img
                src={movie.titleImg}
                alt={movie.title}
            />    
        </ImageTitle>
        {
            movie.type === "new" ? (
                <span style={{color: "rgb(3, 179, 255)", fontFamily: "sans-serif", fontWeight: "600"}}>Newly Added</span>
            ) : (
                <span></span>
            )
        }
        <Content>
        <Subtitle>
            <p>{movie.subTitle}</p>
        </Subtitle>
        <Description>
            <p>{movie.description}</p>
        </Description>
        <Controls>
            <WatchnowBtn>
            <img src={playBtn} alt="" />
            <span>Watch Now</span>
            </WatchnowBtn>
            <WatchlistContainer>
            <WatchlistBtn onClick={handleWatchlistToggle}>
                {addedToWatchlist ? (
                    <FaCheck />
                ) : (
                    <FaPlus />
                )}
            </WatchlistBtn>
            
            <Tooltip>{ addedToWatchlist ? "Added to Watchlist" : "Add to Watchlist" }</Tooltip>
            
            </WatchlistContainer>
        </Controls>
        </Content>
        </MovieOverlay>
                </Wrap>
                ))}
            </Carousel>
            
    ) 
}

const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 125vh;
  /* pointer-events: none; */
  /* box-shadow: 0 0 500px rgba(0,0,0,0.9) inset; */
  background: linear-gradient(to bottom, transparent 40%, #040714 60%);
  /* background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,1) 60%); */
  /* z-index:4; */
  transform: transform 0.3s ease;
  transform: scaleX(1);
  /* background-color: blue; */
  /* border: 1px solid red; */
  
`;

const Carousel = styled(Slider)`
    position: absolute;
    z-index: 0;
    margin-top: 0px;
    /* height: 80vh; */
    margin-right: 0px;
    margin-left: 0px;
    left: 0px;
    padding:0px;
    width: 100vw;
    /* border: 1px solid red; */
    
    .vignette{

    }

    & > button{
        opacity: 0;  //to make the carousel arrows invisible
        height: 100%;
        width: 5vw;
        z-index: 1;

        &:hover{
            opacity: 1;
            transition: opacity 0.5s ease 0s;
        }
    }

    ul li button{
        &:before{
            top: 10px;
            font-size: 10px;
            color: rgb(150, 158, 171);
        }
    }

    li.slick-active button:before{
        color: white;
    }

    .slick-list{
        /* overflow: initial; */
    }

    .slick-prev{
        /* left: -75px; */
    }

    .slick-next{
        /* right: -75px; */
    }
`;

const Wrap = styled.div`
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 90vh;
    width: 100vw;
    left: 0px;
    padding: 0px;

    a{
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        cursor: pointer;
        display: block;
        position: relative;
        /* border: 4px solid transparent; */
        padding: 4px;
        height: 100%;
    }
    img{
        width: 100vw;
        left: 0px;
        height: 100%;
        object-fit: cover;
    }

    &:hover{
        padding: 0;
        /* outline: 4px solid rgba(249, 249, 249, 0.8); */
        /* transition-duration: 300ms; */
    }
`;


const MovieOverlay = styled.div`
    position: absolute;
    width: 40vw;
    /* border: 1px solid red; */
    height: 79vh;
    padding: 10px;
    top: 10vh;
    left: 8vw;
    
`;

const ImageTitle = styled.div`
    align-items: flex-end;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0px auto;
    /* height: 30vw; */
    min-height: 30px;
    padding-bottom: 24px;
    width: 100%;
    /* border: 1px solid blue; */

    img{
        max-width: 300px;
        min-width: 200px;
        object-fit: contain;
        /* width: 25vw; */
    }
`;
const Content = styled.div`
    max-width: 874px;
`;
const Subtitle = styled.div`
    font-weight: bold;
`;
const Description = styled.div``;

const Controls = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    margin: 24px 0px;
    min-height: 56px;
`;

const WatchnowBtn = styled.button`
    font-size: 15px;
    margin: 0px 22px 0px 0px;
    padding: 0px 70px;
    height: 56px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1.8px;
    text-align: center;
    letter-spacing: 1.6px;
    background-color: rgba(249, 249, 249, 0.2);
    border: none;
    /* opacity: 0.5; */
    font-weight: 700;
    transition: all 500ms ease-in-out 0s;
    color: #fff;

    img {
        width: 20px;
        height: 20px;
    }

    span{
        opacity: 1;
        z-index: 3;
        color: white;
    }

    &:hover {
        background: rgba(249, 249, 249, 0.3);
        transform: scale(1.03);
        
    }

    @media (max-width: 768px) {
        height: 45px;
        padding: 0px 12px;
        font-size: 12px;
        margin: 0px 10px 0px 0px;

        img {
        width: 25px;
        }
    }
`;

const WatchlistContainer = styled.div`
display: flex;
flex-direction: column;
padding: 0px;
width: 54px;
height: 56px;
width: 56px;
position: relative;
`;

const WatchlistBtn = styled.button`
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px;
    cursor: pointer;
    background-color: rgba(249, 249, 249, 0.2);
    font-size: 18px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: flex-end;
    transition: all 200ms ease-in-out 0s;

    &:hover + div {
        visibility: visible;
        opacity: 1;
    }
    &:hover {
        background: rgba(249, 249, 249, 0.3);
        transform: scale(1.02);
        
    }
`;

const Tooltip = styled.div`
    visibility: hidden; 
    opacity: 0;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    padding: 10px 12px;
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 50px;
    z-index: 1;
    font-size: 14px;
    white-space: nowrap;
    transition: opacity 0.3s;

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 15%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: #333 transparent transparent transparent;
    }

    ${WatchlistContainer}:hover & {
        visibility: visible;
        opacity: 1;
    }
`;

export default ImgSlider2;