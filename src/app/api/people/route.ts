import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Person {
  name: string;
  father_name: string;
  mother_name: string;
  home_neighborhood:string;
  home_city: string;
  home_district: string;
  age: number;
  profession: string;
  incident_neighborhood:string;
  incident_city: string;
  incident_district: string;
  incident_on: string;
  bio_snippet: string;
  image_urls: string[];
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filePath = path.join(process.cwd(), 'data', 'people.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const people: Person[] = JSON.parse(jsonData);

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 20;
  const sort = searchParams.get('sort') || 'name';
  const filterProperty = searchParams.get('filterProperty') || '';
  const filterValue = searchParams.get('filterValue') || '';
  const searchQuery = searchParams.get('searchQuery') || '';

  let filteredPeople = people;

  // Apply filtering
  if (filterProperty && filterValue) {
    filteredPeople = filteredPeople.filter((person) => {
      const propValue = person[filterProperty as keyof Person];
      return propValue && propValue.toString().toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  // Apply search
  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    filteredPeople = filteredPeople.filter((person) => {
      const keysToSearch: (keyof Person)[] = ['name', 'father_name', 'mother_name', 'home_neighborhood', 'home_city', 'home_district','age','profession', 'incident_neighborhood','incident_city','incident_district','incident_on','bio_snippet'];
      return keysToSearch.some((key) => person[key]?.toString().toLowerCase().includes(searchLower));
    });
  }

  // Apply sorting
  filteredPeople.sort((a, b) => {
    const aValue = a[sort as keyof Person];
    const bValue = b[sort as keyof Person];
    return (aValue?.toString().localeCompare(bValue?.toString())) || 0;
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedPeople = filteredPeople.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    people: paginatedPeople,
    total: filteredPeople.length,
  });
}
