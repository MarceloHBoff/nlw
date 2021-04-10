import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Content = styled.main`
  background: var(--color-box-base);
  width: 100%;
  max-width: 74rem;
  border-radius: 0.8rem;
  margin: -3.2rem auto 3.2rem;
  padding-top: 6.4rem;
  overflow: hidden;

  fieldset {
    border: 0;
    padding: 0 2.4rem;

    legend {
      font: 700 2.4rem Archivo;
      color: var(--color-text-title);
      margin-bottom: 2.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid var(--color-line-in-white);

      button {
        background: none;
        border: 0;
        color: var(--color-primary);
        font: 700 1.6rem Archivo;
        cursor: pointer;
        transition: all 0.2s;

        :hover {
          color: var(--color-primary-dark);
        }
      }
    }
  }

  fieldset + fieldset {
    margin-top: 6.4rem;
  }
`;

export const Footer = styled.footer`
  padding: 4rem 2.4rem;
  background: var(--color-box-footer);
  border-top: 1px solid var(--color-line-in-white);
  margin-top: 6.4rem;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--color-text-complement);

    img {
      margin-right: 2rem;
    }
  }

  button {
    width: 100%;
    height: 5.6rem;
    background: var(--color-secundary);
    color: var(--color-button-text);
    border: 0;
    border-radius: 0.8rem;
    cursor: pointer;
    font: 700 1.6rem Archivo;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s;
    margin-top: 3.2rem;

    :hover {
      background: var(--color-secundary-dark);
    }
  }
`;

export const ScheduleItem = styled.div`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    column-gap: 1.6rem;
  }
`;
