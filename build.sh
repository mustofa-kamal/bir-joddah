#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build Next.js application
npx next build

# Remove existing .next directory in functions
rm -rf functions/.next

# Copy the new .next directory to functions
cp -r .next functions/.next
