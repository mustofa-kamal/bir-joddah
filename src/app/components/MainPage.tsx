'use client'; // Mark this as a client component

import { useState } from 'react';
import PeopleList from './PeopleList';

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

interface MainPageProps {
  people: Person[];
}

export default function MainPage({ people }: MainPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-1 p-0">
      {/* Menu at the top */}
      <div className="w-full p-2.5 bg-gray-200 border border-gray-300 flex items-center">
        {/* Menu content */}
        <nav className="flex space-x-4">
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
      <PeopleList people={people} searchQuery={searchQuery} />
    </div>
  );
}
