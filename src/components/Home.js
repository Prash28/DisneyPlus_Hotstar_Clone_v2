import styled from "styled-components";
import bgImage from "../assets/images/home-background.png";
import ImgSlider1 from "./ImgSlider";
import ImgSlider2 from "./ImgSlider2";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebaseConf";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);

    

    useEffect(() => {
        let recommends = [];
        let newDisneys = [];
        let originals = [];
        let trending = [];

        db.collection('movies').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                switch(doc.data().type){
                    case 'recommend':
                        console.log("added to recommends")
                        // recommends = [...recommends, { id: doc.id, ...doc.data() }]
                        recommends.push({ id: doc.id, ...doc.data() });
                        
                        break;
                    case "new":
                        console.log("added to new")
                        // newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
                        newDisneys.push({ id: doc.id, ...doc.data() });
                        break;
                    case 'original':
                        console.log("added to original")
                        // originals = [...originals, { id: doc.id, ...doc.data() }];
                        originals.push({ id: doc.id, ...doc.data() });
                        break;
                    case 'trending':
                        console.log("added to trending")
                        // trending = [...trending, { id: doc.id, ...doc.data() }];
                        trending.push({ id: doc.id, ...doc.data() });
                        break;
                }
            });
            // console.log(recommends)
            // console.log(newDisneys)
            // console.log(originals)
            // console.log(trending)
        dispatch(setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trending,
        })
    );
    });
    }, [userName]);
    // if(recommends.length > 0){
    //     console.log(recommends)
    // } else{
    //     console.log("epty")
    // }

    return(
        <Container>
            <ImgSlider2 />
            <MainContent>  
            <Recommends /> 
                <Viewers />
                
                <NewDisney />
                <Originals />
                <Trending />
            </MainContent>
        </Container>
    ) 
}

const Container = styled.main`
    top: 0px;
    position: relative;
    right: 0px;
    width: 100vw;
    height: 100vh;
    /* left: 5vw; */
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    padding: 0 calc(3.5vw + 5px);

    &:after{
        /* background: url(${bgImage}) center center / cover no-repeat fixed; */
        background-color: #040714;
        content: "";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }

`;

const MainContent = styled.div`
position: absolute;
top: 70vh;
width: 90vw;
    padding-left: 4vw;
    z-index: 3;
`;

export default Home;