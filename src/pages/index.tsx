import { useState } from 'react';
import Head from 'next/head';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Input } from '../components/Input';
import { Container, Content, Error } from '../styles/pages/auth';
import { useAuth } from '../hooks/auth';
import { withSSRGuest } from '../utils/withSSRGuest';

const schema = yup.object({
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Digite seu email'),
  password: yup.string().required('Digite sua senha'),
});

interface SubmitProps {
  email: string;
  password: string;
}

function Home() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }: SubmitProps) => {
    try {
      setError(false);
      setLoading(true);
      await signIn({
        email,
        password,
      });
      router.push('/books');
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Ioasys Books - Sign In</title>
      </Head>

      <Container>
        <Content className="container">
          <Row>
            <Col md={6}>
              <h1 className="mb-5">
                <strong className="me-3">ioays</strong>
                Books
              </h1>

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Input type="email" name="email" label="Email" />

                  <div className="position-relative">
                    <Input name="password" label="Senha" type="password" />
                    <button
                      type="submit"
                      className="position-absolute"
                      disabled={loading}
                    >
                      Entrar
                      {loading && (
                        <Spinner
                          animation="border"
                          variant="danger"
                          size="sm"
                          className="ms-2"
                        />
                      )}
                    </button>
                  </div>

                  <Error isError={error}>Email e/ou senha incorretos.</Error>
                </Form>
              </Formik>
            </Col>
          </Row>
        </Content>
      </Container>
    </div>
  );
}

export default Home;

// Função para validar rotas públicas, caso o usuário esteja logado, é redirecionado para o dash.
export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async () => ({
    props: {},
  }),
);
