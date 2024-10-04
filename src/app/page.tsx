import MainPage from './components/MainPage';

interface Person {
  name: string;
  father_name: string;
  mother_name: string;
  home_city: string;
  home_district: string;
  age: number;
  profession: string;
  incident_city: string;
  incident_district: string;
  incident_on: string;
  bio_snippet: string;
  biography: string;
  image_urls: string[];
}

async function getPeopleData(page: number = 1, limit: number = 20): Promise<{ people: Person[]; total: number }> {
  const res = await fetch(`http://localhost:3000/api/people?page=${page}&limit=${limit}`);
  const data = await res.json();
  return { people: data.people, total: data.total };
}

export default async function HomePage() {
  const { people, total } = await getPeopleData(); // Fetch initial data

  return <MainPage people={people} total={total} />;
}

