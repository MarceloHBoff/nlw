import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.9);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 20px;
    font-size: 50px;
    color: #fff;
  }

  span {
    height: 10px;
    border-radius: 10px;
    width: 0;
    background: #34cb79;
    animation: loading 2s ease-in;
  }

  @keyframes loading {
    0% {
      width: 600px;
    }
    100% {
      width: 0;
    }
  }
`;
