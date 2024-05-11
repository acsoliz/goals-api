import { CategoryModel } from "../../data/mongodb";
import {
  CategoryDatasource,
  CustomError,
  EditCategoryDto,
  RegisterCategoryDto,
  CategoryEntity,
} from "../../domain";
import { CategoryMapper } from "../mappers/category.mapper";

export class CategoryDatasourceImpl implements CategoryDatasource {
  async register(registerCategoryDto: RegisterCategoryDto): Promise<CategoryEntity> {
    const { name, description, icon, color } =
      registerCategoryDto;

    try {
      // 1. insertar el nuevo registro
      const category = await CategoryModel.create({
        name: name,
        description: description,
        icon: icon,
        color: color,
      });

      await category.save(); // que hace esta linea?

      // 2. Mapear la respuesta a nuestra entidad
      return CategoryMapper.categoryEntityFromObject(category);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async edit(editCategoryDto: EditCategoryDto): Promise<CategoryEntity> {
    const { name, description, icon, color } = editCategoryDto;

    try {
      // 1. Verificar si el correo existe
      // const exists = await UserModel.findOne({ email });
      // if (exists) throw CustomError.badRequest("User already exists");

      // 2. Crear el Hash de contraseña
      const category = await CategoryModel.findOne();
      if (!category) throw CustomError.badRequest("category not found");
      category.name = name;
      category.description = description;
      category.icon = icon;
      category.color = color;
      await category.save();

      await category.save(); // que hace esta linea?

      // 3. Mapear la respuesta a nuestra entidad
      // return UserMapper.userEntityFromObject(category);
      return CategoryMapper.categoryEntityFromObject(category);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  // }
}
