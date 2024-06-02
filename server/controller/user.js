import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment";


import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js"

const app = express();
configureMiddleware(app);
const router = express.Router();

// endpoint untuk mengambil semua user yang ada pada table users
/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     security: []
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Successfully retrieved users
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
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       npm:
 *                         type: integer
 *                         example: 714220001
 *                       number_phone:
 *                         type: string
 *                         example: 08123456789
 *                       role:
 *                         type: string
 *                         example: admin
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-05-01T14:48:00.000Z
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
/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Get authenticated user details
 *     description: Retrieve details of the authenticated user based on the provided token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
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
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       npm:
 *                         type: integer
 *                         example: 714220001
 *                       number_phone:
 *                         type: string
 *                         example: 08123456789
 *                       role:
 *                         type: string
 *                         example: admin
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-05-01T14:48:00.000Z
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