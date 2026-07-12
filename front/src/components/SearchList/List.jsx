import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

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
  console.log("products is", products);

  const productList = products.map((ele) => {
    const name = Object.keys(ele)[0].slice(5);
    const value = Object.values(ele)[0];
    // console.log("name is ", name);
    // console.log("value is ", value);
    return (
      <li key={ele.id}>
        <Box sx={{ border: "1px dashed", mt: "10px" }}>
          <Typography>{ele.name}</Typography>
          <Typography>{ele.percent}</Typography>
        </Box>
      </li>
    );
  });

  return <Box>{productList}</Box>;
}
