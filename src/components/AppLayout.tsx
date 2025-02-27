import { ReactNode } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

type Props = {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
