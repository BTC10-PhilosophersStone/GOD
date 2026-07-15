import AddIcon from "@mui/icons-material/Add";
import ArrowUpWardIcon from "@mui/icons-material/ArrowUpward";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Card,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PromptInputArea } from "../ChatApp/PromptInputArea";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { useEffect, useState, useRef } from "react";
import "@fontsource/hina-mincho";
import "@fontsource/zen-kaku-gothic-new";
import { GodMesseage } from "./GodMesseage";
import { ProductList } from "./ProductList";

export const ListView = ({ setIsShowDetail, isRegistered }) => {
  const [products, setProducts] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [displayList, setDisplayList] = useState(false);
  const [productDetail, setproductDetail] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("/product");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch {
        console.error("error");
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
    const timer = setTimeout(() => {
      scrollRef.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayList(true);
    }, 5500);
  }, [products]);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#ffffff",
        position: "relative",
        pb: "180px",
      }}
    >
      {editModalIsOpen && (
        <ProductDetail
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
          productDetail={productDetail}
          setproductDetail={setproductDetail}
          setIsShowDetail={setIsShowDetail}
          onClose={() => setEditModalIsOpen(false)}
        />
      )}
      <Container
        maxWidth={false}
        sx={{ maxWidth: "856px", pt: "82px", px: { xs: 3, sm: 4 } }}
      >
        <Stack spacing={7.75} alignitems="center">
          <GodMesseage scrollRef={scrollRef} />
          {displayList ? (
            <ProductList products={products} />
          ) : (
            <div
              style={{ height: "900px", backgroundColor: "#FFFFFF" }}
              aria-hidden="true"
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
};
