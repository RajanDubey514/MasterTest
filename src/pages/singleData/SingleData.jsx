import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";

const SingleData = ({ data }) => {
  if (!data) return <Typography>No data found</Typography>;

  // Convert data into label-value pairs
  const info = [
    { label: "Account Name", value: data.accountName },
    { label: "Account Code", value: data.accountCode },
    { label: "City", value: data.city },
    { label: "Address", value: data.address },
    { label: "Company", value: data.companyName },
    { label: "Email", value: data.email },
    { label: "Mobile", value: data.mobile },
    { label: "Website", value: data.website },
    { label: "MFG Code", value: data.mfgCode },
    { label: "State", value: data.state },
    { label: "Group", value: data.group },
    { label: "Country", value: data.country },
    { label: "Type", value: data.type },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        // p: 2,  
        // mt: 1,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          {info.map((item, index) => (
            <Grid item xs={6} sm={4} md={4} key={index}>
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 1.5,
                  backgroundColor: "#fafafa",
                  height: "100%",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.primary", mt: 0.5 }}
                >
                  {item.value && item.value.trim() !== "" ? item.value : "--"}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SingleData;
