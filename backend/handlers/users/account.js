import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { middlewareUsers } from "../../middleware/middlewareUser.js";


const myAccount = (app) => {
app.put("/api/user/:id", async (req, res) => {
    try {
        const { error } = middlewareUsers.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const userInfo = req.body;

        // Find the user by id
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the provided password is correct
        const isPasswordCorrect = bcrypt.compare(userInfo.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "הסיסמא לא נכונה כדי לעדכן את הפרטים" });
        }

        // Don't update the password
        delete userInfo.password;

        // Update the user
        Object.assign(user, userInfo);
        await user.save();

        res.status(200).send(`הפרטים עודכנו בהצלחה ${user.name.first} !!`);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Email already exists" });
        } else {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
});

    app.get("/api/userGet/:id", async (req, res) => {
        
    });
}
export default myAccount;
