import jwt from "jsonwebtoken";
import User from "../database/createUserSchema.js";

 const checkUser = (req, res, next) => {
    
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            console.log("What is inside middleWare token? ", token);
            
            if (error) {
                return res.json({ message: "First false res: ", status: false })
                
            
            } else {
                
                console.log("DECODEDTOKEN: ", decodedToken);
                
                const user = await User.findById(decodedToken.user);
                console.log("This is the user after decodedToken: ", user);
                
                
                    console.log("Middleware decoded user: ", user);
                    res.json({ status: true, user: user });
                    next();
                
            }
        })

    } else {
        return res.json({ message: "This is the final false res: ", status: false })
        
    }


}
export default checkUser;