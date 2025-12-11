import { where } from "sequelize";
import sequelize from "../configs/sequelize.config.js";
import { hashPassword, comparePassword } from "../configs/security.js";
import user from "../models/user.model.js";
import { Op } from "sequelize";

// ====== Login user ======
export const login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        // Find user by email
        const existingUser = await user.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password"
            });
        }
        // Compare passwords
        const isPasswordValid = await comparePassword(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: existingUser
        });

    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// ====== Register user ======
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // Check if user with the same email already exists
        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use"
            });
        }
        // Hash the password
        const hashedPassword = await hashPassword(password);
        // Create new user
        const newUser = await user.create({
            email,
            username,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}