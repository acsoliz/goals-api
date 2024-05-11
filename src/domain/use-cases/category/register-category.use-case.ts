import { RegisterCategoryDto } from "../../dtos/category/register-category.dto";
import { CustomError } from "../../errors/custom.error";
import { CategoryRepository } from "../../repositories/category.repository";

interface CategoryObj {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};


interface RegisterCategoryUseCase {
  execute(registerCategoryDto: RegisterCategoryDto): Promise<CategoryObj>;
}

export class RegisterCategory implements RegisterCategoryUseCase {
  constructor(
    private readonly caterogyResository: CategoryRepository //
  ) { }

  async execute(registerCategoryDto: RegisterCategoryDto): Promise<CategoryObj> {
    // Crear category
    const category = await this.caterogyResository.register(registerCategoryDto);
    return {
      // category: {
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
    };
  }
}
