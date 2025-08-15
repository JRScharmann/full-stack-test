import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Tooltip,
} from "@mui/material";

const BeerCard = ({ beer }) => (
  <Card
    sx={{
      width: {
        xs: "100%",
        sm: "calc(50% - 16px)",
        md: "calc(33.333% - 16px)",
        lg: "calc(25% - 16px)",
        xl: "calc(20% - 16px)",
      },
      display: "flex",
      flexDirection: "column",
      minWidth: 250,
      maxWidth: 300,
      height: "fit-content",
    }}
  >
    <CardMedia
      component="img"
      height="160"
      image={beer.image}
      alt={beer.name}
      sx={{
        objectFit: "contain",
        p: 1,
        bgcolor: "#f5f5f5",
        maxHeight: 160,
      }}
    />
    <CardContent sx={{ flexGrow: 1, py: 1, px: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={0.5}
      >
        <Tooltip title={beer.name}>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              fontWeight: "medium",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "calc(100% - 60px)", // deixa espaço para o chip de ABV
            }}
          >
            {beer.name}
          </Typography>
        </Tooltip>
        <Chip
          label={`${beer.abv}%`}
          size="small"
          color="primary"
          sx={{ ml: 1 }}
        />
      </Box>
      <Typography
        color="textSecondary"
        sx={{
          fontStyle: "italic",
          fontSize: "0.8rem",
          mb: 1,
        }}
      >
        {beer.tagline}
      </Typography>
      <Tooltip title={beer.description}>
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "0.875rem",
            lineHeight: 1.4,
          }}
        >
          {beer.description}
        </Typography>
      </Tooltip>
    </CardContent>
  </Card>
);

export default BeerCard;
