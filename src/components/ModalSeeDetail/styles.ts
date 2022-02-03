import styled, { keyframes } from 'styled-components';

const up = keyframes`
  from {
    opacity: 0;
    transform: translateY(-80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 1.25rem;
  background-color: rgba(0, 0, 1, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 16px 80px rgba(0, 0, 0, 0.32);
  width: 769px;
  padding: 30px 0 30px 30px;
  animation: ${up} 0.2s linear;

  @media (max-width: 768px) {
    padding: 30px;
    width: 98%;
  }
`;

export const ButtonClose = styled.div`
  button {
    width: 35px;
    height: 35px;
    border-radius: 30px;

    img {
      width: 40%;
      height: 40%;
    }
  }
`;

export const Wrapper = styled.div`
  overflow: auto;
  max-height: 440px;
  padding-right: 1rem;
  margin-right: 0.5rem;

  p#subtitle {
    color: #ab2680;
  }

  ::-webkit-scrollbar {
    width: 4px;
    background: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ab2680;
    outline: 1px solid #ab2680;
    border-radius: 30px;
  }

  h6 {
    font-weight: 700;
    font-size: 0.9rem;
  }

  div {
    ul {
      padding-left: 0;
      margin-bottom: 0;

      li {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  p {
    color: #999999;

    img {
      width: 20px;
      margin-right: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding-right: 30px;
    margin-right: 0;
    max-height: 100%;
  }
`;
