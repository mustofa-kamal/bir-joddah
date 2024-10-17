const { execSync } = require('child_process');
const fs = require('fs');

// Function to get Firebase config
function getFirebaseConfig() {
  try {
    const config = execSync('firebase functions:config:get').toString();
    return JSON.parse(config);
  } catch (error) {
    console.error('Error fetching Firebase config:', error);
    process.exit(1);
  }
}

// Retrieve specific config variables
const firebaseConfig = getFirebaseConfig();
const baseUrl = firebaseConfig.nextjs?.base_url;

if (!baseUrl) {
  console.error('nextjs.base_url is not defined in Firebase config.');
  process.exit(1);
}

// Write to .env.production
const envContent = `NEXT_PUBLIC_BASE_URL=${baseUrl}\n`;

fs.writeFileSync('.env.production', envContent);

console.log('.env.production file created successfully.');
