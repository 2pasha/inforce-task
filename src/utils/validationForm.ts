import { FormErrors } from '../types';

interface ProductFormData {
  name: string;
  imageUrl: string;
  count: string | number;
  width: string | number;
  height: string | number;
  weight: string | number;
}

export const validateForm = (formData: ProductFormData): {
  isValid: boolean;
  errors: FormErrors
} => {
    const errors: FormErrors = {};

    if (!String(formData.name).trim()) {
      errors.name = 'Name is required';
    }

    const count = Number(formData.count);

    if (!formData.count || count <= 0) {
      errors.count = 'Count must be greater than 0';
    }

    const width = Number(formData.width);

    if (!formData.width || width <= 0) {
      errors.width = 'Width must be greater than 0';
    }

    const height = Number(formData.height);

    if (!formData.height || height <= 0) {
      errors.height = 'Height must be greater than 0';
    }

    const weight = Number(formData.weight);

    if (!formData.weight || weight <= 0) {
      errors.weight = 'Weight must be greater than 0';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }