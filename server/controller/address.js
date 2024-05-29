import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment/moment.js";


import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js"

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/province", async (req, res) => {
    try {
        const { data: province, error } = await supabase
            .from("provinces")
            .select("*")
            .order("id")

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        return res.status(200).json({
            success: true,
            data: province
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

router.get("/regency", async (req, res) => {
    try {
        const { data: regency, error } = await supabase
            .from("regencies")
            .select("*")
            .order("id")

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        return res.status(200).json({
            success: true,
            data: regency
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

router.get("/district", async (req, res) => {
    try {
        const { data: district, error } = await supabase
            .from("districts")
            .select("*")
            .order("id")

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        return res.status(200).json({
            success: true,
            data: district
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

router.get("/village", async (req, res) => {
    try {
        const { data: village, error } = await supabase
            .from("villages")
            .select("*")
            .order("id")

        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
        return res.status(200).json({
            success: true,
            data: village
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

router.get("/address", authenticateToken, async (req, res) => {
    const id = req.user.userId; // Mengambil userId dari token yang telah di-autentikasi
    try {
        const { data: address, error } = await supabase
            .from("addresses")
            .select("*,users(*) ,provinces(*),regencies(*),districts(*),villages(*)")
            .order("id_address")
            .eq("id_user", id)

        return res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

})

router.post("/address", authenticateToken, async (req, res) => {
    const id = req.user.userId;
    const { province_id, regency_id, district_id, village_id, patokan } = req.body;
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    try {
        const { data: address, error } = await supabase
            .from("addresses")
            .insert({
                id_user: id,
                province_id: province_id,
                regency_id: regency_id,
                district_id: district_id,
                village_id: village_id,
                patokan: patokan,
                created_at: createdAt
            })
            .select("*")

        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
        return res.status(200).json({
            success: true,
            message: "Address Added Successfully",
            data: address
        });
    } catch (error) {
        console.error(error);
    }
})

export default router;