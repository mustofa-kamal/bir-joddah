#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build Next.js application
npx next build

# Remove existing .next directory in functions
rm -rf functions/.next

# Copy the new .next directory to functions
cp -r .next functions/.next

# Remove existing data directory in functions
rm -rf functions/data


# Ensure the data directory exists in the new location
mkdir -p functions/data

# Copy the finalize-new.json file to the functions/data directory
cp data/finalize-new.json functions/data/
