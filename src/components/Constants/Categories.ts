// src/Constants/Categories.ts
import { Colors } from './Colors';

export type CategoryType = 'residential' | 'commercial' | 'cars' | 'two_wheeler';

export interface CategoryConfig {
  type: CategoryType;
  primaryColor: string;
  backgroundColor: string;
}

export const CATEGORY_CONFIGS: Record<CategoryType, CategoryConfig> = {
  residential: {
    type: 'residential',
    primaryColor: Colors.MAINFOUR_RESIDENTIAL_500,
    backgroundColor: Colors.MAINFOUR_RESIDENTIAL_100,
  },
  commercial: {
    type: 'commercial',
    primaryColor: Colors.MAINFOUR_COMMERCIAL_500,
    backgroundColor: Colors.MAINFOUR_COMMERCIAL_100,
  },
  cars: {
    type: 'cars',
    primaryColor: Colors.MAINFOUR_CARS_500,
    backgroundColor: Colors.MAINFOUR_CARS_100,
  },
  two_wheeler: {
    type: 'two_wheeler',
    primaryColor: Colors.MAINFOUR_TWOWHEELER_500,
    backgroundColor: Colors.MAINFOUR_TWOWHEELER_100,
  },
};