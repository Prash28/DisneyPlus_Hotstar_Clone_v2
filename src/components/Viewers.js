import styled from "styled-components";

import viewerImg1 from "../assets/images/viewers-disney.png";
import viewerImg2 from "../assets/images/viewers-marvel.png";
import viewerImg3 from "../assets/images/viewers-national.png";
import viewerImg4 from "../assets/images/viewers-pixar.png";
import viewerImg5 from "../assets/images/viewers-starwars.png";

import viewerVid1 from "../assets/videos/1564674844-disney.mp4";
import viewerVid2 from "../assets/videos/1564676115-marvel.mp4";
import viewerVid3 from "../assets/videos/1564676296-national-geographic.mp4";
import viewerVid4 from "../assets/videos/1564676714-pixar.mp4";
import viewerVid5 from "../assets/videos/1608229455-star-wars.mp4";

const Viewers = (props) => {

    const handleMouseEnter = (event) => {
        const video = event.currentTarget.querySelector("video");
        if(video) video.play();
    }

    return (
        <Container>
            <Wrap onMouseEnter={handleMouseEnter}>
                <img src={viewerImg1} alt="" />
                <video autoPlay={false} loop={true} playsInline={true} muted>
                <source src={viewerVid1} type="video/mp4" />
                </video>
            </Wrap>
            <Wrap onMouseEnter={handleMouseEnter}>
                <img src={viewerImg2} alt="" />
                <video autoPlay={false} loop={true} playsInline={true} muted>
                <source src={viewerVid2} type="video/mp4" />
                </video>
            </Wrap>
            <Wrap onMouseEnter={handleMouseEnter}>
                <img src={viewerImg3} alt="" />
                <video autoPlay={false} loop={true} playsInline={true} muted>
                <source src={viewerVid3} type="video/mp4" />
                </video>
            </Wrap>
            <Wrap onMouseEnter={handleMouseEnter}>
                <img src={viewerImg4} alt="" />
                <video autoPlay={false} loop={true} playsInline={true} muted>
                <source src={viewerVid4} type="video/mp4" />
                </video>
            </Wrap>
            <Wrap onMouseEnter={handleMouseEnter}>
                <img src={viewerImg5} alt="" />
                <video autoPlay={false} loop={true} playsInline={true} muted>
                <source src={viewerVid5} type="video/mp4" />
                </video>
            </Wrap>
        </Container>
    )
}


const Container = styled.div`
    margin-top: 30px;
    padding: 30px 0px 26px;
    display: grid;
    grid-gap: 25px;
    gap: 25px;
    grid-template-columns: repeat(5, minmax(0, 1fr));

    @media (max-width: 768px){
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

const Wrap = styled.div`
    padding-top: 56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);

    img {
        inset: 0px;
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
        opacity: 1;
        position: absolute;
        transition: opacity 500ms ease-in-out 0s;
        z-index: 1;
        top: 0;
    }

    video {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        opacity: 0;
        z-index: 0;
    }

    &:hover{
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
                    rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);

        video{
            opacity: 1;
        }
    }

`;
export default Viewers;