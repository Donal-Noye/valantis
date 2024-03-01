import { create } from "zustand";
import { ProductProps } from "../lib/types";

const useProductStore = create((set) => ({
  products: [],
  filters: {
    name: "",
    brand: "",
    price: 0,
  },

  setProducts: (products: ProductProps) =>
    set(() => ({
      products: products,
    })),

  setFilter: (filter: any) =>
    set((state: { filters: any }) => ({
      filters: { ...state.filters, ...filter },
    })),

  filteredProducts: (state: any) => {
    const products = state.products;
    const filters = state.filters;
    const { name, brand, price } = filters;

    return products.filter(
      (product: ProductProps) =>
        product.product.toLowerCase().includes(name.toLowerCase()) &&
        (product.brand.toLowerCase() === brand.toLowerCase() || brand === "") &&
        product.price >= price,
    );
  },
}));

export default useProductStore;