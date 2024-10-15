import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Person } from '../../components/commonTypes';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filePath = path.join(process.cwd(), 'data', 'finalize-new.json');
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
    const keysToSearch: (keyof Person)[] = [
      'case_id', 'name', 'father_name', 'contact_no', 'present_local', 'present_district',
      'present_division', 'permanent_local', 'permanent_district', 'permanent_division',
      'type_of_service', 'nid', 'facility_id', 'gender', 'profession', 'source', 'age', 
      'school', 'work_at', 'date_of_birth', 'place_of_birth', 'place_of_dead', 
      'date_of_dead', 'biography', 'image_urls'
    ];

    filteredPeople = filteredPeople.filter((person) => {
      return keysToSearch.some((key) => person[key]?.toString().toLowerCase().includes(searchLower));
    });
  }

  // Apply sorting
  filteredPeople.sort((a, b) => {
    const aValue = a[sort as keyof Person]?.toString() || '';
    const bValue = b[sort as keyof Person]?.toString() || '';
    return aValue.localeCompare(bValue);
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedPeople = filteredPeople.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    people: paginatedPeople,
    total: filteredPeople.length,
  });
}
