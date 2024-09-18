#!/bin/bash

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Install Hardhat
echo "Installing Hardhat..."
npm install --save-dev hardhat

echo "All done! You can now run your Hardhat script."