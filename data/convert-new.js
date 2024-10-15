const fs = require('fs');

// Area lookup table for divisions and districts
const areaLookupTable = {
  "Barisal": ["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  "Chittagong": ["Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
  "Dhaka": ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  "Khulna": ["Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  "Mymensingh": ["Jamalpur", "Mymensingh", "Netrakona", "Sherpur"],
  "Rajshahi": ["Bogra", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi", "Sirajganj"],
  "Rangpur": ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  "Sylhet": ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"]
};

// Profession lookup table
const professionLookupTable = {
  "52": "Student",
  "73": "Other",
  "16": "Farming",
  "6": "Clerk",
  "8": "Computer related workers",
  "9": "Doctor, Dentists and Veterinarians",
  "74": "Driver and Contractor",
  "56": "Hawker",
  "23": "Home Care takers, Sweepers and related workers",
  "28": "Machine workers other than electrical",
  "30": "Managers (Whole and retail business)",
  "39": "Printing",
  "41": "Professional, technical and other uncategorized related staff",
  "46": "Sales Supervisor",
  "47": "Security Personnel",
  "48": "Seller of Insurance, real estate, business and related service",
  "53": "Tailors and other sewing workers",
  "59": "Teacher",
  "64": "Unclassified Clerical Workers",
  "72": "Unemployed",
  "70": "Workman, Welders and parts maker",
  "71": "Writer, Journalist, and related activities"
};

// Function to get division and district from address with case-insensitive lookup
const getDivisionAndDistrict = (address, case_id, addressType) => {
    if (!address) {
      console.log(`Null or undefined value found for ${addressType} in case_id: ${case_id}`);
      return { district: null, division: null };
    }
  
    const tokens = address.split(',').map(token => token.trim());
    const lastToken = tokens[tokens.length - 1].toLowerCase(); // Convert to lowercase for case-insensitive comparison
  
    for (const [division, districts] of Object.entries(areaLookupTable)) {
      for (const district of districts) {
        if (district.toLowerCase() === lastToken) { // Convert district to lowercase for comparison
          return { district: district, division: division }; // Return the original case-sensitive district and division
        }
      }
    }
  
    // If no match is found, log the last token
    console.log(`No match found for ${addressType} district: ${tokens[tokens.length - 1]} in case_id: ${case_id}`);
    return { district: tokens[tokens.length - 1], division: null };
  };
  
  // Function to transform the input data
  const transformData = (data) => {
    return data.map(record => {
      const { district: present_district, division: present_division } = getDivisionAndDistrict(record.present_address, record.id, 'present_address');
      const { district: permanent_district, division: permanent_division } = getDivisionAndDistrict(record.permanent_address, record.id, 'permanent_address');
  
      return {
        case_id: record.id,
        facility_name: record.facility_name,
        name: record.patient_name_en,
        father_name: record.father_name,
        contact_no: record.contact_no,
        present_local: record.present_address ? record.present_address.split(',').slice(0, -1).join(', ').trim() : null,
        present_district,
        present_division,
        permanent_local: record.permanent_address ? record.permanent_address.split(',').slice(0, -1).join(', ').trim() : null,
        permanent_district,
        permanent_division,
        type_of_service: record.type_of_service,
        nid: record.nid,
        facility_id: record.facility_id,
        gender: record.sex_id === 1 ? 'Male' : record.sex_id === 2 ? 'Female' : null,
        religion: record.religious_group_id === 1 ? 'Islam' : record.religious_group_id === 2 ? 'Hindu' : null,
        profession: professionLookupTable[record.occupation_type_id] || null,
        source: "https://medical-info.dghs.gov.bd/",
        age: null,
        school: null,
        work_at: null,
        date_of_birth: null,
        place_of_birth: null,
        place_of_dead: null,
        date_of_dead: null,
        biography: null,
        image_urls: ["/images/symbolic.jpeg"]
      };
    });
  };
  
  // Read input JSON file
  fs.readFile('combined-new.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the input file:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
      const transformedData = transformData(jsonData.data);
  
      // Write the transformed data to a new JSON file
      fs.writeFile('finalize-new.json', JSON.stringify(transformedData, null, 2), (err) => {
        if (err) {
          console.error('Error writing the output file:', err);
          return;
        }
        console.log('Transformed data written to finalize-new.json');
      });
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  });
  
  
