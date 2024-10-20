// src/app/details/components/DetailPage.tsx
import { useSearchParams } from 'next/navigation';
import TopHeader from '@/app/components/TopHeader';
import React from 'react';
import Image from 'next/image';

const Detail: React.FC = () => {
  const searchParams = useSearchParams();

  // Get the query parameters from the URL
  const name = searchParams.get('name');
  const img0 = searchParams.get('img0');
  const img1 = searchParams.get('img1');
  const img2 = searchParams.get('img2');

  return (
    <div>
    <TopHeader text={name ?? 'No Name Provided'} />
    

    <div className="container mx-auto px-1  ">
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {img0 && (
          <Image
            src={img0}
            alt={`${name}'s Image 0`}
            width={800} // Example width for image optimization
            height={600} // Example height for image optimization
            className="object-cover rounded-lg"
            layout="responsive"
          />
        )}
        {img1 && (
          <Image
            src={img1}
            alt={`${name}'s Image 1`}
            width={600}
            height={400}
            className="object-cover rounded-lg"
            layout="responsive"
          />
        )}
        {img2 && (
          <Image
            src={img2}
            alt={`${name}'s Image 2`}
            width={600}
            height={400}
            className="object-cover rounded-lg"
            layout="responsive"
          />
        )}
      </div>
    </div>
    </div>
  );
};

export default Detail;
