import Cake from "./cake.model";

export const createCake = (title: string, rating: number) => {
  const newCake = new Cake({ title, rating });
  return newCake.save();
};

export const fetchCakes = () => Cake.find();

export const fetchCake = (id: string) =>
  Cake.findOne({ _id: id })
    .lean()
    .catch(_ => null);

export const updateCake = (
  id: string,
  title: string | undefined,
  rating: number | undefined
) => {
  let updatedCake = {};
  if (typeof title !== "undefined") {
    updatedCake = { title, ...updatedCake };
  }
  if (typeof rating !== "undefined") {
    updatedCake = { rating, ...updatedCake };
  }

  return Cake.findOneAndUpdate({ _id: id }, updatedCake, (err, doc) => {
    if (err) return null;
    return doc;
  }).catch(_ => {
    return null;
  });
};

export const removeCake = (id: string) =>
  Cake.deleteOne({ _id: id })
    .lean()
    .catch(_ => null);
