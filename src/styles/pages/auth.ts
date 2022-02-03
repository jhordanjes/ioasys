import styled, { keyframes, css } from 'styled-components';

const effectUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.main`
  height: 100vh;
  background: url('/images/bg/auth.png');
  background-size: cover;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    background: url('/images/bg/mobile.png');
    background-size: cover;
  }
`;

export const Content = styled.div`
  h1 {
    color: #fff;
    font-weight: 300;

    strong {
      font-weight: 700;
    }
  }

  form {
    div {
      button {
        background: #fff;
        color: #b22e6f;
        border-radius: 44px;
        font-weight: 500;
        right: 10px;
        top: 15px;
        padding: 0 15px;
        height: 36px;
        border: 0;
      }
    }
  }
`;

interface ErrorProps {
  isError: boolean;
}

export const Error = styled.div<ErrorProps>`
  color: #fff;
  background: rgba(255, 255, 255, 0.4);
  display: inline-block;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  position: relative;
  visibility: hidden;

  ${({ isError }) =>
    isError &&
    css`
      visibility: visible;
      animation: ${effectUp} ease-out 0.5s;
    `}

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(255, 255, 255, 0.4);
  }
`;
