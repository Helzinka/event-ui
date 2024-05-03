import type {
  CategoriesFindArg,
  CategoriesResponse,
} from '@/interfaces/category.interfaces';
import { instanceAxios } from './index';

export async function findCategories(options: CategoriesFindArg) {
  const { data } = await instanceAxios.get<CategoriesResponse>(
    'category/find',
    {
      params: options,
    }
  );
  return data;
}
