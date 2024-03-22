import { adminGuard } from "../../../guards.js";
import { guard } from "../../../guards.js";
import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import { getLoggedUserId } from "../../../config/config.js";
import { middlewareUsers } from "../../../middleware/middlewareUser.js";

const users = (app) => {
  // get all users for admin users //
app.get("/api/users", adminGuard, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});







app.get("/api/agent/search", async (req, res) => {
  const { name, bizNumber, teamName, phone, email } = req.query;

  try {
    const query = {
      $or: [
        { 'name.first': name },
        { 'name.last': name },
        { bizNumber: bizNumber },
        { teamName: teamName },
        { phone: phone },
        { email: email },
      ],
    };

    const agents = await User.find(query);
    if (agents.length === 0) {
      res.status(404).json({ message: "No found items" });
    } else {
      res.json(agents);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});














  // get the user logged for user and admin users //
app.get("/api/user/:id", adminGuard, guard, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { userId } = getLoggedUserId(req, res);

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// edit the user logged for user and admin users //
app.put("/api/user/:id", adminGuard, async (req, res) => {
  try {
    const user = getLoggedUserId(req, res);
    if (!user) return res.status(403).json({ message: "User not authorized" });

    const { userId } = user;
    req.body.userId = userId;

    const { error } = middlewareUsers.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userToUpdate = await User.findById(req.params.id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    Object.assign(userToUpdate, req.body);

    await userToUpdate.save();

    res.send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// change the user to business or not for admin and user  //
app.patch("/api/user/:id", adminGuard, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.IsBusiness = !user.IsBusiness;
    await user.save();

    res.send("User updated " + user.IsBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// delete the user for admin users //
app.delete("/api/user/:id", adminGuard, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send("User deleted successfully " + user.name.first);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
};

export default users;






