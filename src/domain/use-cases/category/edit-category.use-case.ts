import { EditCategoryDto } from "../../dtos/category/edit-category.dto";
import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories/category.repository";

interface CategoryObj {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}


interface EditCategoryUseCase {
  execute(editCategoryDto: EditCategoryDto): Promise<CategoryObj>;
}

export class EditCategory implements EditCategoryUseCase {
  constructor(
    private readonly categoryResository: CategoryRepository //
  ) { }

  async execute(editCategoryDto: EditCategoryDto): Promise<CategoryObj> {
    // Editar category
    const category = await this.categoryResository.edit(editCategoryDto);

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
    };
  }
}
