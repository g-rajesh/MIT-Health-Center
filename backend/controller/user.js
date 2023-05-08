const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username });

        if(!user) {
            const userNameError = new Error("Username doesn't exist");
            userNameError.data =  { username: "Username doesn't exist" };
            userNameError.status = 404;
            throw userNameError;
        }

        const isEqual = await bcrypt.compare(password, user.password);
        console.log(isEqual);
        if(!isEqual) {
            const passwordError = new Error("Password doesn't match");
            passwordError.data = { password: "Password doesn't match" };
            passwordError.status = 404;
            throw passwordError;
        }

        const token = jwt.sign({username: user.username}, "HEALTH_CENTER", { expiresIn: '1w' });

        return res.status(200).json({
            message: "Login successfully...",
            data: {
                id: user._id,
                username: user.username,
                token: token
            },
        });

    } catch(err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
}