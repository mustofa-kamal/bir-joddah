// src/app/details/components/Detail.tsx

import TopHeader from '@/app/components/TopHeader';
import React from 'react';

type DetailPageProps = {
  name: string;
};

const Detail: React.FC<DetailPageProps> = ({ name }) => {
  return (
    <TopHeader text={name}/>
    
  );
};

export default Detail;
