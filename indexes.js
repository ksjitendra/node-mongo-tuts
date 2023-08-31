// Creating a single field index on the drivers collection
db.drivers.createIndex({ "location": "2dsphere" });

// Creating a compound index on the bookings collection
db.bookings.createIndex({ "customer_id": 1, "driver_id": 1 });

// Creating a text index on the cab_service collection
db.cab_service.createIndex({ "address": "text" });
