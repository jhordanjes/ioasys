// Modal para visualização dos dados do livro.
import { useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IBook } from '../../interfaces/IBook';
import { Container, Content, ButtonClose, Wrapper } from './styles';

interface Props {
  onCloseModal: () => void;
  modalIsOpen: boolean;
  book: IBook;
}

export function ModalSeeDetail({ onCloseModal, modalIsOpen, book }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const authors = book.authors.join(', ');

  useEffect(() => {
    // Função para fechar o modal clicando fora.
    function handleClickOverlay(event: MouseEvent): void {
      if (
        contentRef.current &&
        event.target instanceof Node &&
        !contentRef.current.contains(event.target)
      ) {
        onCloseModal();
      }
    }

    if (modalIsOpen) {
      document.addEventListener('mouseup', handleClickOverlay);
    }
  }, [modalIsOpen, onCloseModal]);

  return (
    <Container role="dialog">
      <ButtonClose className="d-flex justify-content-end w-100 mb-2">
        <button
          type="button"
          className="bg-white border-0"
          onClick={onCloseModal}
        >
          <img src="/icons/close.svg" alt="Icon" />
        </button>
      </ButtonClose>
      <Content ref={contentRef}>
        <Row>
          <Col md={5}>
            <img
              src={book.imageUrl || 'images/book-default.svg'}
              alt={book.title}
              className="w-100"
            />
          </Col>
          <Col md={7}>
            <Wrapper>
              <h2>{book.title}</h2>
              <p id="subtitle">{authors}</p>

              <div className="mt-5">
                <h6 className="text-uppercase">Informações</h6>

                <ul className="mt-3">
                  <li>
                    <strong>Páginas</strong>
                    <span>{book.pageCount}</span>
                  </li>
                  <li>
                    <strong>Editora</strong>
                    <span>{book.publisher}</span>
                  </li>
                  <li>
                    <strong>Publicação</strong>
                    <span>{book.published}</span>
                  </li>
                  <li>
                    <strong>Idioma</strong>
                    <span>{book.language}</span>
                  </li>
                  <li>
                    <strong>ISBN-10</strong>
                    <span>{book.isbn10}</span>
                  </li>
                  <li>
                    <strong>ISBN-13</strong>
                    <span>{book.isbn13}</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5">
                <h6 className="text-uppercase">Resenha da editora</h6>

                <p>
                  <img src="/icons/quotes.svg" alt="icon" />
                  {book.description}
                </p>
              </div>
            </Wrapper>
          </Col>
        </Row>
      </Content>
    </Container>
  );
}
