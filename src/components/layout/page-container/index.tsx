import './index.css';
import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  children: any;
};
const PageContainer = ({ children }: Props) => {
  const { pathname } = useLocation();

  const elem = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    elem.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={'body'} ref={elem}>
      {children}
    </div>
  );
};

export default PageContainer;
