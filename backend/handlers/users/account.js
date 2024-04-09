import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import { middlewareUsers } from "../../middleware/middlewareUser.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { log } from "console";


const myAccount = (app) => {
  // Configure multer for image upload
  const storageEngine = multer.diskStorage({
    destination: "./ticketImages",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });

  const upload = multer({ storage: storageEngine });

app.put(
  "/api/user/:id/image",
  upload.single("imageUpload"),
  async (req, res) => {
    try {
      if (req.file) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const sourcePath = path.join(
          __dirname,
          "../../ticketImages",
          req.file.filename
        );
        const destinationPath = path.join("./files", req.file.originalname);

        // Check if source file exists
        if (!fs.existsSync(sourcePath)) {
          return res
            .status(400)
            .json({ message: "Source file does not exist" });
        }

        // Check if destination directory exists, if not create it
        const destinationDir = path.dirname(destinationPath);
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true });
        }

        try {
          await fs.promises.copyFile(
            sourcePath,
            path.join(__dirname, destinationPath)
          );
        } catch (err) {
          return res
            .status(503)
            .json({ message: "Server error", error: err.message });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Save the relative path to the user document
        user.image = { imageUpload: destinationPath };

        try {
          await user.save();
        } catch (err) {
          return res
            .status(500)
            .json({ message: "Error saving user", error: err.message });
        }

        res
          .status(200)
          .send(
            `Image uploaded and copied successfully for ${user.name.first} !! `
          );
      } else {
        res.status(400).json({ message: "No image file received" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

 app.put("/api/user/:id", async (req, res) => {
   try {
     const userInfo = req.body;
     const user = await User.findById(req.params.id);

     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }

     const isPasswordCorrect = await bcrypt.compare(
       userInfo.password,
       user.password
     );
     if (!isPasswordCorrect) {
       return res
         .status(400)
         .json({ message: "הסיסמא לא נכונה כדי לעדכן את הפרטים" });
     }

     delete userInfo.password;
     Object.assign(user, userInfo);

     await user.save();
     res.status(200).send(`הפרטים עודכנו בהצלחה ${user.name.first} !! `);
   } catch (error) {
     if (error.code === 11000) {
       res.status(409).json({ message: "Email already exists" });
     } else {
       res.status(500).json({ message: "Server error", error: error.message });
     }
   }
 });
};

export default myAccount;
