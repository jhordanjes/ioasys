import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

export const Content = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.22);
  transition: 0.3s;
  border-radius: 4px;
  padding: 0.5rem 1rem;

  label {
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 4px;
  }

  ${props =>
    props.isFocused &&
    css`
      background: rgba(0, 0, 0, 0.32);
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: rgba(1, 1, 1, 0.2);
      box-shadow: 0 0 0 2px transparent;
    `}

  input {
    height: 100%;
    width: 100%;
    border: 0;
    outline: none;
    background: transparent;
    color: #fff;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
  }
`;

export const Error = styled.span`
  color: #fff;
  font-size: 0.8rem;
  padding-left: 1rem;
`;
