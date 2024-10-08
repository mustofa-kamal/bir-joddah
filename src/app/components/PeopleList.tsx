'use client';

import Image from 'next/image';


interface Person {
  name: string;
  father_name: string;
  mother_name: string;
  home_neighborhood: string;
  home_city: string;
  home_district: string;
  age: number;
  profession: string;
  incident_neighborhood:string;
  incident_city: string;
  incident_district: string;
  incident_on: string;
  bio_snippet: string;
  biography: string;
  image_urls: string[];
}

interface PeopleListProps {
  people: Person[];
  page:number;
  limit:number;
}

export default function PeopleList({ people, page, limit }: PeopleListProps ) {
  return (
    <div>
      {people.length > 0 ? (
        <ul className="space-y-8">
          {people.map((person, index) => (
     
            
            <li key={index} className="relative border border-gray-200 p-4 rounded-md">
              {/* Decorative Borders */}
              <div
                className="absolute top-0 left-0 right-0 h-4 bg-repeat-x"
                style={{
                  backgroundImage:
                    "url('/images/flower-border-horizontal.jpeg')",
                }}
              ></div>
              <div
                className="absolute bottom-0 left-0 right-0 h-4 bg-repeat-x"
                style={{
                  backgroundImage:
                    "url('/images/flower-border-horizontal.jpeg')",
                }}
              ></div>
              <div
                className="absolute top-0 bottom-0 left-0 w-4 bg-repeat-y"
                style={{
                  backgroundImage:
                    "url('/images/flower-border-vertical.jpeg')",
                }}
              ></div>
              <div
                className="absolute top-0 bottom-0 right-0 w-4 bg-repeat-y"
                style={{
                  backgroundImage:
                    "url('/images/flower-border-vertical.jpeg')",
                }}
              ></div>
 
 
              {/* Content */}
              <div className="relative pt-2 pb-2 pl-2 pr-2">
                {(index +1) + limit * (page-1)} 
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* First Column: Image and Image Title */}
                  <div className="text-center">
                    <Image
                      src={person.image_urls[0]}
                      alt={`Image of ${person.name}`}
                      className="w-100 h-100 mx-auto"
                      title={person.name}
                      width={100}
                      height={100}
                    />
                    <h2 className="text-2xl font-semibold mt-2">
                      {person.name}
                    </h2>
                  </div>
 
 
                  {/* Second Column: Name, Father's Name, Mother's Name, Home Address, Age */}
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {person.name}</p>
                    <p><strong>Father's Name:</strong> {person.father_name ? person.father_name : "Not on file"}</p>
                    <p><strong>Father's Name:</strong> {person.mother_name ? person.mother_name : "Not on file"}</p>
                    <p><strong>Home Address:</strong> {person.home_neighborhood}, {person.home_city}, {person.home_district}</p>
                  </div>
 
 
                  {/* Third Column: Profession, Died at, Died on */}
                  <div className="space-y-2">
                    <p><strong>Age:</strong> {person.age}</p>
                    <p><strong>Profession:</strong> {person.profession}</p>
                    <p><strong>Died at:</strong> {person.incident_neighborhood}, {person.incident_city}, {person.incident_district}</p>
                    <p><strong>Died on:</strong> {person.incident_on}</p>
                  </div>
 
 
                  {/* Fourth Column: Bio Snippet */}
                  <div className="space-y-2 md:col-span-2">
                    <p><strong>Bio Snippet:</strong> {person.bio_snippet}</p>
                  </div>
 
 
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
 }
 
