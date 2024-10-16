// app/api/analytics/route.tsx
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Person } from '../../components/commonTypes';

export async function GET(req: Request) {
  const filePath = path.join(process.cwd(), 'data', 'finalize-new.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const people: Person[] = JSON.parse(jsonData);

  // Group by present_district
  const groupedByDistrict: { [district: string]: number } = {};
  // Group by present_division
  const groupedByDivision: { [division: string]: number } = {};
  // Group by profession
  const groupedByProfession: { [profession: string]: number } = {};
  
  const groupedByFacility: { [facility: string]: number } = {};
  

  people.forEach((person) => {
    // Grouping by present_district
    const district = person.present_district || 'Unknown';
    if (groupedByDistrict[district]) {
      groupedByDistrict[district] += 1;
    } else {
      groupedByDistrict[district] = 1;
    }

    // Grouping by present_division
    const division = person.present_division || 'Unknown';
    if (groupedByDivision[division]) {
      groupedByDivision[division] += 1;
    } else {
      groupedByDivision[division] = 1;
    }

    // Grouping by profession
    const profession = person.profession || 'Unknown';
    if (groupedByProfession[profession]) {
      groupedByProfession[profession] += 1;
    } else {
      groupedByProfession[profession] = 1;
    }

    // Grouping by facility
    const facility = person.facility_name || 'Unknown';
    if (groupedByFacility[facility]) {
      groupedByFacility[facility] += 1;
    } else {
      groupedByFacility[facility] = 1;
    }

  });

 

  // Convert to arrays
  const dataByDistrict = Object.entries(groupedByDistrict).map(([label, count]) => ({
    label,
    count,
  }));

  const dataByDivision = Object.entries(groupedByDivision).map(([label, count]) => ({
    label,
    count,
  }));

  const dataByProfession = Object.entries(groupedByProfession).map(([label, count]) => ({
    label,
    count,
  }));

  const dataByFacility = Object.entries(groupedByFacility).map(([label, count]) => ({
    label,
    count,
  }));

  return NextResponse.json({
    dataByDistrict,
    dataByDivision,
    dataByProfession,
    dataByFacility
  });
}
