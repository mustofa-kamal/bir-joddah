'use client';

import Image from 'next/image';

interface Person {
  name: string;
  father_name: string;
  mother_name: string;
  home_city: string;
  home_district: string;
  age: number;
  profession: string;
  incident_city: string;
  incident_district: string;
  incident_on: string;
  bio_snippet: string;
  biography: string;
  image_urls: string[];
}

interface PeopleListProps {
  people: Person[];
  searchQuery: string;
}

export default function PeopleList({ people, searchQuery }: PeopleListProps) {
  const filteredPeople = people.filter((person) => {

  
    const searchLower = searchQuery.toLowerCase();
  
    // Convert all values to strings and include in an array
    const valuesToSearch = [person.name, person.father_name, person.mother_name, person.home_city, person.home_district, person.incident_city, person.incident_district, person.profession, person.bio_snippet, person.age.toString(), person.incident_on];

  
    // Check if any value includes the search query
    return valuesToSearch.some((value) =>
      value.toLowerCase().includes( searchLower)
    );
  }) 
  

  return (
    <div>
      {/* Results Count */}
      <div className="text-right mb-4">
        <span className="text-gray-700 font-medium">
          Results: {filteredPeople.length}
        </span>
      </div>

      {filteredPeople.length > 0 ? (
        <ul className="space-y-8">
          {filteredPeople.map((person, index) => (
            <li key={index} className="relative">
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
              <div className="relative pt-10 pb-10 pl-10 pr-8">
                {/* Image and Name at the Top, Centered */}
                <div className="text-center mb-4">
                  <Image
                    src={person.image_urls[0]}
                    alt={`Image of ${person.name}`}
                    className="w-12 h-12 rounded-full mx-auto"
                    title={person.name}
                    width={50}
                    height={50}
                  />
                  <h2 className="text-2xl font-semibold mt-2">
                    {person.name}
                  </h2>
                </div>
                {/* Detailed Information */}
                <div className="text-left space-y-2">
                  <p>
                    <strong>Father's Name:</strong> {person.father_name}
                  </p>
                  <p>
                    <strong>Mother's Name:</strong> {person.mother_name}
                  </p>
                  <p>
                    <strong>Home Address:</strong> {person.home_city},{" "}
                    {person.home_district}
                  </p>
                  <p>
                    <strong>Age:</strong> {person.age}
                  </p>
                  <p>
                    <strong>Profession:</strong> {person.profession}
                  </p>
                  <p>
                    <strong>Died at:</strong> {person.incident_city},{" "}
                    {person.incident_district}
                  </p>
                  <p>
                    <strong>Died on:</strong> {person.incident_on}
                  </p>
                  <p>
                    <strong>Bio Snippet:</strong> {person.bio_snippet}
                  </p>
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
