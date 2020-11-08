import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Server } from "../src/server/Server";

admin.initializeApp(functions.config().firebase);

const app = new Server().getExpress();

// Expose Express API as a single Cloud Function
exports.mathserv = functions.https.onRequest(app);