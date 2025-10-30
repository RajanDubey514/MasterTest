import React from 'react'
import Home from './Home'
import { Grid } from '@mui/material'
import PieChartComponent from './GraphChartComponent'
import DonutChartComponent from './DonutChartComponent'

function Dashboard() {
  return (
    <div>
    <Grid>
      <Home />
    </Grid>
    <Grid>
      <PieChartComponent />
    </Grid><Grid>
      <DonutChartComponent/>
    </Grid>
    </div>
  )
}

export default Dashboard