import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Card, { SelectedCardProps } from '../Card';
import { fetch as fetchCards } from '../../service';
import { Board, Content, Button, ButtonWrapper, Congrats } from '../StyledComponents';
import { GameCardsProp, GameProps } from './Game.types';

const Game: React.FC<GameProps> = ({ gridSize = 5 }) => {
  const [cards, setCards] = React.useState<GameCardsProp[]>([]);
  const [selectedCards, setSelectedCards] = React.useState<SelectedCardProps[]>([]);
  const [completedGame, setCompletedGame] = React.useState<boolean>(false);

  React.useEffect(() => {
    handleFetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    // Check if every clicked image is flipped(open) - If not, update state for cards
    if (selectedCards?.length > 0 && selectedCards?.length < 3) { // when comparing always we want selectedCard length be up to 2
      const ids = selectedCards.map((card) => card.id);
      if (!cards.find((card) => ids.find((id) => card.id === id) && !card.isFlipped)) return
      const mutatedCards = cards.map((card) => ids.find((id) => card.id === id && !card.isFlipped) ? ({ ...card, isFlipped: true }) : card);
      setCards(mutatedCards)
    }

    if (selectedCards?.length === 2) {
      // We don't have a match
      if (selectedCards[0].imageId !== selectedCards[1].imageId) {
        const ids = selectedCards.map((card) => card.id);
        const mutatedCards = cards.map((card) => ids.find((id) => card.id === id) ? ({ ...card, isFlipped: false }) : card);
        setSelectedCards([])
        // Add setTimeout for visual animation reasons
        setTimeout(() => {
          setCards(mutatedCards)
        }, 1000);
        return
      }
      // We have a match
      const ids = selectedCards.map((card) => card.id);
      const mutatedCards = cards.map((card) => ids.find((id) => card.id === id) ? ({ ...card, isFlipped: true, isMatched: true }) : card);
      if (!mutatedCards.some((card) => !card.isMatched)) {
        setCompletedGame(true)
      }
      setSelectedCards([])
      setCards(mutatedCards)
    }
  }, [selectedCards, cards])


  const handleFetchCards = async () => {
    try {
      const response = await fetchCards('/api/v2/imageIds', 5);
      const imageIds: number[] = await response.json();
      const cards = imageIds.map((card) => ({
        id: uuidv4(),
        imageId: card,
        isFlipped: false,
        isMatched: false
      }))
      setCards(cards)
    } catch (e) {
      // handle error here e.g pass it to snackbar and show to user that something did not go well or
      // console log it.
      // In our case I just call the function itself until there is no error.
      handleFetchCards()
    }
  };


  const handleSelectedCard = React.useCallback(({ id, imageId }: SelectedCardProps) => {
    if (selectedCards.find((card) => card.id === id)) return
    const cards = [{ id, imageId }, ...selectedCards];

    if (cards.length > 2) return
    setSelectedCards(cards)
  }, [selectedCards])


  const handleRestartGame = () => {
    handleFetchCards()
    setCompletedGame(false)
  }


  return  (
    <Content showButton={completedGame}>
      {completedGame
        ? (
          <ButtonWrapper>
            <Congrats>Congratulations!! You completed successfully your game...</Congrats>
            <Button onClick={handleRestartGame}>Play again!</Button>
          </ButtonWrapper>
        ) :
        (
          <Board>
            {cards.map(({ id, ...restCard }) => (
              <Card
                {...restCard}
                key={id}
                id={id}
                gridSize={gridSize}
                onCardSelection={handleSelectedCard}
              />
            ))}
          </Board>
        )
      }
    </Content>
  )
};

export default Game