import { getTwilio } from "~/utils/twilio";

export const sendVerificationText = async (phone: string) => {
    const twilio = getTwilio();
    const service = twilio.verify.services(process.env.TWILIO_VERIFY_SID as string);
    const verification = await service.verifications.create({ to: phone, channel: "sms" });
    console.log(verification.status);
    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question("Please enter the OTP:", async (otpCode: string) => {
        const verificationCheck = await service.verificationChecks.create({ to: phone, code: otpCode });
        console.log(verificationCheck.status);
        readline.close();
    });
};
