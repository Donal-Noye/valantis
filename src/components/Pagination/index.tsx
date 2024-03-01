import styles from "./Pagination.module.scss";
import arrow from "../../assets/icons/arrow.svg"
import clsx from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageClick: (newPage: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  handlePageClick,
}: PaginationProps) => {
  const renderPageButtons = () => {
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i).map((pageNum) => (
        <button
          className={clsx(
            styles.btn + " " + styles.pageNum,
            pageNum === page && styles.active
          )}
          key={pageNum}
          onClick={() => handlePageClick(pageNum)}
        >
          {pageNum + 1}
        </button>
      ));
    } else {
      const visiblePages = [];
      if (page < 3) {
        visiblePages.push(0, 1, 2, 3, '...', totalPages - 1);
      } else if (page > totalPages - 4) {
        visiblePages.push(0, '...', totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        visiblePages.push(0, '...', page - 1, page, page + 1, '...', totalPages - 1);
      }

      return visiblePages.map((item, index) => (
        <button
          key={index}
          className={clsx(
            styles.btn,
            item === page && styles.active
          )}
          onClick={() => handlePageClick(typeof item === 'number' ? item : page)}
        >
          {typeof item === 'number' ? item + 1 : '...'}
        </button>
      ));
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        onClick={() => handlePageClick(page - 1)}
        disabled={page === 0}
      >
        <img src={arrow} alt="" />
        Назад
      </button>
      {renderPageButtons()}
      <button
        className={styles.btn}
        onClick={() => handlePageClick(page + 1)}
        disabled={page === totalPages - 1}
      >
        Вперёд
        <img src={arrow} alt="" />
      </button>
    </div>
  );
};
