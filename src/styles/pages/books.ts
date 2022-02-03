import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: url('/images/bg/main.png');
  background-size: cover;
  background-repeat: no-repeat;

  section.container {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    header {
      h1 {
        color: #333333;
        font-weight: 300;

        strong {
          font-weight: 700;
        }
      }

      @media (max-width: 768px) {
        h6 {
          display: none;
        }
      }
    }
  }
`;

export const Item = styled.div`
  background: #fff;
  padding: 0.7rem;
  box-shadow: 0px 6px 24px rgba(84, 16, 95, 0.13);
  border-radius: 4px;
  min-height: 170px;
  transition: 0.4s linear;

  &:hover {
    box-shadow: 0px 16px 80px rgba(84, 16, 95, 0.32);
  }

  button {
    text-align: left;
    align-items: start;

    div#image {
      width: 30%;
      margin: auto auto;
      box-shadow: 0px 6px 9px rgba(0, 0, 0, 0.15);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    div.description {
      flex: 1;
      min-height: 100%;

      h6 {
        font-size: 14px;
        color: #333;
      }

      span {
        font-size: 12px;
        color: #ab2680;
      }

      p {
        margin-bottom: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;
