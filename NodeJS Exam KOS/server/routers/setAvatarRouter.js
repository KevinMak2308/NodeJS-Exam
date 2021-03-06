import { Router } from "express";
import User from "../database/createUserSchema.js";
import checkUser from "../middleware/authMiddleware.js";

const router = Router();

router.post ("/setAvatar/:id", async (req, res, next) => {
    
      const userId = req.params.id;
      const avatarImage = req.body.image;

      console.log("Inside setAvatarRoute: ", avatarImage);
      
      try {
        const userData = await User.findByIdAndUpdate(userId, { isAvatarImageSet: true, avatarImage }, { new: true });
        return res.json({ isSet: userData.isAvatarImageSet,  image: userData.avatarImage });
      
      } catch (error) {
        return res.json({ message: "Unable to set headers after it is sent to the client: ", status: false });
      }
  });

  export default router;