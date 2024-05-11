import {
  CategoryRepository,
  CategoryDatasource,
  EditCategoryDto,
  RegisterCategoryDto,
  CategoryEntity,
} from "../../domain";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) { }
  edit(editCategoryDto: EditCategoryDto): Promise<CategoryEntity> {
    return this.categoryDatasource.edit(editCategoryDto);
  }

  register(registerCategoryDto: RegisterCategoryDto): Promise<CategoryEntity> {
    return this.categoryDatasource.register(registerCategoryDto);
  }
}
