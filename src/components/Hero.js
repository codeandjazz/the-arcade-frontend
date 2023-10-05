import React from 'react';

// motion design
import { Fade } from 'react-awesome-reveal';

// components
import { HeroImage, H1 } from './HeroStyles';

const Hero = () => {
  return (
    <article>
      <HeroImage>
        <Fade
          duration={2000}>
          <H1>Track games you&apos;ve played.</H1>
          <H1>Save those you want to play.</H1>
          <H1>Tell your friends what&apos;s awesome.</H1>
        </Fade>
      </HeroImage>
    </article>
  )
}

export default Hero;