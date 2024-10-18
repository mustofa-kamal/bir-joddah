'use client';

import Image from 'next/image';


import { Person } from "../components/commonTypes"


interface PeopleListProps {
  people: Person[];
  page: number;
  limit: number;
}

export default function PeopleList({ people, page, limit }: PeopleListProps) {
  return (
    <div>
      {people.length > 0 ? (
        <ul className="space-y-8">
          {people.map((person, index) => (


            <li key={index} className="relative border-t  border-gray-200 p-4 ">
              

              {/* Content */}
              <div className="relative pt-2 pb-2 pl-2 pr-2">
                {(index + 1) + limit * (page - 1)}
                {/* Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* First Column: Image and Image Title */}
                  <div className="text-center">
                    <Image
                      src={person.image_urls[0]}
                      alt={`Image of ${person.name}`}
                      className="w-100 h-100 mx-auto"
                      title={person.name}
                      width={100}
                      height={100}
                    />
                    <h2 className="text-2xl font-semibold mt-2">
                      {person.name}
                    </h2>
                  </div>

                  {/* Second Column: Name, Father's Name, Mother's Name, Home Address, Age */}
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {person.name}</p>
                    <p><strong>Father's Name: </strong> {person.father_name ? person.father_name : "Not on file"}</p>
                    <p><strong>Present Address: </strong>
                      {person.present_local && `${person.present_local}, `}
                      {person.present_district}
                    </p>

                  </div>


                  {/* Third Column: Profession, Died at, Died on */}
                  <div className="space-y-2">

                    <p><strong>Permanent Address: </strong>
                      {person.permanent_local && `${person.permanent_local}, `}
                      {person.permanent_district}
                    </p>

                    <p><strong>Contact No:</strong> {person.contact_no}</p>
                    <p><strong>Profession: </strong> {person.profession ? person.profession : "Not on file"}</p>
                   
                  </div>

                  {/* Fourth Column: Bio Snippet */}
                  <div className="space-y-2 md:col-span-2">
                    <p><strong>Bio Snippet: </strong> {person.type_of_service}</p>
                    <p><strong>Case Id: </strong> {person.case_id}</p>
                    <p><strong>Facility Name: </strong> {person.facility_name}</p>
                    <p><strong>Source: </strong>
                      <a href={person.source} target="_blank" rel="noopener noreferrer">
                      List from the Directorate General of Health Services, Bangladesh
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
}

