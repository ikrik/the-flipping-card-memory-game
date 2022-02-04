import React from 'react';
import Game from './components/Game';
import { Layout, GameWrapper, Header } from './components/StyledComponents';

function App() {
  return (
    <Layout>
      <Header>The Flipping Card Game</Header>
      <GameWrapper>
        <Game />
      </GameWrapper>
    </Layout>
  );
}

export default App;
