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
        const passUser = await bcrypt.hash(userInfo.password, 10);
        userInfo.password = passUser;

        // Find the user by id and update
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user
        Object.assign(user, userInfo);
        await user.save();

        res.status(200).send("User updated successfully");
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
