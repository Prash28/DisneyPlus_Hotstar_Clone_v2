import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import sliderImg1 from "../assets/images/slider-badag.jpg";
import sliderImg2 from "../assets/images/slider-badging.jpg";
import sliderImg3 from "../assets/images/slider-scale.jpg";
import sliderImg4 from "../assets/images/slider-scales.jpg";

const ImgSlider = (props) => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, 
    }

    return(
            <Carousel {...settings}>
                <Wrap>
                    <a>
                        <img src={sliderImg1} alt="" />
                    </a>
                </Wrap>
                <Wrap>
                    <a>
                        <img src={sliderImg2} alt="" />
                    </a>
                </Wrap>
                <Wrap>
                    <a>
                        <img src={sliderImg3} alt="" />
                    </a>
                </Wrap>
                <Wrap>
                    <a>
                        <img src={sliderImg4} alt="" />
                    </a>
                </Wrap>
            </Carousel>
    ) 
}

const Carousel = styled(Slider)`
    margin-top: 0px;
    /* height: 80vh; */

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
        overflow: initial;
    }

    .slick-prev{
        left: -75px;
    }

    .slick-next{
        right: -75px;
    }
`;

const Wrap = styled.div`
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /* height: 80vh; */

    a{
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        cursor: pointer;
        display: block;
        position: relative;
        /* border: 4px solid transparent; */
        padding: 4px;
        /* height: 100%; */
    }
    img{
        width: 100%;
        height: 100%;    
    }

    &:hover{
        padding: 0;
        outline: 4px solid rgba(249, 249, 249, 0.8);
        transition-duration: 300ms;
    }
`;
export default ImgSlider;