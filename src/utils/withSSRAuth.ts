import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { RedirectError } from '../services/errors/RedirectError';

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['@ioasys:token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return fn(ctx);
    } catch (err) {
      if (err instanceof RedirectError) {
        destroyCookie(ctx, '@ioasys:token');
        destroyCookie(ctx, '@ioasys:refreshToken');
        destroyCookie(ctx, '@ioasys:user');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }

    return fn(ctx);
  };
}
