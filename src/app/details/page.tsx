// src/app/details/page.tsx
"use client";

import { Suspense } from 'react';
import Detail from './components/detailPage';

const DetailsPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Detail />
    </Suspense>
  );
};

export default DetailsPage;
