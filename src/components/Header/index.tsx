import styles from "./Header.module.scss";
import { Container } from "../Container";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <h1 className={styles.logo}>Valantis</h1>
          <a
            href="/https://github.com/Donal-Noye/valantis"
            target="_blank"
            className={styles.link}
          >
            Исходный код
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8 17.308L2.692 12L8 6.692l.713.714l-4.6 4.6L8.708 16.6zm8 0l-.713-.714l4.6-4.6L15.292 7.4L16 6.692L21.308 12z"
              />
            </svg>
          </a>
        </div>
      </Container>
    </header>
  );
};
