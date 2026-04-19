const { connectToDatabase } = require('./lib/mongodb');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    const { db } = await connectToDatabase();
    const collection = db.collection('packages');

    console.log('Method:', req.method);

    if (req.method === 'GET') {
      const packages = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(packages);
    } 
    
    else if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, price, popular, features } = body;
      
      const result = await collection.insertOne({
        name,
        price,
        popular,
        features,
        createdAt: new Date()
      });
      return res.status(201).json(result);
    }

    else if (req.method === 'PUT') {
      const { id } = req.query;
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, price, popular, features } = body;

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            name, 
            price, 
            popular: !!popular, 
            features: Array.isArray(features) ? features : [],
            updatedAt: new Date() 
          } 
        }
      );
      return res.status(200).json(result);
    }

    else if (req.method === 'DELETE') {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Deleted successfully' });
    }

    else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Server Error', details: error.message });
  }
};
