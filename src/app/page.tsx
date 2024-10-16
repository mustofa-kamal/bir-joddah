import MainPage from './components/MainPage';

import { Person } from "./components/commonTypes"





async function getPeopleData(page: number = 1, limit: number = 20): Promise<{ people: Person[]; total: number }> {
  const res = await fetch(`http://localhost:3000/api/people?page=${page}&limit=${limit}`);
  const data = await res.json();
  return { people: data.people, total: data.total };
}

export default async function HomePage() {
  const { people, total } = await getPeopleData(); // Fetch initial data
  return <MainPage people={people} total={total} />; 
}

