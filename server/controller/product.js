import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment/moment.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

/**
 * @openapi
 * /product:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get list of products
 *     security: []
 *     description: Retrieve a list of all products with their categories.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of products
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
 *                       id_product:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: ProductName
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 19.99
 *                       description:
 *                         type: string
 *                         example: Product description here
 *                       category_id:
 *                         type: integer
 *                         example: 1
 *                       categories:
 *                         type: object
 *                         properties:
 *                           id_category:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: CategoryName
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

router.get("/product", async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
          *,
          categories (*, category_admins(category,icon)),
          users(id,name,npm,role)
        `
      )
      .order("id_product");

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {}
});

/**
 * @openapi
 * /product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get product by ID
 *     security: []
 *     description: Retrieve a product by its ID along with its category.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved product
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
 *                     id_product:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: ProductName
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 19.99
 *                     description:
 *                       type: string
 *                       example: Product description here
 *                     category_id:
 *                       type: integer
 *                       example: 1
 *                     categories:
 *                       type: object
 *                       properties:
 *                         id_category:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: CategoryName
 *       404:
 *         description: Product not found
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
 *                   example: Product not found
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

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
                *,
                categories (*)
            `
      )
      .eq("id_product", id);

    if (products <= 0) {
      return res.json({
        success: true,
        message: "Product not found",
      });
    }

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {}
});

/**
 * @openapi
 * /product-seller:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get seller's products
 *     description: Retrieve all products associated with the authenticated seller.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved seller's products
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
 *                       id_product:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: ProductName
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 19.99
 *                       description:
 *                         type: string
 *                         example: Product description here
 *                       category_id:
 *                         type: integer
 *                         example: 1
 *                       categories:
 *                         type: object
 *                         properties:
 *                           id_category:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: CategoryName
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
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
 *                   example: Product not found
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

router.get("/product-seller", authenticateToken, async (req, res) => {
  const id = req.user.userId; // Mengambil userId dari token yang telah di-autentikasi
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
                *,
                categories (*)
            `
      )
      .eq("id_user", id);

    if (products <= 0) {
      return res.json({
        success: true,
        message: "Product not found",
      });
    }

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {}
});

/**
 * @openapi
 * /product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add new product
 *     description: Add a new product for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_category:
 *                 type: integer
 *                 example: 1
 *               product_name:
 *                 type: string
 *                 example: "Product Name"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               stock:
 *                 type: integer
 *                 example: 100
 *               detail:
 *                 type: string
 *                 example: "Detailed description of the product"
 *               photo:
 *                 type: string
 *                 example: "filename.jpg"
 *     responses:
 *       200:
 *         description: Successfully added new product
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
 *                   example: Product has been added
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_product:
 *                       type: integer
 *                       example: 1
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     id_category:
 *                       type: integer
 *                       example: 1
 *                     product_name:
 *                       type: string
 *                       example: "Product Name"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 19.99
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     detail:
 *                       type: string
 *                       example: "Detailed description of the product"
 *                     photo:
 *                       type: string
 *                       example: "URL of the product image"
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

router.post("/product", authenticateToken, upload.single("image"), async (req, res) => {
  const { id_category, product_name, price, stock, detail, photo } = req.body;
  const userId = req.user.userId; // Mengambil userId dari token yang telah di-autentikasi
  // const image = req.file;

  try {
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    // Generate unique filename using UUID
    // const { data: imageData, error: imageError } = await supabase.storage.from("productImage").upload(`/${image.originalname}`, image.buffer);

    // if (imageError) {
    //   return res.json(imageError);
    // }

    // Insert product data into the database
    const { data: products, error: insertError } = await supabase
      .from("products")
      .insert({
        id_user: userId,
        id_category: id_category,
        product_name: product_name,
        price: price,
        photo: photo,
        stock: stock,
        detail: detail,
        created_at: createdAt,
      })
      .select("*");

    if (insertError) {
      console.error("Insert error:", insertError);
      return res.status(500).json({
        success: false,
        message: insertError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product has been added",
      data: products,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * @openapi
 * /product/{id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update product
 *     description: Update a product for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_category:
 *                 type: integer
 *                 example: 1
 *               product_name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *               stock:
 *                 type: integer
 *                 example: 200
 *               detail:
 *                 type: string
 *                 example: "Updated detailed description of the product"
 *               photo:
 *                 type: string
 *                 example: "updated_filename.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated product
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
 *                   example: Product has been updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_product:
 *                       type: integer
 *                       example: 1
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     id_category:
 *                       type: integer
 *                       example: 1
 *                     product_name:
 *                       type: string
 *                       example: "Updated Product Name"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 29.99
 *                     stock:
 *                       type: integer
 *                       example: 200
 *                     detail:
 *                       type: string
 *                       example: "Updated detailed description of the product"
 *                     photo:
 *                       type: string
 *                       example: "URL of the updated product image"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-06-02T12:00:00Z"
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

router.put("/product/:id", authenticateToken, upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { id_category, product_name, price, stock, detail, photo } = req.body;
  const userId = req.user.userId; // Mengambil userId dari token yang telah di-autentikasi
  const image = req.file;

  console.log(id_category, product_name, price, stock, detail, photo);

  try {
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    const { product, error } = await supabase.from("products").select(
      `
                *,
                categories (*)
            `
    );

    if (product <= 0) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    // Generate unique filename using UUID
    // const uniqueFileName = `images/${uuidv4()}.${image.originalname.split('.').pop()}`;

    // Upload photo to Supabase Storage
    // const { data: uploadData, error: uploadError } = await supabase
    //     .storage
    //     .from('productImage') // Ganti dengan nama bucket Anda
    //     .upload(uniqueFileName, image.buffer, {
    //         cacheControl: '3600',
    //         upsert: false,
    //         contentType: image.mimetype
    //     });

    // if (uploadError) {
    //     console.error("Upload error:", uploadError);
    //     return res.status(500).json({
    //         success: false,
    //         message: uploadError.message
    //     });
    // }

    // const photoUrl = uploadData.Key;

    // Update product data in the database
    const { data: products, error: updateError } = await supabase
      .from("products")
      .update({
        id_user: userId,
        id_category: id_category,
        product_name: product_name,
        price: price,
        photo: photo,
        stock: stock,
        detail: detail,
        updated_at: createdAt,
      })
      .eq("id_product", id)
      .select("*");

    if (updateError) {
      console.error("Update error:", updateError);
      return res.status(500).json({
        success: false,
        message: updateError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product has been updated",
      data: products,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * @openapi
 * /product/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete product
 *     description: Delete a product for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted product
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
 *                   example: Product has been deleted
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_product:
 *                       type: integer
 *                       example: 1
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     id_category:
 *                       type: integer
 *                       example: 1
 *                     product_name:
 *                       type: string
 *                       example: "Deleted Product Name"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 19.99
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     detail:
 *                       type: string
 *                       example: "Detailed description of the deleted product"
 *                     photo:
 *                       type: string
 *                       example: "URL of the deleted product image"
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

router.delete("/product/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { data: products, error: deleteError } = await supabase.from("products").delete().eq("id_product", id).select("*");

    if (deleteError) {
      console.error("Delete error:", deleteError);
      return res.status(500).json({
        success: false,
        message: deleteError.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product has been deleted",
      data: products,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
