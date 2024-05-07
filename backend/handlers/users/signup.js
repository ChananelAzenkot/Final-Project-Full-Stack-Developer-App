import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { middlewareUsers } from "../../middleware/middlewareUser.js";

const signup = (app) => {
  // create a new user SignUp //
  app.post("/signup", async (req, res) => {
    try {
      const { error } = middlewareUsers.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const userInfo = req.body;
      const passUser = await bcrypt.hash(userInfo.password, 10);
      userInfo.password = passUser;
      const user = new User(userInfo);

      await user.save();
      res.status(201).send("משתמש נוצר בהצלחה !!");
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "קיים חשבון עם כתובת -Email !" });
      } else {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  });
};

export default signup;
