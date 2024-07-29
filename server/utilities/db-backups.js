const { MongoClient } = require("mongodb");

const localUri = process.env.LOCAL_MONGO_URI;
const atlasUri = process.env.ONLINE_MONGO_URI;
const dbName = process.env.DB_NAME;

// Function to sync data from local to online MongoDB
async function syncData(mongoose) {
  try {
    //if kayan is deleted from local, don't sync
    const listDatabases = await getDatabaseList(mongoose);
    if (!listDatabases.includes(dbName)) {
      console.log(`Database ${dbName} not found in local MongoDB.end sync.`);
      return;
    }

    // Connect to local MongoDB
    const localClient = new MongoClient(localUri);
    const localDb = localClient.db(dbName); // Specify the database name here

    

    //get collections list
    const collectionsList = await localDb.listCollections().toArray();
    const collectionNames = collectionsList.map((col) => col.name);

    console.log("dblist:", collectionNames);

    // Connect to online MongoDB
    const onlineClient = new MongoClient(atlasUri);
    const onlineDb = onlineClient.db(dbName); // Specify the database name here
    for (const collectionName of collectionNames) {
      console.log("collectionName:", collectionName);
    }

    for (const collectionName of collectionNames) {
      const localCollection = localDb.collection(collectionName);
      const onlineCollection = onlineDb.collection(collectionName);
      //take the data from the local database and insert it into the online database for each collection
      const localData = await localCollection.find().toArray();
      console.log("collectionName:", collectionName);
      console.log("localData:", localData);

      if (localData.length > 0) {
        // Delete all documents in online collection
        await onlineCollection.deleteMany({});

        // Insert data into online MongoDB
        await onlineCollection.insertMany(localData);
      } else {
        //if local empty make online empty
        await onlineCollection.deleteMany({});
        console.log(`No data to sync for collection ${collectionName}`);
      }

      console.log("Data synced from local to online MongoDB");
    }
    console.log("Data synced from local to online MongoDB");
    // Close clients
    localClient.close();
    onlineClient.close();
  } catch (err) {
    console.error(err);
  }
}

async function getDatabaseList(mongoose) {
  const admin = mongoose.connection.db.admin();
  const listDatabasesObject = await admin.listDatabases();
  const listDatabases = listDatabasesObject.databases.map((db) => db.name);
  return listDatabases;
}

async function fetchDataFromOnlineBackup() {
  try {
    const localClient = new MongoClient(localUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const atlasClient = new MongoClient(atlasUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await localClient.connect();
    await atlasClient.connect();

    //get the database names in the connection.
    // const databasesList = await localClient.db().admin().listDatabases();
    // console.log("Databases:");
    // databasesList.databases.forEach((db) => console.log(` - ${db.name}`));

    //

    const localDb = localClient.db(dbName);
    const atlasDb = atlasClient.db(dbName);

    // Get all collection names from Atlas
    const atlasCollections = await atlasDb.listCollections().toArray();
    const atlasCollectionNames = atlasCollections.map((col) => col.name);

    // Loop through all collections
    for (const collectionName of atlasCollectionNames) {
      const localCollection = localDb.collection(collectionName);
      const atlasCollection = atlasDb.collection(collectionName);

      const localCount = await localCollection.countDocuments();
      console.log(`Local database count for ${collectionName}:`, localCount);

      if (localCount === 0) {
        console.log(
          `Local database collection ${collectionName} is empty. Fetching data from Atlas...`
        );

        const atlasData = await atlasCollection.find().toArray();
        console.log(
          `Fetched data from Atlas for ${collectionName}:`,
          atlasData.length
        );

        if (atlasData.length > 0) {
          await localCollection.insertMany(atlasData);
          console.log(
            `Data copied from Atlas to local database for ${collectionName}.`
          );
        } else {
          console.log(`No data found in Atlas for ${collectionName}.`);
        }
      } else {
        console.log(
          `Local database collection ${collectionName} is not empty. Skipping data sync.`
        );
      }
    }

    await localClient.close();
    await atlasClient.close();
  } catch (err) {
    console.error("Error during sync:", err);
  }
}

module.exports.getDatabaseList = getDatabaseList;

module.exports.syncData = syncData;
module.exports.fetchDataFromOnlineBackup = fetchDataFromOnlineBackup;
