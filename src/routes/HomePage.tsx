import React, { useState, useEffect } from "react";
import { ProductList } from "../components/ProductList";
import { Filter } from "../components/Filter";
import useProductStore from "../hooks/useProductStore";
import {
  getProductIds,
  getProductItems,
  getProductFields,
  getProductFilterByName,
} from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { ProductProps } from "../lib/types";

function HomePage() {
  const setProducts = useProductStore((state: any) => state.setProducts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const pageLimit = 50;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get("page") || "0", 10);
    setPage(currentPage);
  }, [location.search]);

  useEffect(() => {
    setLoading(true);
    getProductIds(page * pageLimit, pageLimit + 1)
      .then((result) => {
        getProductItems(result)
          .then((productsResult) => {
            if (productsResult && productsResult.length > 0) {
              const uniqueItems: { [key: string]: ProductProps } = {};
              productsResult.forEach((item: ProductProps) => {
                if (!uniqueItems[item.id]) {
                  uniqueItems[item.id] = item;
                }
              });
              const uniqueItemsArray = Object.values(uniqueItems);
              if (uniqueItemsArray.length > pageLimit) {
                uniqueItemsArray.pop();
                setTotalPages(totalPages + 1);
              }
              setProducts(uniqueItemsArray);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error("API Error: ", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("API Error: ", error);
        setLoading(false);
      });
  }, [page, setProducts, pageLimit, totalPages, setLoading]);

  useEffect(() => {
    getProductIds(0, 100)
      .then((result) => {
        if (result && result.length > 0) {
          setTotalPages(Math.ceil(result.length / pageLimit));
        }
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });
  }, []);

  useEffect(() => {
    getProductFilterByName(name)
      .then((result) => {
        if (result && result.length > 0) {
          setProducts(result);
        }
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });

    getProductFields("brand", 0, 100)
      .then((result) => {
        setBrands(result.filter((brand: string | null) => brand !== null));
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });

    getProductFields("price", 0, 100)
      .then((result) => {
        setPrices(result);
      })
      .catch((error) => {
        console.error("API Error: ", error);
      });
  }, [name, setProducts]);

  const handlePageClick = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      if (newPage === 0) {
        navigate("/");
      } else {
        navigate(`?page=${newPage}`);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Ювелирные изделия</h1>
      <div className="wrapper">
        <Filter
          brands={brands}
          prices={prices}
          setName={setName}
        />
        {loading ? (
          <Loader />
        ) : (
          <div>
            <ProductList />
            <Pagination
              page={page}
              handlePageClick={handlePageClick}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
