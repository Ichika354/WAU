import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment/moment.js";


import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js"

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/category-admin", async (req, res) => {
    try {
        const { data: categories, error } = await supabase
            .from("category_admins")
            .select("*");

        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get("/category-admin/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const { data: categories, error } = await supabase
            .from("category_admins")
            .select("*")
            .eq("id_category_admin", id);

        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        return res.status(200).json({
            success: true,
            data: categories[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/category-admin", authenticateToken, async (req, res) => {
    const { category, icon } = req.body;

    // Periksa apakah user adalah admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: You do not have access to this resource'
        });
    }

    if (!category) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name is required' 
        });
    }

    try {
        const createdAt = moment().locale('id').format('YYYY-MM-DD HH:mm:ss');

        const { data, error } = await supabase
            .from("category_admins")
            .insert({ 
                category:category, 
                icon:icon, 
                created_at : createdAt
            })
            .select("*");

        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        return res.status(201).json({
            success: true,
            message: "Category Added Successfully",
            data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.put("/category-admin/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { category, icon } = req.body;

    // Periksa apakah user adalah admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: You do not have access to this resource'
        });
    }

    if (!category) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name is required' 
        });
    }

    try {
        const updatedAt = moment().locale('id').format('YYYY-MM-DD ,HH:mm:ss');
        const { data, error } = await supabase
            .from("category_admins")
            .update({ 
                category:category, 
                icon:icon,
                updated_at : updatedAt
            })
            .eq("id_category_admin", id)
            .select("*");

        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
            data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.delete("/category-admin/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;

    // Periksa apakah user adalah admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: You do not have access to this resource'
        });
    }

    try {
        const { data, error } = await supabase
            .from("category_admins")
            .delete()
            .eq("id_category_admin", id);

        if (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});


export default router;