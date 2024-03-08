import React, { useEffect, useState } from "react";
import styles from './Filter.module.scss';
import useProductStore from '../../hooks/useProductStore';

interface FilterProps {
  brands: string[];
  prices: number[];
  setName: (value: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ brands, prices, setName }) => {
  const [searchName, setSearchName] = useState('');
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const setFilter = useProductStore((state: any) => state.setFilter);

  useEffect(() => {
    const updateFilters = () => {
      setFilter({
        name: searchName,
        brand: selectedBrand,
        price: selectedPrice,
      });
    };

    updateFilters()
  }, [setFilter, searchName, selectedBrand, selectedPrice]);

  return (
    <div className={styles.filters}>
      <div className={styles.item}>
        <h5 className={styles.title}>Поиск</h5>
        <input
          type="text"
          className={styles.input}
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.item}>
        <h5 className={styles.title}>Цена</h5>
        <div className={styles.prices}>
          <select
            className={styles.input}
            value={selectedPrice || ''}
            onChange={(e) => {
              const price = e.target.value === '' ? null : parseInt(e.target.value);
              setSelectedPrice(price);
            }}
          >
            <option value="">Все цены</option>
            {prices && prices.map((price, idx) => (
              <option key={idx} value={price}>{price}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.item}>
        <h5 className={styles.title}>Бренды</h5>
        <div className={styles.brands}>
          <select
            className={styles.input}
            value={selectedBrand || ''}
            onChange={(e) => {
              const brand = e.target.value === '' ? null : e.target.value;
              setSelectedBrand(brand);
            }}
          >
            <option value="">Все бренды</option>
            {brands && brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
