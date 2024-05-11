import { CategoryEntity } from "../entities/category.entity";
import { EditCategoryDto, RegisterCategoryDto } from "..";

export abstract class CategoryRepository {
  abstract register(registerCategoryDto: RegisterCategoryDto): Promise<CategoryEntity>;
  abstract edit(editCategoryDto: EditCategoryDto): Promise<CategoryEntity>;
}
