import { create } from "zustand";

const useProductStore = create((set) => ({
  filters: {
    name: "",
    brand: "",
    price: 0,
  },

  setFilter: (filter: any) =>
    set((state: { filters: any }) => ({
      filters: { ...state.filters, ...filter },
    })),
}));

export default useProductStore;