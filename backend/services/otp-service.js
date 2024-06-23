const crypto = require('crypto');
const hashService = require('./hash-service');
const twilio = require('twilio');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;


const client = twilio(smsSid, smsAuthToken);

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp) {
        try {
            const message = await client.messages.create({
                to: phone,
                from: process.env.SMS_FROM_NUMBER,
                body: `Your CastCove OTP is ${otp}. It is valid for 2 minutes only.`,
               
            });
            // console.log('otp sent to mobile')
            return message;
        } catch (error) {
            console.error('Error sending OTP:', error);
            throw new Error('Failed to send OTP');
        }
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();





