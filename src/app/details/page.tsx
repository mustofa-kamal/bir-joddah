// src/app/details/page.tsx
"use client"


import { useEffect, useState } from 'react';
import Detail from './components/detailPage';

const DetailsPage = () => {
  const [name, setName] = useState<string | null>(null);
  

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const nameParam = queryParams.get('name');
    if (nameParam) {
      setName(nameParam);
    }
  }, []);

  if (!name) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Detail name={name} />
    </div>
  );
};

export default DetailsPage;
