import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import Home from "./Home";
import PieChartComponent from "./GraphChartComponent";
import DonutChartComponent from "./DonutChartComponent";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={3}>
  
        {/* Pie Chart Card */}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card
            sx={{
              height: 350,
              boxShadow: 3,
              borderRadius: 3,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pie Chart
              </Typography>
              <PieChartComponent />
            </CardContent>
          </Card>
        </Grid>

        {/* Donut Chart Card */}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card
            sx={{
              height: 350,
              boxShadow: 3,
              borderRadius: 3,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Donut Chart
              </Typography>
              <DonutChartComponent />
            </CardContent>
          </Card>
        </Grid>

            {/* Home Card */}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card
            sx={{
              height: 350,
              boxShadow: 3,
              borderRadius: 3,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Home Overview
              </Typography>
              <Home />
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </div>
  );
}

export default Dashboard;
