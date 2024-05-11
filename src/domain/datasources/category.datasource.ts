import { EditCategoryDto, CategoryEntity, RegisterCategoryDto } from "..";

export abstract class CategoryDatasource {
  // todo:
  abstract register(registerCategoryDto: RegisterCategoryDto): Promise<CategoryEntity>;
  abstract edit(editCategoryDto: EditCategoryDto): Promise<CategoryEntity>;
}
