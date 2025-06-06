# MongoDB Bookstore Assignment - PLP Week 1

## 📋 Assignment Overview
This solution demonstrates MongoDB fundamentals including:
- Database setup and collection creation
- CRUD operations
- Advanced querying with projection, sorting, and pagination
- Aggregation pipelines
- Indexing and performance optimization

## 🛠️ Prerequisites
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally
- [MongoDB Shell (`mongosh`)](https://www.mongodb.com/docs/mongodb-shell/) 
- Basic terminal/command prompt knowledge

## 📂 Files
| File | Purpose |
|------|---------|
| `insert_books.js` | Populates database with sample books |
| `queries.js` | Contains all MongoDB queries for tasks |
| `README.md` | This documentation file |
| `screenshot.png` | Visual proof of database and data |

## 🚀 Setup Instructions

### 1. Start MongoDB Service
```bash
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Windows (Run as Administrator)
net start MongoDB
```

### Insert Sample Data
```bash
mongosh "mongodb://localhost:27017" insert_books.js
```

### Execute Assignment Queries
```bash
mongosh "mongodb://localhost:27017" queries.js
```

### 📊 Expected Query Output
![screenshot 1](<Screenshot from 2025-06-06 14-55-48.png>)
![screenshot 2](<Screenshot from 2025-06-06 14-56-08.png>)

### Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 