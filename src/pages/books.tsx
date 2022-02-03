import { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Alert, Col, Row } from 'react-bootstrap';
import { Loader } from '../components/Loader';
import { ModalSeeDetail } from '../components/ModalSeeDetail';
import { IPagination, Pagination } from '../components/Pagination';
import { useAuth } from '../hooks/auth';
import { IBook } from '../interfaces/IBook';
import { api } from '../services/apliClient';
import { Container, Item } from '../styles/pages/books';
import { withSSRAuth } from '../utils/withSSRAuth';

function Books() {
  const { signOut, user } = useAuth();
  const router = useRouter();
  const [pagination, setPagination] = useState<IPagination>();
  const [books, setBooks] = useState<IBook[]>([]);
  const [book, setBook] = useState<IBook>();
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGetBooks = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await api.get('/books', {
        params: {
          page: router.query.page || 1,
        },
      });
      setBooks(data.data);
      setPagination({ page: data.page, totalPages: data.totalPages });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [router.query]);

  useEffect(() => {
    handleGetBooks();
  }, [handleGetBooks]);

  const handleSeeDetail = async (data: IBook) => {
    setBook(data);
    setModalIsOpen(true);
  };

  const handleCloseModal = async () => {
    setBook(undefined);
    setModalIsOpen(false);
  };

  return (
    <>
      <Head>
        <title>Ioasys Books - Livros</title>
      </Head>

      {modalIsOpen && book && (
        <ModalSeeDetail
          book={book}
          modalIsOpen={modalIsOpen}
          onCloseModal={handleCloseModal}
        />
      )}

      {loading && <Loader />}

      <Container>
        <section className="container">
          <header className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">
              <strong className="me-3">ioays</strong>
              Books
            </h1>

            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-3">
                Bem vindo,
                <strong>{` ${user?.name}!`}</strong>
              </h6>
              <button
                type="button"
                className="bg-transparent border-0"
                onClick={signOut}
              >
                <img src="/icons/logOut.svg" alt="Icon" />
              </button>
            </div>
          </header>

          <Row>
            {books.length > 0 &&
              books.map(item => (
                <Col md={6} lg={3} className="mt-4" key={item.id}>
                  <Item className="d-flex align-items-center">
                    <button
                      className="d-flex bg-transparent border-0 h-100"
                      type="button"
                      onClick={() => handleSeeDetail(item)}
                    >
                      <div id="image">
                        <img
                          src={item.imageUrl || 'images/book-default.svg'}
                          alt={item.title}
                        />
                      </div>

                      <div className="description ms-2 d-flex flex-column justify-content-between">
                        <div>
                          <h6 className="mb-0">{item.title}</h6>
                          {item.authors.map(author => (
                            <span key={author} className="d-block">
                              {author}
                            </span>
                          ))}
                        </div>

                        <div className="mt-2">
                          <p>{`${item.pageCount} páginas`}</p>
                          <p>{`Editora ${item.publisher}`}</p>
                          <p>{`Publicado em ${item.published}`}</p>
                        </div>
                      </div>
                    </button>
                  </Item>
                </Col>
              ))}
            {books.length === 0 && !error && !loading && (
              <div className="d-flex flex-column align-items-center mt-5 mb-5">
                <img src="/icons/noData.svg" alt="Nada encontrado" width="90" />
                <h6 className="mt-2">Nada encontrado</h6>
              </div>
            )}
            {!loading && error && (
              <Col md={{ span: 4, offset: 4 }} className="mt-5 mb-5">
                <Alert variant="danger">
                  Erro ao buscar dados.
                  <button
                    type="button"
                    onClick={handleGetBooks}
                    className="ms-1 btn-link border-0 bg-transparent"
                  >
                    Tente novamente
                  </button>
                </Alert>
              </Col>
            )}
          </Row>

          {pagination && <Pagination {...pagination} />}
        </section>
      </Container>
    </>
  );
}
export default Books;

// Função para validar rotas privadas
export const getServerSideProps: GetServerSideProps = withSSRAuth(async () => ({
  props: {},
}));
