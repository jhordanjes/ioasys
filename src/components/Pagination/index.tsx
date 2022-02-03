import { useRouter } from 'next/router';
import { Container } from './styles';

export interface IPagination {
  page: number;
  totalPages: number;
}

export function Pagination({ page, totalPages }: IPagination) {
  const router = useRouter();

  function handleCurrentPageChange(value: number): void {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('page', String(value));

    router.push({
      pathname: router.pathname,
      search: urlSearchParams.toString(),
    });
  }

  return (
    <Container className="d-flex">
      <div className="d-flex align-items-center">
        <div id="description">
          <p className="mb-0">
            Página
            <strong>{` ${page} `}</strong>
            de
            <strong>{` ${totalPages}`}</strong>
          </p>
        </div>
        <div id="btn-right">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => handleCurrentPageChange(page - 1)}
          >
            <img src="/icons/arrowRight.svg" alt="Icon" />
          </button>
        </div>

        <div id="btn-left">
          <button
            type="button"
            onClick={() => handleCurrentPageChange(page + 1)}
            disabled={page === totalPages}
          >
            <img src="/icons/arrowLeft.svg" alt="Icon" />
          </button>
        </div>
      </div>
    </Container>
  );
}
