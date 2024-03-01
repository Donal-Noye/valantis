import { ProductProps } from "../../lib/types";
import styles from "./Card.module.scss";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const ProductCard = ({ id, product: name, brand, price }: ProductProps) => {
  return (
    <li className={styles.card}>
      <div className={styles.image}>
        <img src="https://placehold.co/246x246" alt="" />
      </div>
      <div className={styles.content}>
        {brand ? <p className={styles.brand}>{brand}</p> : <p className={styles.brand}>No brand.</p>}
        <h5 className={styles.name}>{name}</h5>
        <p className={styles.price}>{formatPrice(price)}</p>
        <button className={styles.btn}>Купить</button>
      </div>
    </li>
  );
};
