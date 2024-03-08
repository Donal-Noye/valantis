import { ProductCard } from "../ProductCard";
import styles from "./ProductsList.module.scss";
import { ProductProps } from "../../lib/types";
import useProductStore from "../../hooks/useProductStore";
import { useEffect } from "react";

interface ProductListProps {
  filteredProducts: ProductProps[];
  setFilteredProducts: (value: ProductProps[]) => void;
  products: ProductProps[];
  allProducts: ProductProps[];
}

export const ProductList = ({
  filteredProducts,
  setFilteredProducts,
  products,
  allProducts,
}: ProductListProps) => {
  const filters = useProductStore((state: any) => state.filters);

  useEffect(() => {
    const sourceProducts =
      filters.name || filters.price || filters.brand ? allProducts : products;
    const filtered = sourceProducts.filter((product: ProductProps) => {
      if (!filters.name && !filters.price && !filters.brand) {
        return true;
      }

      const filteredByName =
        !filters.name ||
        product.product.toLowerCase().includes(filters.name.toLowerCase());
      const filteredByPrice =
        !filters.price || product.price === filters.price;
      const filteredByBrand = !filters.brand || product.brand === filters.brand;

      return filteredByName && filteredByPrice && filteredByBrand;
    });
    setFilteredProducts(filtered);
  }, [products, allProducts, filters, setFilteredProducts]);

  return (
    <ul className={styles.list}>
      {filteredProducts.map((product: ProductProps) => (
        <ProductCard
          key={product.id}
          id={product.id}
          product={product.product}
          price={product.price}
          brand={product.brand}
        />
      ))}
    </ul>
  );
};
