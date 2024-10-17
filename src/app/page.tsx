// page.tsx

import MainPage from './components/MainPage';
import { Person } from "./components/commonTypes";

async function getPeopleData(page: number = 1, limit: number = 20): Promise<{ people: Person[]; total: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined in environment variables');
  }

  const res = await fetch(`${baseUrl}/api/people?page=${page}&limit=${limit}`, {
    // Optionally, set headers here
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const data = await res.json();
  return { people: data.people, total: data.total };
}

export default async function HomePage() {
  try {
    const { people, total } = await getPeopleData(); // Fetch initial data
    return <MainPage people={people} total={total} />;
  } catch (error) {
    console.error(error);
    return <div>Failed to load data.</div>;
  }
}
