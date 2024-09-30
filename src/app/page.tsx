// Import necessary modules
import fs from 'fs';
import path from 'path';
import MainPage from './components/MainPage'; // Import the MainPage component

// Define the type for the fetched people data
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
