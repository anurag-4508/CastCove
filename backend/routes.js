const router = require('express').Router();
const authController = require('./controllers/auth-controller');

router.post('/api/send-otp', authController.sendOtp);
// router.post('/api/send-otp',()=>{
//     console.log("OTP sent...");
// });
router.post('/api/verify-otp', authController.verifyOtp);

module.exports = router;