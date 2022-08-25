const { MongoClient: Mongo, ServerApiVersion } = require('mongodb');
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 };

async function MongoConnector(uri) {
	const client = new Mongo(uri, options);
	await client.connect();
	console.log('Connected to Atlas.')
	return client.db('nezuko')
}

module.exports = MongoConnector;
