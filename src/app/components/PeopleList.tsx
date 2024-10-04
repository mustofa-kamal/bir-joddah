'use client';

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
  image_urls: string[];
}

interface PeopleListProps {
  people: Person[];
}

export default function PeopleList({ people }: PeopleListProps) {
  if (!people || people.length === 0) {
    return <p className="text-center text-gray-500">No results found.</p>;
  }

  return (
    <div>
      <ul className="space-y-8">
        {people.map((person, index) => (
          <li key={index} className="relative border border-gray-200 p-4 rounded-md">
            {/* Person details */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Image and name */}
              <div className="text-center">
                <img
                  src={person.image_urls[0]}
                  alt={`Image of ${person.name}`}
                  className="w-100 h-100 mx-auto"
                  title={person.name}
                />
                <h2 className="text-2xl font-semibold mt-2">{person.name}</h2>
              </div>
              {/* Details */}
              <div className="space-y-2">
                <p><strong>Name:</strong> {person.name}</p>
                <p><strong>Father's Name:</strong> {person.father_name}</p>
                <p><strong>Mother's Name:</strong> {person.mother_name}</p>
                <p><strong>Home Address:</strong> {person.home_city}, {person.home_district}</p>
                <p><strong>Age:</strong> {person.age}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
