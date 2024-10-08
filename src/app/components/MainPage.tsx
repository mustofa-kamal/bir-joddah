'use client'; // Mark this as a client component

import { useState, useEffect } from 'react';
import PeopleList from './PeopleList';

interface Person {
  name: string;
  father_name: string;
  mother_name: string;
  home_neighborhood: string;
  home_city: string;
  home_district: string;
  age: number;
  profession: string;
  incident_neighborhood: string;
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
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);
  const [totalPeople, setTotalPeople] = useState<number>(total);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSortProperty, setSelectedSortProperty] = useState<string>('select_one');
  const [selectedFilterProperty, setSelectedFilterProperty] = useState<string>('select_one');
  const [filterInput, setFilterInput] = useState('');

  // List of properties available for sorting
  const propertiesToSortBy = [
    'name',
    'home_neighborhood',
    'home_city',
    'home_district',
    'age',
    'profession',
    'incident_neighborhood',
    'incident_city',
    'incident_district',
    'incident_on',
  ];

  // List of properties available for filtering
  const propertiesToFilterBy = [
    'name',
    'home_neighborhood',
    'home_city',
    'home_district',
    'age',
    'profession',
    'incident_neighborhood',
    'incident_city',
    'incident_district',
    'incident_on',
  ];

  // Fetch people with pagination, filtering, and sorting
  const fetchPeople = async (
    newPage: number,
    filterProperty = '',
    filterValue = '',
    searchQueryValue = searchQuery,
    selectedSortPropertyValue = selectedSortProperty
  ) => {
    const queryParams = new URLSearchParams({
      page: newPage.toString(),
      limit: limit.toString(),
      sort: selectedSortPropertyValue,
      filterProperty: filterProperty,
      filterValue: filterValue,
      searchQuery: searchQueryValue,
    });

    const res = await fetch(`/api/people?${queryParams.toString()}`);
    const data = await res.json();
    setPeople(data.people);
    setTotalPeople(data.total);
  };

  const handleGoFilter = () => {
    if (selectedFilterProperty !== 'select_one' && filterInput.trim() !== '') {
      setPage(1);
      fetchPeople(1, selectedFilterProperty, filterInput.trim());
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortvalue = e.target.value;
    setSelectedSortProperty(newSortvalue);
    fetchPeople(page, selectedFilterProperty, filterInput, searchQuery, newSortvalue);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    fetchPeople(page, selectedFilterProperty, filterInput, newSearchQuery);
  };

  const handleNextPage = () => {
    const newPage = page + 1;
    if (totalPeople - newPage * limit > -limit) {
      setPage(newPage);
      fetchPeople(newPage, selectedFilterProperty, filterInput);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      fetchPeople(newPage, selectedFilterProperty, filterInput);
    }
  };

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newFilterInput = e.target.value;
    if (newFilterInput.trim() === '') {
      setFilterInput(newFilterInput);
      fetchPeople(page, selectedFilterProperty, newFilterInput, searchQuery, selectedSortProperty);
    } else {
      setFilterInput(newFilterInput);
    }
  };

  return (
    <div className="p-0 space-y-6">


      <div className="w-full p-4 bg-gray-200 border border-gray-300 flex flex-wrap items-center space-y-4 sm:space-y-0">
        {/* Left-side controls (Filter, Sort, Search, Arrows) */}
        <div className="flex flex-wrap items-center space-x-6 flex-grow">
          {/* Filter By Section */}
          <div className="flex items-center space-x-2">
            <label htmlFor="filterSelect" className="text-gray-700">Filter by:</label>
            <select
              id="filterSelect"
              value={selectedFilterProperty}
              onChange={(e) => setSelectedFilterProperty(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-auto"
            >
              <option value="select_one">Select one</option>
              {propertiesToFilterBy.map((prop) => (
                <option key={prop} value={prop}>{prop.replace('_', ' ')}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter value..."
              className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-40"
              value={filterInput}
              onChange={handleFilterInput}
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
              className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-auto"
            >
              <option value="select_one">Select one</option>
              {propertiesToSortBy.map((prop) => (
                <option key={prop} value={prop}>{prop.replace('_', ' ')}</option>
              ))}
            </select>
          </div>

          {/* Search Box with Arrow Buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-40"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              &lt;&lt;
            </button>
            <button
              onClick={handleNextPage}
              disabled={page * limit >= totalPeople}
              className={`p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${page * limit >= totalPeople ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              &gt;&gt;
            </button>
          </div>
        </div>

        {/* Total Records Message (eye-catching) */}
        <div className="ml-auto flex items-center p-2 bg-yellow-100 border border-yellow-500 rounded-md text-lg font-bold text-yellow-900 shadow-lg w-full sm:w-auto mt-4 sm:mt-0">
          <svg
            className="w-6 h-6 mr-2 text-yellow-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m0-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            ></path>
          </svg>
          Total records: {totalPeople}
        </div>
      </div>


      {/* People List */}
      <PeopleList people={people} page={page} limit={limit} />
    </div>
  );
}
