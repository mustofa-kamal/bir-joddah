// Import necessary modules
import fs from 'fs';
import path from 'path';
import MainPage from './components/MainPage'; // Import the MainPage component

// Define the type for the fetched people data
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

// Async function to fetch the JSON data
async function getPeopleData(): Promise<Person[]> {
  const filePath = path.join(process.cwd(), 'data', 'people.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function HomePage() {
  const people: Person[] = await getPeopleData();

  // Render the MainPage client component and pass the data
  return <MainPage people={people} />;
}
