import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
      px={3}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{ mb: 2, fontSize: { xs: "4rem", sm: "6rem" } }}
      >
        404
      </Typography>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Oops! Página não encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A página que você está procurando não existe ou foi movida.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Voltar para Home
      </Button>
    </Box>
  );
};

export default NotFound;
