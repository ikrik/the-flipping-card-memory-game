import styled from 'styled-components';


export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;


export const Button = styled.button`
  background: white;
  padding: 8px 12px;
  color: #202839;
  font-weight: bold;
  border-radius: 4px;
  font-size: 18px;
  outline: none;
  border: 2px solid #202839;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: #fff;
    background: #202839;
    border: 2px solid #fff;
  }
`;


export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 60px;
`;


export const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ebe5dc;
  border: 2px solid #FF9678;
  backface-visibility: hidden;
`;


export const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;


interface CardWrapperProps {
  gridSize: number;
  isFlipped: boolean;
}

export const CardWrapper = styled.div<CardWrapperProps>`
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
  width: ${(props) => `${100 / props.gridSize}%`};
  height: ${(props) => `${100 / props.gridSize}%`};
  box-sizing: border-box;
  transform: ${(props) => props.isFlipped ? 'translateX(-100%) rotateY(-180deg)' : 'none'};
`;


export const Congrats = styled.div`
  color: rgb(244 243 243);
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 20px;
`;


interface ContentProps {
  showButton: boolean;
}

export const Content = styled.div<ContentProps>`
  width: 100%;
  display: ${(props) => props.showButton ? 'flex' : 'block'};
`;


export const GameWrapper = styled.div`
  width: calc(80vh - 60px);
  margin: 0 auto;
  grid-area: content;
  display: flex;
`;


export const Header = styled.h3`
  text-align: center;
  font-size: 38px;
  color: #FF9678;
  text-shadow: 2px 1px 2px rgb(27 27 27 / 74%);
  margin: 10px 0;
  grid-area: header;
`;


export const Layout = styled.div`
  background: #303d55;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px calc(100vh - 80px);
  gap: 0px 0px;
  grid-template-areas:
    "header"
    "content";
  overflow-y: auto;
`;
