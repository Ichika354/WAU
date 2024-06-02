import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment/moment.js";

import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

/**
 * @openapi
 * /category-admin:
 *   get:
 *     tags:
 *       - Category Admin
 *     description: Retrieve Category Admin data
 *     security: []
 *     responses:
 *       200:
 *         description: App is up and running
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
 *       500:
 *         description: Server error
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
    *   post:
 *     tags:
 *       - Category Admin
 *     description: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Sport"
 *               icon:
 *                 type: string
 *                 example: "fa-solid fa-sport"
 *     responses:
 *       201:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.get("/category-admin", async (req, res) => {
  try {
    const { data: categories, error } = await supabase.from("category_admins").select("*");

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * @openapi
 * /category-admin/{id}:
 *   get:
 *     tags:
 *       - Category Admin
 *     summary: Get a category admin by ID
 *     security : []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category admin to retrieve
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_category_admin:
 *                       type: integer
 *                     category:
 *                       type: string
 *                     icon:
 *                       type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.get("/category-admin/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data: categories, error } = await supabase.from("category_admins").select("*").eq("id_category_admin", id);

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: categories[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/category-admin", authenticateToken, async (req, res) => {
  const { category, icon } = req.body;

  // Periksa apakah user adalah admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You do not have access to this resource",
    });
  }

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  try {
    const createdAt = moment().locale("id").format("YYYY-MM-DD HH:mm:ss");

    const { data, error } = await supabase
      .from("category_admins")
      .insert({
        category: category,
        icon: icon,
        created_at: createdAt,
      })
      .select("*");

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Category Added Successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * @openapi
 * /category-admin/{id}:
 *   put:
 *     tags:
 *       - Category Admin
 *     summary: Update a category admin by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category admin to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The new category name
 *               icon:
 *                 type: string
 *                 description: The new category icon URL
 *             required:
 *               - category
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_category_admin:
 *                       type: integer
 *                     category:
 *                       type: string
 *                     icon:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

router.put("/category-admin/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { category, icon } = req.body;

  // Periksa apakah user adalah admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You do not have access to this resource",
    });
  }

  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  try {
    const updatedAt = moment().locale("id").format("YYYY-MM-DD ,HH:mm:ss");
    const { data, error } = await supabase
      .from("category_admins")
      .update({
        category: category,
        icon: icon,
        updated_at: updatedAt,
      })
      .eq("id_category_admin", id)
      .select("*");

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * @openapi
 * /category-admin/{id}:
 *   delete:
 *     tags:
 *       - Category Admin
 *     summary: Delete a category by ID
 *     description: Delete a category by its ID. Only accessible by admin users.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category Deleted Successfully
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
 *                   example: "Category Deleted Successfully"
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
 *                   example: "Internal server error"
 */

router.delete("/category-admin/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  // Periksa apakah user adalah admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You do not have access to this resource",
    });
  }

  try {
    const { data, error } = await supabase.from("category_admins").delete().eq("id_category_admin", id);

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
