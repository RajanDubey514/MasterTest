import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import CustomerBasic from "./customerBasic/CustomerBasic";
import BranchsDetail from "./branchsDetail/BranchsDetail";
import IntrestedProduct from "./intrestedProduct/IntrestedProduct";
import FollowUpActivity from "./followUpActivity/FollowUpActivity";

// ✅ Component Mapping
const componentsMap = {
  Customer_Basic_info: CustomerBasic,
  "Branch(S)_Detail": BranchsDetail,
  "Intrested_Product(S)": IntrestedProduct,
  Follow_Up_Activity: FollowUpActivity,
};

const CustomerUrl = () => {
  const [activeTab, setActiveTab] = useState("Customer_Basic_info");

  // ✅ Format tab name (keep parentheses like (S))
  const formatKey = (key) => {
    const formatted = key.replace(/_/g, " ").trim();
    return formatted.replace(/\b([a-z])/g, (char) => char.toUpperCase());
  };

  const ActiveComponent = componentsMap[activeTab];

  return (
    <Box sx={{ mt: 0 }}>
      {/* ✅ Top Controls */}
      <Grid
        sx={{
          p: 0,
          borderRadius: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f8f8f8",
        }}
      >
        {Object.keys(componentsMap).map((key) => (
          <Button
            key={key}
            onClick={() => setActiveTab(key)}
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
            //   py: { xs: 0.5, sm: 0.5 },
              fontWeight: 500,
              fontSize: {
                xs: "0.5rem", // Mobile
                sm: "0.6rem", // Tablet
                md: "0.8rem", // Desktop
              },
              backgroundColor:
                activeTab === key ? "primary.main" : "grey.300",
              color: activeTab === key ? "#fff" : "text.primary",
              boxShadow: activeTab === key ? 2 : "none",
              "&:hover": {
                backgroundColor:
                  activeTab === key ? "primary.dark" : "grey.400",
              },
            }}
          >
            {formatKey(key)}
          </Button>
        ))}
      </Grid>

      {/* ✅ Render Active Component */}
      <Box sx={{ mt: 1 }}>
        {ActiveComponent ? <ActiveComponent /> : null}
      </Box>
    </Box>
  );
};

export default CustomerUrl;
