import Link from 'next/link';
import React, { Fragment } from 'react';
import { errorImage } from '@utils/index';
import { TitleText } from '../font';

interface ErrorCompProps {
  pageName: string;
}

const ErrorComp: React.FC<ErrorCompProps> = ({ pageName }) => {
  return (
    <Fragment>
      <div className="my-10 p-20 bg-white rounded-full text-center">
        <TitleText style="my-10 py-4 text-center">
          Error fetching {pageName}
        </TitleText>
        <img src={errorImage} className="w-[24vw] my-10 m-auto" alt="error" />
        <Link href="/" passHref>
          <a className="my-10 font-bold text-orange-500 text-xl py-4 text-center mx-auto">
            Visit Home
          </a>
        </Link>
      </div>
    </Fragment>
  );
};

export default ErrorComp;
