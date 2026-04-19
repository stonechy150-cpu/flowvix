const { connectToDatabase } = require('./lib/mongodb');

module.exports = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    // Try to perform a simple operation to verify connection
    await db.command({ ping: 1 });
    
    res.status(200).json({ 
      status: 'Connected', 
      message: 'Successfully connected to MongoDB Atlas!',
      database: db.databaseName 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Error', 
      message: 'Failed to connect to MongoDB',
      error: error.message 
    });
  }
};
