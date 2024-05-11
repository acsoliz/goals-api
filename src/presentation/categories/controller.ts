import { Request, Response } from "express";
import {
  CategoryRepository,
  EditCategory,
  EditCategoryDto,
  RegisterCategory,
  RegisterCategoryDto,
  CustomError,
} from "../../domain";
import { CategoryModel } from "../../data/mongodb";

export class CategoriesController {
  // DI
  constructor(private readonly categoryRepository: CategoryRepository) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log("error:", error); // Winston
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerCategory = (req: Request, res: Response) => {

    const [error, registerCategoryDto] = RegisterCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });
    new RegisterCategory(this.categoryRepository)
      .execute(registerCategoryDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  editCategory = (req: Request, res: Response) => {
    const [error, editCategoryDto] = EditCategoryDto.create(req.body);
    const { id } = req.body;

    if (error) return res.status(400).json({ error });
    if (!id) return res.status(400).json({ error: "id is required!" });

    CategoryModel.findOneAndUpdate({ _id: id }, { ...editCategoryDto }, { new: true })
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getCategories = (req: Request, res: Response) => {
    const { categoriesIds } = req.body;
    const { owner } = req.query;
    const query = categoriesIds ? { _id: { $in: categoriesIds } } : (owner ? { owner } : {});

    // CategoryModel.find(query)
    CategoryModel.aggregate([
      { $match: query },
      { $addFields: { id: { $toString: "$_id" } } },
      { $project: { _id: 0 } }
    ])
      .then((categories) => {
        res.json({ total: categories.length, categories });
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };

  getCategory = (req: Request, res: Response) => {
    const { id } = req.params;

    CategoryModel.findById(id)
      .then((category) => {
        if (category) {
          const { _id, ...otherProperties } = category.toObject();
          res.json({ id: _id.toString(), ...otherProperties });
        } else {
          res.status(404).json({ error: "Category not found" });
        }
      })
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
