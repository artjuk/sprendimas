import { Router } from "express";
import {
  postCake,
  getCakes,
  getCake,
  editCake,
  deleteCake
} from "./cake.controller";

const router = Router();

router.post("/", postCake);

router.get("/", getCakes);

router.get("/:id", getCake);

router.patch("/:id", editCake);

router.delete("/:id", deleteCake);

export default router;
