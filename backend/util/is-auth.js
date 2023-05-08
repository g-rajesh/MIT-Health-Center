const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    try {
        if (!authHeader) {
            const error = new Error("Not authenticated!");
            error.status = 401;
            throw error;
        }

        const token = authHeader.split(" ")[1];
        let decodedToken;

        decodedToken = jwt.verify(token, "HEALTH_CENTER");

        if (!decodedToken) {
            const error = new Error("Not authenticated!");
            error.status = 401;
            throw error;
        }

        req.username = decodedToken.username;

        next();

    } catch(err) {
        
        if(!err.status) err.status = 500;
        if(err.message === "jwt expired") {
            err.message = "Token Expired";
            err.status = 401;
            err.data = { error: "JWT token Expired" };
        }
        next(err);
    }
};