import { useEffect } from 'react';
import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import headerLogo from "../assets/images/logo.svg";
import homeIcon from "../assets/images/home-icon.svg";
import searchIcon from "../assets/images/search-icon.svg";
import watchlistIcon from "../assets/images/watchlist-icon.svg";
import originalIcon from "../assets/images/original-icon.svg";
import movieIcon from "../assets/images/movie-icon.svg";
import seriesIcon from "../assets/images/series-icon.svg";
import mySpaceIcon from "../assets/images/myspace-icon.png";

import { auth, provider } from "../firebaseConf"
import { useDispatch, useSelector } from "react-redux"; /* useSelector: used to pull functions from store */
import { useNavigate } from "react-router-dom";
import {
  selectUserName, selectUserEmail, selectUserPhoto,
  setUserLoginDetails,
  setSignOutState
} from "../features/user/userSlice";

const Header = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userphoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if(user){
        setUser(user)
        navigate('/home')
      }
    })
  }, [username]);

  const handleAuth = () => {
    if(!username){
      auth.signInWithPopup(provider)
      .then((result) => {
        console.log(result.user)
        setUser(result.user);
        console.log(userphoto)
      })
      .catch((error) => {
        alert(error.message);
      })
    } else if(username){
      auth.signOut()
      .then(() => {
        dispatch(setSignOutState());
        navigate('/');
      })
      .catch((err) => alert(err.message));
    }
    
  }

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    )
  }

  return (
    <Nav>
        
        <Logo>
        <img src={headerLogo} alt="header-logo" />   
        <UpgradeBtn>
          <span>Upgrade</span>
          <i class="fa-solid fa-angle-right"></i>
        </UpgradeBtn>
        </Logo>
        
        {
          !username ? 
            <Login onClick={handleAuth}>Login</Login>
          : 
            <>
              <NavMenu>
              <Vignette className='vignette'/>
              <a href="/">
          <img src={mySpaceIcon} alt='My-space' />
          <span>My Space</span>
          </a>
          <a href="/search">
          {/* <img src={searchIcon} alt='SEARCH' /> */}
          <i class="fa-solid fa-magnifying-glass"></i>
          <span>Search</span>
          </a>
          <a href="/home">
          {/* <img src={homeIcon} alt='HOME' /> */}
          <i class="fa-solid fa-house"></i>
          <span>Home</span>
          </a>
          <a href="/tv">
          <i class="fa-solid fa-tv"></i>
          <span>TV</span>
          </a>
          <a href="/movies">
          {/* <img src={movieIcon} alt='MOVIES' /> */}
          <i class="fa-solid fa-film"></i>
          <span>Movies</span>
          </a>
          <a href="/sports">
          <i class="fa-regular fa-futbol"></i>
          <span>Sports</span>
          </a>
          
          <a href="/categories">           
          <i class="fa-solid fa-shapes"></i>
          <span>Categories</span>
          </a>
        </NavMenu>
        <SignOut>
        {/* <ProfilePhoto>
          <img 
          // src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iDf2OKaEVf2E/v0/-1x-1.jpg" 
          src={userphoto}
          alt="profile-photo" />
        </ProfilePhoto> */}
        <Dropdown>
          <span onClick={handleAuth}>Sign Out</span>
        </Dropdown>
        </SignOut>
        
            </>
        }
    </Nav>
  )
}

const Vignette = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20vw;
  height: 100%;
  pointer-events: none;
  /* box-shadow: 0 0 500px rgba(0,0,0,0.9) inset; */
  background: linear-gradient(to left, transparent 40%, rgba(0,0,0,0.3) 60%);
  /* z-index:4; */
  transform: scaleX(1);
  /* transform: transform 0.3s ease; */
  /* transition: transform 0.3s ease, width 0.3s ease; */
  transition: opacity 0.5s ease;
  /* background-color: blue; */
  /* border: 1px solid red; */
  opacity: 0.5;
`;

const Nav = styled.aside`
    position: fixed;
    /* top: 0; */
    left:0px;
    height: 100vh;
    /* height: 70px; */
    width: 7vw;
    /* background-color: rgba(9, 11, 19, 0.5); */
    background-color: transparent;
    display: flex;
    flex-direction: column;
    /* justify-content: ; */
    align-items: center;
    padding: 30px 0px 36px;
    margin-left: 0px;
    padding-left: 0px;
    padding-top: 45px;
    letter-spacing: 16px;
    z-index: 4;
    /* background: rgba(0,0,0, 0.2); */
    /* box-shadow: 0 3px 10px rgb(0 0 0 / 0.5); */
    /* border: 1px solid red; */

    
