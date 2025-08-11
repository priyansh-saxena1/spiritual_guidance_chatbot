#!/bin/bash

# MongoDB Setup Script for DSCPL Spiritual Assistant

echo "🕉️  DSCPL MongoDB Setup"
echo "======================="

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "📦 Installing MongoDB Community Edition..."
    
    # Import MongoDB public GPG key
    curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
    
    # Create list file for MongoDB
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
    
    # Update package database and install MongoDB
    sudo apt-get update
    sudo apt-get install -y mongodb-org
else
    echo "✅ MongoDB is already installed"
fi

# Start MongoDB service
echo "🚀 Starting MongoDB service..."
sudo systemctl start mongod
sudo systemctl enable mongod

# Check if MongoDB is running
if sudo systemctl is-active --quiet mongod; then
    echo "✅ MongoDB is running successfully"
else
    echo "❌ Failed to start MongoDB"
    exit 1
fi

# Create database and initial collections
echo "📊 Setting up DSCPL database..."

mongosh --eval "
use dscpl_spiritual;

// Create collections
db.createCollection('users');
db.createCollection('programs');
db.createCollection('user_progress');
db.createCollection('spiritual_content');

// Create indexes for better performance
db.users.createIndex({ 'username': 1 }, { unique: true });
db.users.createIndex({ 'email': 1 }, { unique: true });
db.user_progress.createIndex({ 'user_id': 1, 'date': -1 });
db.programs.createIndex({ 'user_id': 1, 'type': 1 });

// Insert sample spiritual content
db.spiritual_content.insertMany([
  {
    type: 'satsang',
    title: 'Morning Satsang: Divine Love',
    content: 'Divine love is the highest form of love that transcends all earthly attachments...',
    scripture_reference: 'Bhagavad Gita 12.13-14',
    created_at: new Date()
  },
  {
    type: 'japa',
    title: 'Hare Krishna Maha Mantra',
    content: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare',
    benefits: 'Purifies the heart and mind, brings peace and spiritual consciousness',
    created_at: new Date()
  },
  {
    type: 'dhyana',
    title: 'Concentration on the Divine Form',
    content: 'Meditation on the divine form helps develop one-pointed concentration...',
    duration: 20,
    created_at: new Date()
  }
]);

print('✅ DSCPL database setup complete!');
print('📊 Collections created: users, programs, user_progress, spiritual_content');
print('🔍 Indexes created for optimal performance');
print('📚 Sample spiritual content added');
"

echo ""
echo "🎉 MongoDB setup complete!"
echo "💡 Database: dscpl_spiritual"
echo "🔗 Connection URL: mongodb://localhost:27017"
echo ""
echo "To connect manually: mongosh dscpl_spiritual"
