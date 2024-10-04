'use client'; // Mark this as a client component

import { useState, useEffect } from 'react';
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
  total: number;
}

export default function MainPage({ people: initialPeople, total }: MainPageProps) {
  // State variables for pagination, search, sort, and filter
  const [people, setPeople] = useState<Person[]>(initialPeople); // Holds the list of people
  const [page, setPage] = useState<number>(1); // Current page
  const [limit] = useState<number>(20); // Number of items per page
  const [totalPeople, setTotalPeople] = useState<number>(total); // Total number of people
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortProperty, setSelectedSortProperty] = useState<string>('select_one');
  const [selectedFilterProperty, setSelectedFilterProperty] = useState<string>('select_one');
  const [filterInput, setFilterInput] = useState('');
  const [appliedFilterProperty, setAppliedFilterProperty] = useState<string>('select_one');
  const [appliedFilterValue, setAppliedFilterValue] = useState<string>('');
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(initialPeople);
  const [sortedPeople, setSortedPeople] = useState<Person[]>(initialPeople);

  // Properties available for sorting
  const propertiesToSortBy: string[] = [
    'select_one',
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

  // Properties available for filtering
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

  // Helper function to format property names
  function formatPropertyName(propName: string): string {
    return propName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Handle the "Go" button click for filtering
  const handleGoFilter = () => {
    if (selectedFilterProperty !== 'select_one' && filterInput.trim() !== '') {
      setAppliedFilterProperty(selectedFilterProperty);
      setAppliedFilterValue(filterInput.trim());
    } else {
      setAppliedFilterProperty('select_one');
      setAppliedFilterValue('');
    }
  };

  // Handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSortProperty(value);
  };

  // Fetch people based on the current page
  const fetchPeople = async (newPage: number) => {
    const res = await fetch(`/api/people?page=${newPage}&limit=${limit}`);
    const data = await res.json();
    setPeople(data.people);
    setTotalPeople(data.total);
  };

  // Handle "Next" button click
  const handleNextPage = () => {
    if (page * limit < totalPeople) {
      const newPage = page + 1;
      setPage(newPage);
      fetchPeople(newPage);
    }
  };

  // Handle "Previous" button click
  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchPeople(newPage);
    }
  };

  // Effect to handle filtering based on appliedFilterProperty and appliedFilterValue
  useEffect(() => {
    let updatedPeople = [...people];

    // Apply Filter
    if (appliedFilterProperty !== 'select_one' && appliedFilterValue.trim() !== '') {
      updatedPeople = updatedPeople.filter((person) => {
        const propValue = person[appliedFilterProperty as keyof Person];
        if (propValue == null) return false;
        const propStr = propValue.toString().toLowerCase();
        const filterStr = appliedFilterValue.toLowerCase();
        return propStr.includes(filterStr);
      });
    }

    // Apply Search
    if (searchQuery.trim() !== '') {
      const searchLower = searchQuery.toLowerCase();
      updatedPeople = updatedPeople.filter((person) => {
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

        if (aValue == null && bValue != null) return -1;
        if (aValue != null && bValue == null) return 1;
        if (aValue == null && bValue == null) return 0;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }

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
          <label htmlFor="filterSelect" className="text-gray-700">Filter by:</label>
          <select
            id="filterSelect"
            value={selectedFilterProperty}
            onChange={(e) => setSelectedFilterProperty(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-base"
          >
            <option value="select_one">Select one</option>
            {propertiesToFilterBy.map((prop) => (
              <option key={prop} value={prop}>{formatPropertyName(prop)}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter value..."
            className="p-2 border border-gray-300 rounded-md text-base w-40"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          />
          <button
            onClick={handleGoFilter}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go
          </button>
        </div>

        {/* Sort By Section */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sortSelect" className="text-gray-700">Sort by:</label>
          <select
            id="sortSelect"
            value={selectedSortProperty}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md text-base"
          >
            <option value="select_one">Select one</option>
            {propertiesToSortBy.slice(1).map((prop) => (
              <option key={prop} value={prop}>{formatPropertyName(prop)}</option>
            ))}
          </select>
        </div>

        {/* Search Box Section */}
        <div className="flex-1 sm:flex sm:justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end space-x-4 mb-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          &lt;&lt; Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * limit >= totalPeople}
          className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${page * limit >= totalPeople ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next &gt;&gt;
        </button>
      </div>

      {/* People List */}
      <PeopleList people={sortedPeople} />
    </div>
  );
}
