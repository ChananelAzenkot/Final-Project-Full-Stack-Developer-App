import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { middlewareUsers } from "../../middleware/middlewareUser.js";

const myAccount = (app) => {
  app.put("/api/user/:id", async (req, res) => {
    try {
      const userInfo = req.body;
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.isAdmin && userInfo.isAdmin) {
        const isPasswordCorrect = await bcrypt.compare(
          userInfo.password,
          user.password
        );
        if (!isPasswordCorrect) {
          return res
            .status(400)
            .json({ message: "הסיסמא לא נכונה כדי לעדכן את הפרטים" });
        }
      }

      delete userInfo.password;
      Object.assign(user, userInfo);

      await user.save();
      res.status(200).send(`הפרטים עודכנו בהצלחה ${user.name.first} !! `);
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "קיים חשבון עם כתובת -Email !" });
      } else {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  });
};

export default myAccount;
