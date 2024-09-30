'use client'; // This directive tells Next.js this is a client component

import Image from 'next/image';

interface Person {
  name: string;
  father_name: string;
  mother_name: string;
  home_address: string;
  age: string;
  profession: string;
  incident_location: string;
  incident_on: string;
  bio_snippet: string;
  image_urls: string[];
}

interface PeopleListProps {
  people: Person[];
  searchQuery: string;
}

export default function PeopleList({ people, searchQuery }: PeopleListProps) {
  // Filter the people based on the search query
  const filteredPeople = people.filter((person) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      person.name.toLowerCase().includes(searchLower) ||
      person.father_name.toLowerCase().includes(searchLower) ||
      person.mother_name.toLowerCase().includes(searchLower) ||
      person.home_address.toLowerCase().includes(searchLower) ||
      person.profession.toLowerCase().includes(searchLower) ||
      person.bio_snippet.toLowerCase().includes(searchLower)
      // Add other fields if necessary
    );
  });

  return (
    <div>
      {/* Results Count */}
      <div className="text-right mb-4">
        <span className="text-gray-700 font-medium">
          Results: {filteredPeople.length}
        </span>
      </div>

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
                backgroundImage: "url('/images/flower-border-vertical.jpeg')",
              }}
            ></div>
            <div
              className="absolute top-0 bottom-0 right-0 w-4 bg-repeat-y"
              style={{
                backgroundImage: "url('/images/flower-border-vertical.jpeg')",
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
                <h2 className="text-2xl font-semibold mt-2">{person.name}</h2>
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
                  <strong>Home Address:</strong> {person.home_address}
                </p>
                <p>
                  <strong>Age:</strong> {person.age}
                </p>
                <p>
                  <strong>Profession:</strong> {person.profession}
                </p>
                <p>
                  <strong>Died at:</strong> {person.incident_location}
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
    </div>
  );
}
