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

router.get("/product", async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
                *,
                categories (*)
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

router.post("/product", authenticateToken, upload.single("image"), async (req, res) => {
  const { id_category, produkName, price, stock, detail } = req.body;
  const userId = req.user.userId; // Mengambil userId dari token yang telah di-autentikasi
  const image = req.file;

  console.log(userId);

  console.log(id_category, produkName, price, stock, detail);

  try {
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

    // Generate unique filename using UUID
    const { data: imageData, error: imageError } = await supabase.storage.from("productImage").upload(`/${image.originalname}`, image.buffer);

    if (imageError) {
      return res.json(imageError);
    }

    // Insert product data into the database
    const { data: products, error: insertError } = await supabase
      .from("products")
      .insert({
        id_user: userId,
        id_category: id_category,
        produkName: produkName,
        price: price,
        photo: imageData.path,
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

router.put("/product/:id", authenticateToken, upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { id_category, produkName, price, stock, detail } = req.body;
  const userId = req.user.userId; // Mengambil userId dari token yang telah di-autentikasi
  const image = req.file;

  try {
    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

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
        produkName: produkName,
        price: price,
        photo: "photoUrl",
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