`;


const Logo = styled.a`
/* border: 1px solid red; */
    /* top: 20vh; */
    /* position: absolute; */
    padding: 0px;
    /* margin-left: 20px; */
    width: 100px;
    /* margin-left: 10px; */
    max-height: 70px;
    font-size: 0;
    /* display: inline-block; */
    z-index:5;
    /* margin-left: 0px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;

    img{
        display: block;
        width: 80%;
        z-index: 4;
    }
    span{
      display: block;
        width: 80%;
        z-index: 4;
    }
`;

const UpgradeBtn = styled.div`
margin-top: 2px;
  background: rgba(255, 204, 117, .2);
  /* border: 1px solid red; */
  /* width: 100px; */
  /* height: 120px; */
  border: 1px;
  border-color: transparent;
  border-radius: 10px;
  color: rgba(255, 204, 117, .7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  font-size: 15px;
  cursor: pointer;
  letter-spacing: 1.5px;
  /* position: relative; */
    span{
      
      /* font-size: 18px; */
    }
  i{
    margin-left: 5px;
    
    font-size: 13px;
    
  }
`;

const NavMenu = styled.div`
    /* align-items: center; */
    display: flex;
    flex-flow: column nowrap; /*  CSS shorthand property specifies the direction of a flex container, as well as its wrapping behavior. */
    height: 50%;
    justify-content: space-between;
    margin: 0px;
    padding: 0px;
    /* position: absolute; */
    margin-right: auto;
    margin-left: 10px;
    padding-left: 30px;
    /* border: 1px solid red; */
    z-index: 4;
    

    a{
      left: 3px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 12px;
      opacity: 0.8;
      height: 0px;
      
      &:hover{
      transform: scale(1.1);
      transition-duration: 1000ms;
      opacity: 1;

      span{
        opacity: 1;
      }
    }

      img{
        left: 0px;
        height: 30px;
        min-width: 30px;
        right: 20px;
        /* width: 20px; */
        
      }
      i{
        right: 0px;
        padding: 0px;
        height: 30px;
        width: 30px;
        font-size: 25px;
        opacity: 0.8;
      }

      span{
      color: rgb(249,249,249);
      font-size: 27px;
      font-weight: 700;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: absolute;
      /* margin-left: 20px; */
      opacity: 0;
      transform: translateX(-10px);
  }

  }
  
  &:hover{
    /* z-index:4; */
    span{
      opacity: 0.6;
      position: relative;
      /* left: 10px; */
      transform: translateX(12px);
      transition-delay: opacity 100ms ease, transform 2s ease;
      transition-duration: 800ms;
      
    }
    
      .vignette{
        transition-duration: 1000ms;
        transition-delay: 500ms;
        width: 70vw;
        transform: scaleX(1.5);
        transition: opacity 1s ease-in-out;
        background: linear-gradient(to left, transparent 40%, rgba(0,0,0,0.9) 60%);
        opacity: 0.85;
        /* width: 30vw; */
        /* transform: translateX(1.5); */
        /* left: 0px; */
        /* background: linear-gradient(to right, rgba(0,0,0,0.9) 70%, transparent 30%); */
        /* z-index:3; */
        /* border: 1px solid red; */
      }
  }

    /* @media (max-width: 768px){
      display: none;
    } */
`;

const Login = styled.a`
    background-color: rgb(0,0,0,0.6);
    color: #f9f9f9;
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 0.2s ease 0;
    cursor: pointer;

    &:hover{
      background-color: #f9f9f9;
      color: #000;
      border-color: transparent;
    }
`;

const ProfilePhoto = styled.div`
  padding: 0px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  letter-spacing: 1px;

  img{
        height: 100%;
        width: 100%;
        min-height: 50px;
        min-width: 50px;
        border-radius: 50%;
      }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19,19,19);
  border: 1px solid rgba(151,151,151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  /* width: 100px; */
  letter-spacing: 3px;
  opacity: 0
`;

const SignOut = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover{
    ${Dropdown}{
      opacity: 1;
      transition-duration: 1s;
    }
  }
  
`;

export default Header