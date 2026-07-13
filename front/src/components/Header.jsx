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
} from "@mui/material";

import AlbumIcon from "@mui/icons-material/Album";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function Header({}) {
  //   const [link, setLink] = useState(null);
  const [userId, setUserId] = useState(null);
  const authState = false;
  return (
    <Box
      sx={{
        flexGrow: 0,
        mb: "32px",
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          height: 60,
          backgroundColor: alpha("#ffffff", 0.5),
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ ml: 1, mr: 2 }}
            // onClick={() => {
            //   if (userId) {
            //     setLink("/team");
            //   }
            // }}
            // href={link}
          >
            <AlbumIcon color="primary" sx={{ mr: 2 }} />

            <Typography
              variant="h6"
              noWrap
              component="div"
              color="primary"
              fontWeight="bold"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              GOD
            </Typography>
          </IconButton>
          <Button
            variant="outlined"
            // onClick={signOut}
            href="/"
            sx={{
              mr: 2,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
