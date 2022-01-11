import { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-1">
    {props.meta}
    <div className="max-w-screen-xl mx-auto">
      <div className="py-5 text-xl content" style={{ minHeight: '90vh' }}>
        {props.children}
      </div>
    </div>
    <div className="border-t border-gray-300 text-center py-8 text-sm">
      © Copyright {new Date().getFullYear()} {AppConfig.title}.
    </div>
  </div>
);

export { Main };
