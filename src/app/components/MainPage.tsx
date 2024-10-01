'use client';

import { useState } from 'react';
import PeopleList from './PeopleList';

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

interface MainPageProps {
  people: Person[];
}

export default function MainPage({ people }: MainPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortProperty, setSelectedSortProperty] = useState<keyof Person>('name');

  const propertiesToSortBy: (keyof Person)[] = [
    'name',
    'father_name',
    'mother_name',
    'home_city',
    'home_district',
    'age',
    'profession',
    'incident_city',
    'incident_district',
    'incident_on',
  ];

  function formatPropertyName(propName: string): string {
    return propName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className="space-y-1 p-0">
      {/* Menu at the top */}
      <div className="w-full p-2.5 bg-gray-200 border border-gray-300 flex items-center">
        {/* Menu content */}
        <nav className="flex space-x-4 items-center">
          {/* Select Component */}
          <label htmlFor="sortSelect" className="text-gray-700 mr-2">
            Sort by:
          </label>
          <select
            id="sortSelect"
            value={selectedSortProperty}
            onChange={(e) => setSelectedSortProperty(e.target.value as keyof Person)}
            className="p-2 border border-gray-300 rounded-md text-base"
          >
            {propertiesToSortBy.map((prop) => (
              <option key={prop} value={prop}>
                {formatPropertyName(prop)}
              </option>
            ))}
          </select>
          {/* Existing menu items */}
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </a>
          <a href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </a>
          {/* Add more menu items as needed */}
        </nav>
        {/* Spacer to push the search box to the right */}
        <div className="flex-grow"></div>
        {/* Search Box on the right */}
        <div className="text-right">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md text-base w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Pass the people data and searchQuery to the PeopleList component */}
      <PeopleList
        people={people}
        searchQuery={searchQuery}
        sortProperty={selectedSortProperty}
      />
    </div>
  );
}
