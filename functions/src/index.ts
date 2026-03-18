import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Entry point for payment webhooks
export const paymentWebhook = functions.https.onRequest((request, response) => {
  functions.logger.info("Payment webhook received", {structuredData: true});
  response.send("Webhook received");
});
