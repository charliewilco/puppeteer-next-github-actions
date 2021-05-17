import mongoose from "mongoose";

const url = process.env.DB_ADDRESS || "mongodb://127.0.0.1:27017/next-js-demo";

interface IConnectionStatus {
  isConnected?: number;
}

const connection: IConnectionStatus = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
