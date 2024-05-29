import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment/moment.js";


import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js"

const app = express();
configureMiddleware(app);
const router = express.Router();

router.get("/category", async (req, res) => {
    try {
        const { data: categories, error } = await supabase
            .from("categories")
            .select(`
                *,
                category_admins (*)
            `)
            .order("id_category");

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

    }
});

router.get("/category/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const { data: categories, error } = await supabase
            .from("categories")
            .select(`
                *,
                category_admins (*)
            `)
            .eq("id_category", id);

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

    }
});

router.get("/category-seller", authenticateToken, async (req,res) => {
    const id_user = req.user.userId;

    try {
        const { data: categories, error } = await supabase
            .from("categories")
            .select(`
                *,
                category_admins (*)
            `)
            .eq("id_user", id_user)
            .order("id_category");

        if(categories <= 0) {
            return res.json({
                success: true,
                message: "Category not found"
            });
        }

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

    }
})

router.post("/category", authenticateToken, async (req, res) => {

    const { id_category_admin } = req.body;
    const id_user = req.user.userId; // Mengambil id_user dari token yang telah di-autentikasi


    if (req.user.role !== 'Seller') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: You do not have access to this resource'
        });
    }

    try {
        const createdAt = moment().locale('id').format('YYYY-MM-DD HH:mm:ss');
        const { data: categories, error } = await supabase
            .from("categories")
            .insert({
                id_user:id_user,
                id_category_admin: id_category_admin,
                created_at : createdAt
            })
            .select("*");

        if (error) {
            return res.json(error.message);
        }

        return res.json({ 
            success: true, 
            message : "Category Added Successfully",
            data: categories 
        });
    } catch (error) {
        return res.json(error);
    }
});

router.put("/category/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { id_category_admin } = req.body;

    if (req.user.role !== 'Seller') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: You do not have access to this resource'
        });
    }

    try {
        const updatedAt = moment().locale("id").format('YYYY-MM-DD HH:mm:ss');
        const { data: categories, error } = await supabase
            .from("categories")
            .update({
                id_category_admin: id_category_admin,
                updated_at : updatedAt
            })
            .eq("id_category", id)
            .select("*");

        if (error) {
            return res.json(error.message);
        }

        return res.json({ 
            success: true, 
            message : "Category Updated Successfully",
            data: categories 
        });
    } catch (error) {
        return res.json(error);
    }
});

router.delete("/category/:id", authenticateToken, async(req,res) => {
    const { id } = req.params;

    if (req.user.role !== 'Seller') {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: You do not have access to this resource'
        });
    }

    try {
        const { data: categories, error } = await supabase
            .from("categories")
            .delete()
            .eq("id_category", id);

        if (error) {
            return res.json(error.message);
        }

        return res.json({ 
            success: true, 
            message : "Category Deleted Successfully",
            data: categories 
        });
    } catch (error) {
        return res.json(error);
    }
})

export default router;