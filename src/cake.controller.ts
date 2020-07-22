import { RequestHandler } from "express";
import {
  createCake,
  removeCake,
  updateCake,
  fetchCakes,
  fetchCake
} from "./cake.repository";

export const postCake: RequestHandler = async (req, res, _) => {
  const { title, rating } = (await req.body) as {
    title: string;
    rating: number;
  };

  if (typeof title === "undefined" || typeof rating === "undefined") {
    res.status(400).send({ message: "Title and rating are required" });
  } else {
    const response = await createCake(title, rating);
    const cake = response.toObject();
    res.status(201).send(cake);
  }
};

export const getCakes: RequestHandler = async (_, res, __) => {
  const cakes = await fetchCakes();
  res.json(cakes);
};

export const getCake: RequestHandler = async (req, res, _) => {
  const { id } = req.params as { id: string };
  const cake = await fetchCake(id);

  if (cake) {
    res.json(cake);
  } else {
    res.status(404).send({ message: "Cake not found" });
  }
};

export const editCake: RequestHandler = async (req, res, _) => {
  const { id } = req.params as { id: string };
  const { title, rating } = req.body as {
    title: string | undefined;
    rating: number | undefined;
  };

  if (id) {
    const response = await updateCake(id, title, rating);
    if (response) {
      res.status(202).send(response);
    } else {
      res.status(400).send({ message: "Cake not found" });
    }
  }
};

export const deleteCake: RequestHandler = async (req, res, _) => {
  const { id } = req.params as { id: string };

  await removeCake(id).catch((_: Error) => {
    res.status(404).send({ message: "Cake not found" });
  });
  res.send({ message: "Cake removed" });
};
