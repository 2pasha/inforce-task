import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types';
import { loadProducts, saveProducts } from '../utils/localStorage';

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    return loadProducts();
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Omit<Product, 'id' | 'comments'>) => {
    const products = loadProducts();
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      comments: []
    };
    const updatedProducts = [...products, newProduct];

    saveProducts(updatedProducts);
    
    return newProduct;
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  'product/updateProduct',
  async (product) => {
    const products = loadProducts();
    const updatedProducts = products.map(p => (
      p.id === product.id ? product : p
    ));

    saveProducts(updatedProducts);

    return product;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    const products = loadProducts();
    const updatedProducts = products.filter(p => p.id !== id);

    saveProducts(updatedProducts);

    return id;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          item => item.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
