import styled from 'styled-components/macro';

// image
import heroImage from '../assets/img/hero-img_generated.png';

export const HeroImage = styled.div`
  background-image: url(${heroImage});
  height: 80vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  `

export const H1 = styled.h1`
  z-index: 1;
  font-size: 2.618rem;
  line-height: 1.75;
  text-align: center;
  font-family: Syne, sans-serif;
  font-weight: 700;
  color: white;
  zIndex: 1;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #1B3DA6, 0 0 20px #1B3DA6, 0 0 25px #1B3DA6, 0 0 30px #1B3DA6, 0 0 35px #1B3DA6;
  // animation: glow 1s ease-in-out infinite alternate;
}

// @keyframes glow {
//   from {
//     text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
//   }
//   to {
//     text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0073e6, 0 0 40px #0073e6, 0 0 50px #0073e6, 0 0 60px #0073e6, 0 0 70px #0073e6;
//   }
// }
  `