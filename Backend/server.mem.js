/**
 * Development bootstrap that runs the app against an in-memory MongoDB.
 *
 * Use this when you don't have a local MongoDB or an Atlas URI handy:
 *   npm run dev:mem
 *
 * It starts a real MongoDB instance in memory, points MONGO_URI at it,
 * then boots the normal app (src/app.js) on port 3000 - identical to
 * the production server.js, just with an ephemeral database.
 */
require("dotenv").config()
const { MongoMemoryServer } = require("mongodb-memory-server")
const mongoose = require("mongoose")

async function start() {
    const mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    process.env.MONGO_URI = uri

    try {
        await mongoose.connect(uri)
        console.log("Connected to in-memory MongoDB at", uri)
    } catch (err) {
        console.error("Failed to connect to in-memory MongoDB:", err)
        process.exit(1)
    }

    const app = require("./src/app")

    const server = app.listen(3000, () => {
        console.log("Server is running on port 3000 (in-memory DB mode)")
    })

    const shutdown = async () => {
        console.log("\nShutting down...")
        server.close()
        await mongoose.disconnect()
        await mongod.stop()
        process.exit(0)
    }

    process.on("SIGINT", shutdown)
    process.on("SIGTERM", shutdown)
}

start()
