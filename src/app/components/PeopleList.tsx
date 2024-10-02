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
  sortProperty: string; // Changed from keyof Person to string to include 'select_one'
  filterProperty: string; // Can be 'select_one' or a valid key
  filterValue: string;
}

export default function PeopleList({
  people,
  searchQuery,
  sortProperty,
  filterProperty,
  filterValue,
}: PeopleListProps) {
  // Apply search and filter
  const filteredPeople = people.filter((person) => {
    const searchLower = searchQuery.toLowerCase();

    // Initialize search condition
    let matchesSearch = true;
    if (searchQuery.trim() !== '') {
      // Array of keys to search
      const keysToSearch: (keyof Person)[] = [
        'name',
        'father_name',
        'mother_name',
        'home_city',
        'home_district',
        'incident_city',
        'incident_district',
        'profession',
        'bio_snippet',
        'age',
        'incident_on',
      ];

      // Map over the keys to get the corresponding values
      const valuesToSearch = keysToSearch.map((key) => {
        const value = person[key];
        return value != null ? value.toString().toLowerCase() : '';
      });

      // Check if any value includes the search query
      matchesSearch = valuesToSearch.some((value) => value.includes(searchLower));
    }

    // Initialize filter condition
    let matchesFilter = true;
    if (filterProperty !== 'select_one' && filterValue.trim() !== '') {
      const filterProp = filterProperty as keyof Person;
      const propValue = person[filterProp];

      if (propValue != null) {
        // Convert to string for comparison
        const propValueStr = propValue.toString().toLowerCase();
        const filterValueLower = filterValue.toLowerCase();

        matchesFilter = propValueStr.includes(filterValueLower);
      } else {
        matchesFilter = false;
      }
    }

    // Return true only if both search and filter conditions are met
    return matchesSearch && matchesFilter;
  });

  // Sort the filtered people only if sortProperty is not 'select_one'
  const sortedPeople =
    sortProperty !== 'select_one'
      ? [...filteredPeople].sort((a, b) => {
          const prop = sortProperty as keyof Person;
          const aValue = a[prop];
          const bValue = b[prop];

          // Handle undefined or null values
          if (aValue == null && bValue != null) return -1;
          if (aValue != null && bValue == null) return 1;
          if (aValue == null && bValue == null) return 0;

          // Handle number comparison
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
          }

          // Handle date comparison
          if (prop === 'incident_on') {
            const aDate = new Date(aValue.toString());
            const bDate = new Date(bValue.toString());
            return aDate.getTime() - bDate.getTime();
          }

          // Handle string comparison
          const aStr = aValue.toString().toLowerCase();
          const bStr = bValue.toString().toLowerCase();

          if (aStr < bStr) return -1;
          if (aStr > bStr) return 1;
          return 0;
        })
      : filteredPeople; // If 'select_one', keep the original order

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
          {sortedPeople.map((person, index) => (
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
                    <strong>Home Address:</strong> {person.home_city}, {person.home_district}
                  </p>
                  <p>
                    <strong>Age:</strong> {person.age}
                  </p>
                  <p>
                    <strong>Profession:</strong> {person.profession}
                  </p>
                  <p>
                    <strong>Died at:</strong> {person.incident_city}, {person.incident_district}
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
