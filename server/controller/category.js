import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment/moment.js";


import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js"

const app = express();
configureMiddleware(app);
const router = express.Router();

/**
 * @openapi
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     security: []
 *     description: Retrieve a list of all categories and their associated category admins.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_category:
 *                         type: integer
 *                         example: 1
 *                       category_name:
 *                         type: string
 *                         example: "Category Name"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       category_admins:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id_category_admin:
 *                               type: integer
 *                               example: 1
 *                             category:
 *                               type: string
 *                               example: "Admin Category"
 *                             icon:
 *                               type: string
 *                               example: "icon.png"
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                               example: "2023-01-01T00:00:00Z"
 *                             updated_at:
 *                               type: string
 *                               format: date-time
 *                               example: "2023-01-01T00:00:00Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

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

/**
 * @openapi
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by ID
 *     security: []
 *     description: Retrieve a category and its associated category admins by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_category:
 *                       type: integer
 *                       example: 1
 *                     category_name:
 *                       type: string
 *                       example: "Category Name"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-01-01T00:00:00Z"
 *                     category_admins:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_category_admin:
 *                             type: integer
 *                             example: 1
 *                           category:
 *                             type: string
 *                             example: "Admin Category"
 *                           icon:
 *                             type: string
 *                             example: "icon.png"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-01-01T00:00:00Z"
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2023-01-01T00:00:00Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

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

/**
 * @openapi
 * /category-seller:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get seller-specific categories
 *     description: Retrieve a list of categories associated with the authenticated seller.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_category:
 *                         type: integer
 *                         example: 1
 *                       category_name:
 *                         type: string
 *                         example: "Category Name"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *                       id_user:
 *                         type: integer
 *                         example: 123
 *                       category_admins:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id_category_admin:
 *                               type: integer
 *                               example: 1
 *                             category:
 *                               type: string
 *                               example: "Admin Category"
 *                             icon:
 *                               type: string
 *                               example: "icon.png"
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                               example: "2023-01-01T00:00:00Z"
 *                             updated_at:
 *                               type: string
 *                               format: date-time
 *                               example: "2023-01-01T00:00:00Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Categories not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

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
                success: false,
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

/**
 * @openapi
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create a new category
 *     description: Create a new category associated with the authenticated seller.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_category_admin:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - id_category_admin
 *     responses:
 *       200:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Added Successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_user:
 *                         type: integer
 *                         example: 123
 *                       id_category_admin:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Forbidden: You do not have access to this resource"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

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

/**
 * @openapi
 * /category/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Update a category
 *     description: Update a category associated with the authenticated seller.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_category_admin:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - id_category_admin
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Updated Successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_user:
 *                         type: integer
 *                         example: 123
 *                       id_category_admin:
 *                         type: integer
 *                         example: 1
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T00:00:00Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Forbidden: You do not have access to this resource"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

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

/**
 * @openapi
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete a category
 *     description: Delete a category associated with the authenticated seller.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Deleted Successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_category:
 *                         type: integer
 *                         example: 1
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Forbidden You do not have access to this resource
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

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