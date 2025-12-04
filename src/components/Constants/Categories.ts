// src/Constants/Categories.ts
import { Colors } from './Colors';

export type CategoryType = 'residential' | 'commercial' | 'cars' | 'two_wheeler';

export interface CategoryConfig {
  type: CategoryType;
  primaryColor: string;
  backgroundColor: string;
  apiType: 'property' | 'vehicle';
  propertyTypeId?: number;
  vehicleTypeId?: number;
}

export const CATEGORY_CONFIGS: Record<CategoryType, CategoryConfig> = {
  residential: {
    type: 'residential',
    primaryColor: Colors.MAINFOUR_RESIDENTIAL_500,
    backgroundColor: Colors.MAINFOUR_RESIDENTIAL_100,
    apiType: 'property',
    propertyTypeId: 1,
  },
  commercial: {
    type: 'commercial',
    primaryColor: Colors.MAINFOUR_COMMERCIAL_500,
    backgroundColor: Colors.MAINFOUR_COMMERCIAL_100,
    apiType: 'property',
    propertyTypeId: 2,
  },
  cars: {
    type: 'cars',
    primaryColor: Colors.MAINFOUR_CARS_500,
    backgroundColor: Colors.MAINFOUR_CARS_100,
    apiType: 'vehicle',
    vehicleTypeId: 1,
  },
  two_wheeler: {
    type: 'two_wheeler',
    primaryColor: Colors.MAINFOUR_TWOWHEELER_500,
    backgroundColor: Colors.MAINFOUR_TWOWHEELER_100,
    apiType: 'vehicle',
    vehicleTypeId: 2,
  },
};