require('dotenv').config();
const fs = require('fs');
const path = require('path');


console.log("Loading environment variables from the AWS Secret Manager...");

// If SECRET_MANAGER_ARN env doesnt exist, load from .env instead
if (!process.env.SECRET_MANAGER_ARN) {
  console.log('"SECRET_MANAGER_ARN" is not defined, loading from .env file...',);
}

// Parse the string from the Secret Manager
else {
  console.log('"SECRET_MANAGER_ARN" secret found, loading from AWS Secret Manager...');
  const environmentVariables = JSON.parse(process.env.SECRET_MANAGER_ARN);

  // Write the variables to a .env file
  const envFilePath = path.resolve(__dirname, '.env');

  const envFileContent = Object.entries(environmentVariables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envFilePath, envFileContent);
  console.log("Environment variables successfully loaded from AWS Secret Manager into .env file");

}

