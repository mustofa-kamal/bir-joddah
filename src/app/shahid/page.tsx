import fs from 'fs';
import path from 'path';
import Image from 'next/image';


// Define the type for the fetched people data
interface Person {
  name: string;
  father_name: string;
  mother_name:string;
  home_address: string;
  age: number;
  profession: string;
  incident_location: string;
  incident_on:string
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

  return (
    <div className="space-y-10 p-8">
      <h1 className="text-3xl font-bold mb-6">People Information</h1>
      <ul className="space-y-8">
        {people.map((person, index) => (
          <li key={index} className="relative">
            {/* Top Border */}
            <div
              className="absolute top-0 left-0 right-0 h-8 bg-repeat-x"
              style={{
                backgroundImage: "url('/images/flower-border-horizontal.jpeg')",
              }}
            ></div>
            {/* Bottom Border */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 bg-repeat-x"
              style={{
                backgroundImage: "url('/images/flower-border-horizontal.jpeg')",
              }}
            ></div>
            {/* Left Border */}
            <div
              className="absolute top-0 bottom-0 left-0 w-8 bg-repeat-y"
              style={{
                backgroundImage: "url('/images/flower-border-vertical.jpeg')",
              }}
            ></div>
            {/* Right Border */}
            <div
              className="absolute top-0 bottom-0 right-0 w-8 bg-repeat-y"
              style={{
                backgroundImage: "url('/images/flower-border-vertical.jpeg')",
              }}
            ></div>
            {/* Content */}
            <div className="relative pt-10 pb-10 pl-10 pr-8">


              {/* Images at the Top, Centered */}

             {/* Display image and title at the top, centered */}
              <div className="text-center mb-4">
                <Image
                  src={person.image_urls[0]} // Assuming only one image for simplicity
                  alt={`Image of ${person.name}`}
                  className="w-12 h-12 rounded-full mx-auto"
                  title={person.name} // Name as title
                  width={50} height={50} // Set the image size to 50x50px
                />
                <h2 className="text-2xl font-semibold mt-2">{person.name}</h2>
              </div>



              {/* Left-Aligned Text */}
              <div className="text-left space-y-2">
                <p>
                  <strong>Father's Name:</strong> {person.father_name}
                </p>
                <p>
                  <strong>Mother's Name:</strong> {person.mother_name}
                </p>
                <p>
                  <strong>Home Address:</strong> {person.home_address}
                </p>
                <p>
                  <strong>Age:</strong> {person.age}
                </p>
                <p>
                  <strong>Profession:</strong> {person.profession}
                </p>
                <p>
                  <strong>Died at:</strong> {person.incident_location}
                </p>
                <p>
                  <strong>Died on:</strong> {person.incident_on}
                </p>
                <p>
                  <strong>Bio Snippet:</strong> {person.bio_snippet}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
