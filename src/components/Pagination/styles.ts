import styled from 'styled-components';

export const Container = styled.div`
  justify-content: end;
  margin-top: 1rem;

  button {
    border-radius: 50%;
    background: transparent;
    height: 38px;
    width: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(51, 51, 51, 0.2);

    img {
      width: 14px;
      height: 14px;
    }
  }

  div#description {
    margin-right: 1rem;
  }

  div#btn-right {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 2.5rem;

    div#btn-right {
      order: 1;
      margin-right: 1rem;
    }

    div#description {
      order: 2;
    }

    div#btn-left {
      order: 3;
    }
  }
`;
