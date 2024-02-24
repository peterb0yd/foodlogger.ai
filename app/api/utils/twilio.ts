const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
import twilio from "twilio";
let client: twilio.Twilio;

export const getTwilio = () => {
    if (!client) {
        client = twilio(accountSid, authToken);
    }
    return client;
}
