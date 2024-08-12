import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";

import db from "../firebaseConf";

import playBtn from "../assets/images/play-icon-white.png";
import watchlistBtn from "../assets/images/watchlist-icon.svg";

const Detail = (props) => {
    const {id} = useParams();
    const [detailData, setDetailData] = useState({});
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);

    const handleWatchlistToggle = () => {
        setAddedToWatchlist(!addedToWatchlist);
        // Here, you can also dispatch an action or make an API call to save the state to a backend
    };

    useEffect(() => {
        db.collection("movies").doc(id).get().then((doc) => {
            if (doc.exists){
                setDetailData(doc.data());
            } else{
                console.log("no such doc");
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    return <Container>
        <Background>
            <img
                src={detailData.backgroundImg} 
                alt={detailData.title}
            />
        </Background>
        <ImageTitle>
            <img
                src={detailData.titleImg}
                alt={detailData.title}
            />    
        </ImageTitle>
        {
            detailData.type === "new" ? (
                <span style={{color: "rgb(3, 179, 255)", fontFamily: "sans-serif", fontWeight: "600"}}>Newly Added</span>
            ) : (
                <span></span>
            )
        }
        <Content>
        <Subtitle>
            <p>{detailData.subTitle}</p>
        </Subtitle>
        <Description>
            <p>{detailData.description}</p>
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
    </Container>
}

const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
    left: 0px;
    opacity: 0.8;
    position: fixed;
    right: 0px;
    top: 0px;
    z-index: -1;
    
    img{
        width: 100vw;
        height: 100vh;

        @media (max-width: 768px){
            width: initial;
        }
    }
`;

const ImageTitle = styled.div`
    align-items: flex-end;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0px auto;
    height: 30vw;
    min-height: 30px;
    padding-bottom: 24px;
    width: 100%;

    img{
        max-width: 600px;
        min-width: 200px;
        width: 25vw;
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
        width: 32px;
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

export default Detail;