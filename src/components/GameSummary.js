/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';
import { Container, Image } from '@nextui-org/react';

const GameSummary = () => {
  return (
    <section>
      <Container width="100%" margin="0 auto">
        <div>
          <Image />
        </div>
        <div>
          <h1>sadsa</h1>
          <p>[Summary here]</p>
          {/* Add summary, note not all games has summary */}
        </div>
      </Container>
    </section>
  );
};

export default GameSummary;
