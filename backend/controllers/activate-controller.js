const Jimp = require('jimp');
const path = require('path');
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class ActivateController {
    async activate(req, res) {
        // console.log("phase1");

        const { name, avatar } = req.body;
        // console.log("Received name:", name);
        // console.log("Received avatar:", avatar);

        if (!name || !avatar) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Ensure the avatar string is correctly formatted
        const base64Prefix = /^data:image\/(png|jpeg|jpg);base64,/;
        if (!base64Prefix.test(avatar)) {
            console.error("Invalid image format");
            return res.status(400).json({ message: 'Invalid image format!' });
        }

        // console.log("phase2");

        const buffer = Buffer.from(
            avatar.replace(base64Prefix, ''),
            'base64'
        );

        console.log("Buffer created:", buffer);

        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

        // console.log("phase3");

        try {
            // console.log("phase4");
            const jimResp = await Jimp.read(buffer);
            // console.log("phase5");
            await jimResp
                .resize(150, Jimp.AUTO)
                .writeAsync(path.resolve(__dirname, `../storage/${imagePath}`));
            // console.log("phase6");
        } catch (err) {
            // console.log("phase7");
            console.error('Error processing image:', err);
            return res.status(500).json({ message: 'Could not process the image' });
        }

        // console.log("phase8");

        const userId = req.user._id;

        try {
            const user = await userService.findUser({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            await user.save();
            return res.json({ user: new UserDto(user), auth: true });
        } catch (err) {
            // console.log("phase9");
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Something went wrong!' });
        }
    }
}

module.exports = new ActivateController();
