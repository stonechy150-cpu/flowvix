const { connectToDatabase } = require('./lib/mongodb');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
  const { db } = await connectToDatabase();
  const collection = db.collection('packages');

  if (req.method === 'GET') {
    try {
      const packages = await collection.find({}).toArray();
      res.status(200).json(packages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch packages' });
    }
  } 
  
  else if (req.method === 'POST') {
    try {
      const { name, price, popular, features } = req.body;
      const result = await collection.insertOne({
        name,
        price,
        popular,
        features,
        createdAt: new Date()
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create package' });
    }
  }

  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete failed' });
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
