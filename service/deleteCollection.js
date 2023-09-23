const DeleteCollection = async (db) => {
    try {
      const collection = db.collection("games");
      await collection.deleteMany({});
      console.log(`Deleted all documents in games collection.`);
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
}

module.exports = DeleteCollection;