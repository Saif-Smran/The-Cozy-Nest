import { ServerApiVersion } from "mongodb";
import { MongoClient } from "mongodb";

export const collectionNames = {
    products: "products",
    users : "users",
}

export function dbConnect(collectionName: keyof typeof collectionNames) {

    const uri = process.env.NEXT_PUBLIC_MONGODB_URI || "";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db(process.env.DB_NAME).collection(collectionName);
}