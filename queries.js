// queries.js
// MongoDB queries for PLP Bookstore Assignment

// Connect to database
db = db.getSiblingDB('plp_bookstore');

// Task 2: Basic CRUD Operations
print("=== TASK 2: BASIC CRUD OPERATIONS ===");

// 2a. Find all books in a specific genre (Fantasy)
print("\nBooks in Fantasy genre:");
db.books.find({ genre: "Fantasy" });

// 2b. Find books published after a certain year (1950)
print("\nBooks published after 1950:");
db.books.find({ published_year: { $gt: 1950 } });

// 2c. Find books by a specific author (George Orwell)
print("\nBooks by George Orwell:");
db.books.find({ author: "George Orwell" });

// 2d. Update the price of a specific book (1984)
print("\nUpdating price of '1984' to 10.99");
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 10.99 } }
);
print("Updated book:");
db.books.find({ title: "1984" }, { title: 1, price: 1, _id: 0 });

// 2e. Delete a book by its title (Wuthering Heights)
print("\nDeleting 'Wuthering Heights'");
db.books.deleteOne({ title: "Wuthering Heights" });
print("Remaining books count:", db.books.countDocuments());

// Task 3: Advanced Queries
print("\n\n=== TASK 3: ADVANCED QUERIES ===");

// 3a. Find books in stock and published after 2010
print("\nIn-stock books published after 2010:");
db.books.find(
  { 
    in_stock: true,
    published_year: { $gt: 2010 } 
  },
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3b. Projection example (only title, author, price)
print("\nBook titles, authors and prices:");
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).limit(5);

// 3c. Sorting by price
print("\nBooks sorted by price (ascending):");
db.books.find({}, { title: 1, price: 1, _id: 0 })
  .sort({ price: 1 })
  .limit(5);

print("\nBooks sorted by price (descending):");
db.books.find({}, { title: 1, price: 1, _id: 0 })
  .sort({ price: -1 })
  .limit(5);

// 3d. Pagination (5 books per page)
print("\nPagination Page 1:");
db.books.find({}, { title: 1, _id: 0 })
  .skip(0)
  .limit(5);

print("\nPagination Page 2:");
db.books.find({}, { title: 1, _id: 0 })
  .skip(5)
  .limit(5);

// Task 4: Aggregation Pipeline
print("\n\n=== TASK 4: AGGREGATION PIPELINE ===");

// 4a. Average price by genre
print("\nAverage price by genre:");
db.books.aggregate([
  { 
    $group: { 
      _id: "$genre", 
      avgPrice: { $avg: "$price" } 
    } 
  },
  { $sort: { _id: 1 } }
]);

// 4b. Author with most books
print("\nAuthor with most books:");
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 4c. Books by publication decade
print("\nBooks count by publication decade:");
db.books.aggregate([
  {
    $project: {
      decade: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// Task 5: Indexing
print("\n\n=== TASK 5: INDEXING ===");

// 5a. Create index on title
print("\nCreating index on title field:");
db.books.createIndex({ title: 1 });

// 5b. Create compound index
print("\nCreating compound index on author and published_year:");
db.books.createIndex({ author: 1, published_year: -1 });

// 5c. Performance comparison
print("\nPerformance comparison for title search:");

print("\nWithout index (collection scan):");
const withoutIndex = db.books.find({ title: "The Hobbit" })
  .hint({ $natural: 1 })
  .explain("executionStats");
print(`Documents examined: ${withoutIndex.executionStats.totalDocsExamined}`);
print(`Execution time: ${withoutIndex.executionStats.executionTimeMillis}ms`);

print("\nWith title index:");
const withIndex = db.books.find({ title: "The Hobbit" })
  .hint({ title: 1 })
  .explain("executionStats");
print(`Documents examined: ${withIndex.executionStats.totalDocsExamined}`);
print(`Execution time: ${withIndex.executionStats.executionTimeMillis}ms`);

print("\n\nQUERIES COMPLETED SUCCESSFULLY");