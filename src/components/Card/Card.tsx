import React from 'react';
import { CardBack, CardImage, CardWrapper } from '../StyledComponents'
import { CardProps } from './Card.types';



const Card: React.FC<CardProps> = ({ id, imageId, isFlipped, isMatched, onCardSelection, ...restProps}) => {
  const toggleFlipped = () => {
    if (isMatched) return;
    if (!isFlipped) {
      onCardSelection({ id, imageId });
    }
  }

  return (
    <CardWrapper {...restProps} isFlipped={isFlipped} onClick={toggleFlipped}>
      <CardBack />
      <CardImage src={`https://picsum.photos/id/${imageId}/600`} alt={`${imageId}`} />
    </CardWrapper>
  );
}

export default Card