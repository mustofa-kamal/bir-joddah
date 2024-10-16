'use client'; // Mark this as a client component

import { useState, useEffect } from 'react';
import PeopleList from './PeopleList';
import PageNavigator from './PageNavigator';

import { Person } from "./commonTypes"
import AnalyticsComponent from './AnalyticsComponent'; // Import the AnalyticsComponent


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
  const [view, setView] = useState<'list' | 'analytics'>('list');


  

  // List of properties available for sorting
  const propertiesToSortBy = [
    'name',
    'present_district',
    'permanent_district',
    'profession',
    'facility_name'

  ];

  // List of properties available for filtering
  const propertiesToFilterBy = [
    'name',
    'present_district',
    'permanent_district',
    'profession',
    'facility_name'
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
    setPage(1);
    fetchPeople(1, selectedFilterProperty, filterInput, newSearchQuery);
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
    const newFilterInput = e.target.value;
    if (newFilterInput.trim() === '') {
      setFilterInput(newFilterInput);
      fetchPeople(page, selectedFilterProperty, newFilterInput, searchQuery, selectedSortProperty);
    } else {
      setFilterInput(newFilterInput);
    }
  };

  return (
    <div className="p-0">




<div className="bg-gray-500 flex items-center justify-center p-1">
  <p className="text-white font-bold">Honoring the brave who gave their lives for our freedom with our deepest gratitude</p>
</div>


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

            <PageNavigator page={page} totalPeople={totalPeople} limit={limit} selectedFilterProperty={selectedFilterProperty}

              filterInput={filterInput} setPage={setPage} fetchPeople={fetchPeople} />
          </div>

        </div>

        {/* Right-side labels and total records */}
        <div className="flex items-center space-x-4">
          {/* Labels */}
          <button
            onClick={() => setView('list')}
            className={`p-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md hover:bg-blue-600`}
          >
            List All
          </button>
          <button
            onClick={() => setView('analytics')}
            className={`p-2 ${view === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md hover:bg-blue-600`}
          >
            Analytics
          </button>

          {/* Total Records Message */}
          <div className="flex items-center p-2 bg-yellow-100 border border-yellow-500 rounded-md text-lg font-bold text-yellow-900 shadow-lg">
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
            Records: {totalPeople}
          </div>
        </div>
      </div>


      {/* Conditional Rendering based on view state */}
      {view === 'list' ? (
        <>
          {/* People List */}
          <PeopleList people={people} page={page} limit={limit} />

          <div className="flex pb-4 pr-4 w-full">
            <div className="ml-auto">
              <PageNavigator
                page={page}
                totalPeople={totalPeople}
                limit={limit}
                selectedFilterProperty={selectedFilterProperty}
                filterInput={filterInput}
                setPage={setPage}
                fetchPeople={fetchPeople}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Analytics View */}
          <AnalyticsComponent />
        </>
      )}


    </div>
  );
}
