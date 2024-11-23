import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
import { AiOutlinePinterest } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";

const StyledFooter = styled.div`
  text-align: center;
  background-color: #012169;
  color: white;
  font-family: "DM Sans", sans-serif;
  padding: 4rem 10rem;

  @media (max-width: 37.5em) {
    padding: 4rem;
  }

  h3 {
    margin: 2.5rem 0 1rem;
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 0.7rem;
    font-size: 1.4rem;
  }

  p:nth-last-child(2) {
    margin-bottom: 2rem;
  }

  svg {
    /* font-size: 1.6rem; */
  }
`;

const StyledLink = styled(Link)`
  color: white;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;

  a::after {
    content: "|";
    margin-left: 1rem;
    text-decoration: none;
  }

  a:last-child::after {
    content: "";
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const SocialLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 4rem;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterLinks>
        <StyledLink to="/">Locations</StyledLink>
        <StyledLink to="/">Contact Us</StyledLink>
        <StyledLink to="/">Help & Support</StyledLink>
        <StyledLink to="/">Browse with Specialist</StyledLink>
        <StyledLink to="/">Accessible Banking</StyledLink>
        <StyledLink to="/">Privacy</StyledLink>
        <StyledLink to="/">Children's Privacy</StyledLink>
        <StyledLink to="/">Security</StyledLink>
        <StyledLink to="/">Online Service Agreement</StyledLink>
        <StyledLink to="/">Advertising Practices</StyledLink>
        <StyledLink to="/">Your Practices</StyledLink>
        <StyledLink to="/">Your Privacy Choices</StyledLink>
        <StyledLink to="/">Site Map</StyledLink>
        <StyledLink to="/">Careers</StyledLink>
        <StyledLink to="/">Share Your Feedback</StyledLink>
        <StyledLink to="/">View Full Online Banking Site</StyledLink>
      </FooterLinks>

      <h3>Connect with us</h3>
      <SocialLinks>
        <SocialLink to="facebok.com" onClick={(e) => e.preventDefault()}>
          <AiFillFacebook />
        </SocialLink>
        <SocialLink to="instagram.com" onClick={(e) => e.preventDefault()}>
          <TiSocialInstagram />
        </SocialLink>
        <SocialLink to="linkedin.com" onClick={(e) => e.preventDefault()}>
          <FaLinkedin />
        </SocialLink>
        <SocialLink to="pinterest.com" onClick={(e) => e.preventDefault()}>
          <AiOutlinePinterest />
        </SocialLink>
        <SocialLink to="twitter.com" onClick={(e) => e.preventDefault()}>
          <FaTwitter />
        </SocialLink>
        <SocialLink to="youtube.com" onClick={(e) => e.preventDefault()}>
          <IoLogoYoutube />
        </SocialLink>
      </SocialLinks>
      <p>Secure Savings, N.A. Member FDIC. Equal Housing Lender</p>
      <p>© 2024 Secure Savings Corporation. All rights reserved.</p>
      <p>Patent: patents.securesavings.com</p>
    </StyledFooter>
  );
}
