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
 * /province:
 *   get:
 *     tags:
 *       - Address
 *     summary: Get list of provinces
 *     security: []
 *     description: Retrieve a list of all provinces.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of provinces
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
 *                         example: Jawa Barat
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

/**
 * @openapi
 * /regency:
 *   get:
 *     tags:
 *       - Address
 *     summary: Get list of regencies
 *     security: []
 *     description: Retrieve a list of all regencies.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of regencies
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
 *                         example: Bandung
 *                       province_id:
 *                         type: integer
 *                         example: 1
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

/**
 * @openapi
 * /district:
 *   get:
 *     tags:
 *       - Address
 *     summary: Get list of districts
 *     security: []
 *     description: Retrieve a list of all districts.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of districts
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
 *                         example: DistrictName
 *                       regency_id:
 *                         type: integer
 *                         example: 1
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

/**
 * @openapi
 * /village:
 *   get:
 *     tags:
 *       - Address
 *     summary: Get list of villages
 *     security: []
 *     description: Retrieve a list of all villages.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of villages
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
 *                         example: VillageName
 *                       district_id:
 *                         type: integer
 *                         example: 1
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

/**
 * @openapi
 * /address:
 *   get:
 *     tags:
 *       - Address
 *     summary: Get user addresses
 *     description: Retrieve addresses associated with the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user addresses
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
 *                       id_address:
 *                         type: integer
 *                         example: 1
 *                       province:
 *                         type: integer
 *                         example: 11
 *                       regency:
 *                         type: integer
 *                         example: 1101
 *                       district:
 *                         type: integer
 *                         example: 1101010
 *                       village:
 *                         type: integer
 *                         example: 1101010001
 *                       patokan:
 *                         type: string
 *                         example: StreetName
 *       401:
 *         description: Unauthorized
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

/**
 * @openapi
 * /address:
 *   post:
 *     tags:
 *       - Address
 *     summary: Add new address
 *     description: Add a new address for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               province_id:
 *                 type: integer
 *                 example: 1
 *               regency_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               village_id:
 *                 type: integer
 *                 example: 1
 *               patokan:
 *                 type: string
 *                 example: Near the big tree
 *     responses:
 *       200:
 *         description: Successfully added new address
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
 *                   example: Address Added Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_address:
 *                       type: integer
 *                       example: 1
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     province_id:
 *                       type: integer
 *                       example: 1
 *                     regency_id:
 *                       type: integer
 *                       example: 1
 *                     district_id:
 *                       type: integer
 *                       example: 1
 *                     village_id:
 *                       type: integer
 *                       example: 1
 *                     patokan:
 *                       type: string
 *                       example: Near the big tree
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-01T12:00:00Z"
 *       401:
 *         description: Unauthorized
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

/**
 * @openapi
 * /address:
 *   put:
 *     tags:
 *       - Address
 *     summary: Update address
 *     description: Update user's address.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_address:
 *                 type: integer
 *                 example: 1
 *               province_id:
 *                 type: integer
 *                 example: 1
 *               regency_id:
 *                 type: integer
 *                 example: 1
 *               district_id:
 *                 type: integer
 *                 example: 1
 *               village_id:
 *                 type: integer
 *                 example: 1
 *               patokan:
 *                 type: string
 *                 example: "Jl. Contoh No. 123"
 *     responses:
 *       200:
 *         description: Successfully updated address
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
 *                   example: Address Updated Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_address:
 *                       type: integer
 *                       example: 1
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     province_id:
 *                       type: integer
 *                       example: 1
 *                     regency_id:
 *                       type: integer
 *                       example: 1
 *                     district_id:
 *                       type: integer
 *                       example: 1
 *                     village_id:
 *                       type: integer
 *                       example: 1
 *                     patokan:
 *                       type: string
 *                       example: "Jl. Contoh No. 123"
 *       401:
 *         description: Unauthorized
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

router.put("/address",authenticateToken, async (req,res) => {
    const id = req.user.userId;
    const { id_address, province_id, regency_id, district_id, village_id, patokan } = req.body;
    try {
        const { data: address, error } = await supabase
            .from("addresses")
            .update({
                province_id: province_id,
                regency_id: regency_id,
                district_id: district_id,
                village_id: village_id,
                patokan: patokan
            })
            .eq("id_address", id_address)
            .eq("id_user", id)
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
            message: "Address Updated Successfully",
            data: address
        });
    } catch (error) {
        console.error(error);
    }
})

export default router;