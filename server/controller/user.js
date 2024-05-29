import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment";


import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js"

const app = express();
configureMiddleware(app);
const router = express.Router();

// endpoint untuk mengambil semua user yang ada pada table users
router.get("/users", async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from("users")
            .select("*")
            .order("id");


        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

// endpoint untuk mengambil data user yang sedang login melalui token jwt
router.get("/user", authenticateToken, async (req, res) => {
    const id = req.user.userId; // Mengambil userId dari token yang telah di-autentikasi
    try {
        const { data: users, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id);


        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})



export default router;