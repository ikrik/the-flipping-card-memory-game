import { CardProps } from "../Card";

export interface GameProps {
  gridSize?: number;
}

export interface GameCardsProp extends Omit<CardProps, 'onCardSelection' | 'gridSize'> {}