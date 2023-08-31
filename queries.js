// Multiple types of queries 

// Simple query 
db.collection('mycollection').find({ age: 30 })

// complex query 
db.collection('mycollection').find({ $and: [{ age: { $gte: 25 } }, { age: { $lte: 35 } }] })

// Aggregration query 
db.collection('mycollection').aggregate([
    { $group: { _id: '$department', averageSalary: { $avg: '$salary' } } }
  ])

// geospatial query 
db.collection('mycollection').find({ location: { $near: { $geometry: { type: "Point", coordinates: [ -73.97, 40.77 ] }, $maxDistance: 1000 } } })

// Text search query 
db.collection('mycollection').find({ $text: { $search: "mongodb query" } })

// aggregator queries
db.bookings.aggregate([
  {
    $match: {
      status: "completed"
    }
  },
  {
    $group: {
      _id: "$driver",
      totalTrips: { $sum: 1 },
      totalFare: { $sum: "$fare" },
      averageRating: { $avg: "$rating" },
      maxDistance: { $max: "$distance" },
      minDistance: { $min: "$distance" }
    }
  },
  {
    $sort: {
      totalTrips: -1
    }
  },
  {
    $limit: 10
  }
])

