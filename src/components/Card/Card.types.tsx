export interface CardProps {
  gridSize: number;
  id: string;
  imageId: number;
  isMatched: boolean;
  isFlipped: boolean;
  onCardSelection: (image: SelectedCardProps ) => void;
}

export type SelectedCardProps = Pick<CardProps, 'id' | 'imageId'>