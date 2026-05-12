const express = require("express");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProductBySlug,
  getAllProductsByAdmin,
  deleteProductsByAdmin,
  getAllSoldProducts,
  verifyAndAddCommissionProductByAdmin,
  getAllProductsofUser,
  getWonProducts,
} = require("../controllers/productCtr");
const { upload } = require("../utils/fileUpload");
const { protect, isSeller, isAdmin } = require("../middleWare/authMiddleWare");
const router = express.Router();

router.post("/", protect, isSeller, upload.single("image"), createProduct);
router.delete("/:id", protect, isSeller, deleteProduct);
router.put("/:id", protect, isSeller, upload.single("image"), updateProduct);

router.get("/", getAllProducts);
router.get("/user", protect, getAllProductsofUser);
router.get("/won-products", protect, getWonProducts);
router.get("/sold", getAllSoldProducts);
router.get("/:id", getProductBySlug);

// Only access for admin users
router.patch("/admin/product-verified/:id", protect, isAdmin, verifyAndAddCommissionProductByAdmin);
router.get("/admin/products", protect, isAdmin, getAllProductsByAdmin);
router.delete("/admin/products", protect, isAdmin, deleteProductsByAdmin);

module.exports = router;
