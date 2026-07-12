import {
  AppBar,
  alpha,
  Box,
  Button,
  Toolbar,
  Typography,
  TextField,
  Dialog,
  Checkbox,
  FormGroup,
  FormControlLabel,
  DialogContent,
  IconButton,
  Tooltip,
  Menu,
} from "@mui/material";

import AlbumIcon from "@mui/icons-material/Album";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";

export function Header({}) {
  //   const [link, setLink] = useState(null);
  const [userId, setUserId] = useState(null);
  const authState = false;
  //   const signOut = async () => {
  //     const reqSignOut = await fetch("/api/firebase/signOut");
  //     const json = await reqSignOut.json();
  //   };

  //   useEffect(() => {
  //     //今ログインしてるユーザーの情報取得
  //     const getuserId = async () => {
  //       try {
  //         const response = await fetch("api/user");
  //         const json = await response.json();
  //         setUserId(json.data.id);
  //       } catch {
  //         console.error("error");
  //       }
  //     };
  //     getuserId();
  //   });

  return (
    // <Box
    //   sx={{
    //     flexGrow: 0,
    //     mb: "32px",
    //     width: "100%",
    //   }}
    // >
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: 3,
          pt: 3,
          minHeight: "auto",
          alignItems: "flex-start",
        }}
      >
        <IconButton
          aria-label="menu"
          component={Link}
          to="/"
          sx={{
            width: 40,
            height: 40,
            color: "custom.menuIcon",
            p: 0,
          }} // size="large"
          // edge="start"
          // aria-label="menu"
          // sx={{ ml: 1, mr: 2 }}
          // onClick={() => {
          //   if (userId) {
          //     setLink("/team");
          //   }
          // }}
          // href={link}
        >
          {/* <AlbumIcon color="primary" sx={{ mr: 2 }} /> */}

          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            color="primary"
            fontWeight="bold"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            GOD
          </Typography> */}
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
        {/* <Button
          variant="outlined"
          // onClick={signOut}
          href="/"
          sx={{
            mr: 2,
          }}
        >
          Logout
        </Button> */}
      </Toolbar>
    </AppBar>
    // </Box>
  );
}
