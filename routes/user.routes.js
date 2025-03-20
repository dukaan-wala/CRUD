import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);       // नया यूज़र जोड़ना
router.get("/", getUsers);          // सभी यूज़र्स को पढ़ना
router.get("/:id", getUserById);     // एक यूज़र पढ़ना
router.put("/:id", updateUser);      // यूज़र अपडेट करना
router.delete("/:id", deleteUser);   // यूज़र हटाना

export default router;
