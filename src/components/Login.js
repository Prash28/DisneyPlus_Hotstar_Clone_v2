import styled from "styled-components";
import bg from "../assets/images/login-background.jpg"
import ctaLogoOne from "../assets/images/cta-logo-one.svg";
import ctaLogoTwo from "../assets/images/cta-logo-two.png";

// disney-plus-clone\public\assets\images\login-background.jpg
const Login = (props) => {
    return(
    <Container>
        <Content>
            <CTA> {/* call to action */}
                <CTALogoOne src={ctaLogoOne} alt='logo-one' />
                <SignUp>GET IT ALL THERE</SignUp>
                <Description>Get Premier Access to lot of movies and TV Series with a Disney+ subscription.</Description>
                <CtaLogoTwo src={ctaLogoTwo} alt='logo-two' />
            </CTA>
            <BgImage />
        </Content>
    </Container>
)}
/* Container is the bg banner of our home page */
const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
`;

/* Content is the content within the banner at the center of the screen */
/* creates a styled div. any other tag like h1 or p can be used instead of div if needed */
const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 80px 40px;
    height: 100%;
`;

const BgImage = styled.div`
    height: 100%;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${bg});
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
`;

const CTA = styled.div`
    margin-bottom: 2vw;
    max-width: 650px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    transition-timing-function: ease-out;
    transition: opacity 0.2s;
    width: 100%;
`;

const CTALogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 600px;
    min-height: 1px;
    display: block;
    width: 100%;
`;

const SignUp = styled.a`
    font-weight: bold;
    color: #f9f9f9;
    background-color: #0063e5;
    margin-bottom: 12px;
    width: 100%;
    letter-spacing: 1.5px;
    font-size: 18px;
    padding: 16.5px 0;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;

    &:hover{
        background-color: #0483ee;
    }
`;

const Description = styled.p`
    color: hsla(0, 0%, 95.3%, 1);
    font-size: 12px;
    margin: 0 0 24px;
    line-height: 1.5;
    letter-spacing: 1.5px;
`;

const CtaLogoTwo = styled.img`
    max-width: 600px;
    margin-bottom: 20px;
    display: inline-block;
    vertical-align: bottom;
    width: 100%;
`;

export default Login;