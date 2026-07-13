import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Chip,
  Stack,
  LinearProgress,
} from "@mui/material";
import "./List.css";

export default function List() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("/product");
        const data = await res.json();
        setProducts(data);
      } catch {
        console.error("error");
      }
    };
    getProduct();
  }, []);

  const productList = products.map((ele) => {
    return (
      <div
        className="card"
        key={ele.id}
        onClick={async () => {
          try {
            const res = await fetch(`/product/${ele.id}`);
            const data = await res.json();
          } catch {
            console.error("error");
          }
        }}
      >
        <div className="stack">
          <div className="left">
            <div className="leftTop">
              <div className="idBox">
                <p className="id">id:{ele.id}</p>
              </div>
            </div>
            <p className="name">{ele.name}</p>
          </div>

          <div className="right">
            <div className="rightTop">
              <p className="matchRate">総合関連度</p>
              <div className="numberPercent">
                <p className="number">{ele.percent}</p>
                <p className="percent">%</p>
              </div>
            </div>
            <div className="graghBox">
              <LinearProgress
                variant="determinate"
                value={ele.percent}
                // sx={{
                //   mt: 1,
                //   height: 10,
                //   borderRadius: 5,
                //   bgcolor: "#d9d9d9",
                //   "& .MuiLinearProgress-bar": {
                //     bgcolor: "#B89428",
                //     borderRadius: 5,
                //   },
                // }}
                className="gragh"
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className="Frame153">{productList}</div>;
}
