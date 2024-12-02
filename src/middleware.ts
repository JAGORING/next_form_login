import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/session';
import { redirect } from 'next/navigation';

interface Routes {
  [key: string]: boolean;
}
const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/create-account': true,
};

export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const { pathname } = request.nextUrl;
  const exists = publicOnlyUrls[pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/user-profile', request.url));
    }
  }
};

export const config = {
  matcher: ['/', '/login', '/profile', '/create-account'],
};
