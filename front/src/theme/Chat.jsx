import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import NorthIcon from "@mui/icons-material/North";
import {
  AppBar,
  Autocomplete,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const promptLines = [
  "そなたのやりたいプロダクトに近しいプロダクト情報がないか、教えてやろう。",
  "そなたのしたいことはなんだ？？　議事録でも良いぞ。",
];

const autocompleteOptions = ["神に話しかけてみる"];

export const Chat = () => {
  const theme = useTheme();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Box
      component="main"
      data-model-id="893:26"
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          <Box sx={{ position: "relative", width: 40, height: 40 }}>
            <IconButton
              aria-label="menu"
              sx={{
                width: 40,
                height: 40,
                color: theme.palette.custom?.menuIcon || "#7a7a7a",
                p: 0,
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Box
              component="img"
              alt="Element"
              src="https://c.animaapp.com/HjmaaVXv/img/------------1@2x.png"
              sx={{
                position: "absolute",
                top: 2,
                left: 27,
                width: 15,
                height: 15,
                objectFit: "cover",
              }}
            />
            <Box
              component="img"
              alt="Vector"
              src="https://c.animaapp.com/HjmaaVXv/img/vector-11.svg"
              sx={{
                position: "absolute",
                top: 8,
                left: 26,
                width: 10,
                height: 10,
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Stack
        spacing={0}
        sx={{
          flex: 1,
          alignItems: "center",
          px: 3,
          pt: "67px",
          pb: "128px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 681,
            mt: 0,
          }}
        >
          <Divider sx={{ borderColor: "transparent" }} />
        </Box>
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: 751,
            mt: "60px",
            textAlign: "center",
          }}
        >
          {promptLines.map((line) => (
            <Typography
              key={line}
              component="p"
              sx={{
                fontFamily: '"Hina Mincho", Helvetica, Arial, serif',
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "34px",
                letterSpacing: "5px",
                color: theme.palette.text.primary,
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Stack>
      <Box
        component="footer"
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: "flex",
          justifyContent: "center",
          zIndex: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 708,
            px: 2,
            pt: 2.5,
            pb: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Autocomplete
              freeSolo
              fullWidth
              options={autocompleteOptions}
              value={value}
              inputValue={inputValue}
              onChange={(_, newValue) => setValue(newValue)}
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
              popupIcon={null}
              clearIcon={null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="神に話しかけてみる"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 1 }}>
                        <AddIcon
                          sx={{
                            fontSize: 24,
                            color: theme.palette.text.primary,
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      minHeight: 56,
                      pr: 1,
                    },
                    "& .MuiOutlinedInput-input": {
                      fontFamily:
                        '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                      color: theme.palette.text.secondary,
                      p: 0,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.action.border,
                    },
                  }}
                />
              )}
            />
            <IconButton
              aria-label="send"
              sx={{
                width: 40,
                height: 40,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderRadius: 1,
                flexShrink: 0,
                "&:hover": {
                  bgcolor: theme.palette.primary.main,
                },
              }}
            >
              <NorthIcon sx={{ fontSize: 27 }} />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
