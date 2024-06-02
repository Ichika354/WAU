import express from "express";
import supabase from "../config/supabase.js";
import moment from "moment/moment.js";

import configureMiddleware from "../config/middleware.js";
import authenticateToken from "../config/authenticateToken.js";

const app = express();
configureMiddleware(app);
const router = express.Router();

// All order
router.get("/orders", async (req, res) => {
  try {
    const { data: orders, error } = await supabase.from("orders").select("*").order("id_order");

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
  }
});

// User Order
router.get("/order", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const { data: orders, error } = await supabase.from("orders").select("*, users(*)").eq("id_user", userId).order("id_order");

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/order", authenticateToken, async (req,res)=> {
  const userId = req.user.userId;

  const { qty, total_price } = req.body;

  console.log(qty);
})

export default router;
