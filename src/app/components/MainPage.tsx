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
  incident_neighborhood:string;
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
  // Modify fetchPeople to accept the searchQuery as a parameter
  const fetchPeople = async (
    newPage: number,
    filterProperty = '',
    filterValue = '',
    searchQueryValue = searchQuery, // Default to the state value if not passed
    selectedSortPropertyValue=selectedSortProperty // Default to the state value if not passed
  ) => {
    const queryParams = new URLSearchParams({
      page: newPage.toString(),
      limit: limit.toString(),
      sort: selectedSortPropertyValue,
      filterProperty: filterProperty,
      filterValue: filterValue,
      searchQuery: searchQueryValue, // Use the passed search query value
    });

    const res = await fetch(`/api/people?${queryParams.toString()}`);
    const data = await res.json();
    setPeople(data.people);
    setTotalPeople(data.total);
  };

  // Handle filtering
  const handleGoFilter = () => {
    if (selectedFilterProperty !== 'select_one' && filterInput.trim() !== '') {
      setPage(1); // Reset to first page on filter change
      fetchPeople(1, selectedFilterProperty, filterInput.trim());
    }
  };

  


  // Handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortvalue = e.target.value;
    setSelectedSortProperty(newSortvalue);
    fetchPeople(page, selectedFilterProperty, filterInput, searchQuery,newSortvalue  ); // Pass the new search query
  };

  // Handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    fetchPeople(page, selectedFilterProperty, filterInput, newSearchQuery); // Pass the new search query
  };

  // Handle pagination
  const handleNextPage = () => {
    const newPage = page + 1;
    if ( totalPeople-(newPage * limit) >-limit) {
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
              <option key={prop} value={prop}>{prop.replace('_', ' ')}</option>
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
            {propertiesToSortBy.map((prop) => (
              <option key={prop} value={prop}>{prop.replace('_', ' ')}</option>
            ))}
          </select>
        </div>

        {/* Search Box */}
        <div className="flex-1 sm:flex sm:justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md text-base w-full sm:w-40"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end space-x-4 mb-4">
        {totalPeople}:{page}
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
      <PeopleList people={people} page={page} limit={limit}/>
    </div>
  );
}
