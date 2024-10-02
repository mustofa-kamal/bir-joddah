'use client'; // Mark this as a client component

import { useState, useEffect } from 'react';
import PeopleList from './PeopleList';

interface Person {
  name: string;
  father_name: string;
  mother_name: string;
  home_city: string;
  home_district: string;
  age: number; // Number type for age
  profession: string;
  incident_city: string;
  incident_district: string;
  incident_on: string; // ISO date string
  bio_snippet: string;
  biography: string;
  image_urls: string[];
}

interface MainPageProps {
  people: Person[];
}

export default function MainPage({ people }: MainPageProps) {
  // State variables for search, sort, and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortProperty, setSelectedSortProperty] = useState<string>('select_one');
  const [selectedFilterProperty, setSelectedFilterProperty] = useState<string>('select_one');
  const [filterInput, setFilterInput] = useState('');
  const [appliedFilterProperty, setAppliedFilterProperty] = useState<string>('select_one');
  const [appliedFilterValue, setAppliedFilterValue] = useState<string>('');
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [sortedPeople, setSortedPeople] = useState<Person[]>(people);

  // Properties available for sorting
  const propertiesToSortBy: string[] = [
    'select_one', // Added "Select one" as the first option
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

  // Properties available for filtering (excluding 'bio_snippet', 'biography', 'image_urls')
  const propertiesToFilterBy: string[] = [
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

  // Helper function to format property names from snake_case to Title Case
  function formatPropertyName(propName: string): string {
    return propName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Handle the "Go" button click for filtering
  const handleGoFilter = () => {
    if (
      selectedFilterProperty !== 'select_one' &&
      filterInput.trim() !== ''
    ) {
      setAppliedFilterProperty(selectedFilterProperty);
      setAppliedFilterValue(filterInput.trim());
    } else {
      // Reset filter if "Select one" is chosen or input is empty
      setAppliedFilterProperty('select_one');
      setAppliedFilterValue('');
    }
  };

  // Handle the "Sort By" change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSortProperty(value);
  };

  // Effect to handle filtering based on appliedFilterProperty and appliedFilterValue
  useEffect(() => {
    let updatedPeople = [...people];

    // Apply Filter
    if (appliedFilterProperty !== 'select_one' && appliedFilterValue.trim() !== '') {
      updatedPeople = updatedPeople.filter((person) => {
        const propValue = person[appliedFilterProperty as keyof Person];
        if (propValue == null) return false;
        return propValue.toString().toLowerCase().includes(appliedFilterValue.toLowerCase());
      });
    }

    // Apply Search
    if (searchQuery.trim() !== '') {
      const searchLower = searchQuery.toLowerCase();
      updatedPeople = updatedPeople.filter((person) => {
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

        // Check if any key includes the search query
        return keysToSearch.some((key) => {
          const value = person[key];
          return value != null && value.toString().toLowerCase().includes(searchLower);
        });
      });
    }

    setFilteredPeople(updatedPeople);
  }, [people, appliedFilterProperty, appliedFilterValue, searchQuery]);

  // Effect to handle sorting based on selectedSortProperty
  useEffect(() => {
    let sorted = [...filteredPeople];

    if (selectedSortProperty !== 'select_one') {
      sorted.sort((a, b) => {
        const prop = selectedSortProperty as keyof Person;
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
      });
    }

    setSortedPeople(sorted);
  }, [filteredPeople, selectedSortProperty]);

  return (
    <div className="p-0 space-y-6">
      {/* Top Controls: Filter By, Sort By, and Search Box */}
      <div className="w-full p-4 bg-gray-200 border border-gray-300 flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Filter By Section */}
        <div className="flex items-center space-x-2">
          {/* Filter By Label */}
          <label htmlFor="filterSelect" className="text-gray-700">
            Filter by:
          </label>
          {/* Filter By Select */}
          <select
            id="filterSelect"
            value={selectedFilterProperty}
            onChange={(e) => setSelectedFilterProperty(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-base"
          >
            <option value="select_one">Select one</option>
            {propertiesToFilterBy.map((prop) => (
              <option key={prop} value={prop}>
                {formatPropertyName(prop)}
              </option>
            ))}
          </select>
          {/* Filter Input Box */}
          <input
            type="text"
            placeholder="Enter value..."
            className="p-2 border border-gray-300 rounded-md text-base w-40"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
          {/* Go Button */}
          <button
            onClick={handleGoFilter}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go
          </button>
        </div>

        {/* Sort By Section */}
        <div className="flex items-center space-x-2">
          {/* Sort By Label */}
          <label htmlFor="sortSelect" className="text-gray-700">
            Sort by:
          </label>
          {/* Sort By Select */}
          <select
            id="sortSelect"
            value={selectedSortProperty}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md text-base"
          >
            <option value="select_one">Select one</option>
            {propertiesToSortBy.slice(1).map((prop) => ( // Exclude 'select_one' from being repeated
              <option key={prop} value={prop}>
                {formatPropertyName(prop)}
              </option>
            ))}
          </select>
          {/* Results Count */}
          <span className="font-bold text-gray-700 ml-4">
            Results: {filteredPeople.length}
          </span>
        </div>

        {/* Search Box Section */}
        <div className="flex-grow sm:flex sm:justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* People List */}
      <PeopleList
        people={sortedPeople}
      />
    </div>
  );
}
