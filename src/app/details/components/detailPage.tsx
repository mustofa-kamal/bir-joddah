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

      <div className="container mx-auto px-1">
        {/* Full-width Image (img0) with 4px top padding */}
        {img0 && (
          <div className="w-full mb-4 pt-4">  {/* Added pt-1 for 4px padding at the top */}
            <Image
              src={img0}
              alt={`${name}'s Image 0`}
              width={1200}  // Explicit width
              height={600}  // Explicit height
              className="object-cover rounded-lg"
            />
          </div>
        )}

        {/* Side by Side Images (img1 and img2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {img1 && (
            <div className="w-full">
              <Image
                src={img1}
                alt={`${name}'s Image 1`}
                width={600}  // Explicit width
                height={400}  // Explicit height
                className="object-cover rounded-lg"
              />
            </div>
          )}
          {img2 && (
            <div className="w-full">
              <Image
                src={img2}
                alt={`${name}'s Image 2`}
                width={600}  // Explicit width
                height={400}  // Explicit height
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
