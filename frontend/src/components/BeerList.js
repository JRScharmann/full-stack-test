import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Pagination,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { getBeers } from "../services/api";
import BeerCard from "./BeerCard";

const BeerList = () => {
  const [beers, setBeers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBeers = async () => {
      setLoading(true);
      try {
        const response = await getBeers(page);
        setBeers(response);
        setError("");
      } catch (err) {
        setError(err.message || "Failed to fetch beers");
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Beer List
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
        {beers.map((beer) => (
          <Grid item xs={12} sm={6} md={4} key={beer.id}>
            <BeerCard beer={beer} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
        <Pagination
          count={10} // You might want to get this from the API
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default BeerList;
