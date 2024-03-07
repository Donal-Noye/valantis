import { create } from "zustand";
import { ProductProps } from "../lib/types";

const useProductStore = create((set) => ({
  products: [],
  allProducts: [],
  filters: {
    name: "",
    brand: "",
    price: 0,
  },

  setProducts: (products: ProductProps) =>
    set(() => ({
      products: products,
    })),

  setAllProducts: (allProducts: ProductProps) =>
    set(() => ({
      allProducts: allProducts,
    })),

  setFilter: (filter: any) =>
    set((state: { filters: any }) => ({
      filters: { ...state.filters, ...filter },
    })),
}));

export default useProductStore;