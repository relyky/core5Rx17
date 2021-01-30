import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { P1 } from "Widgets/TypographyEx";

export default function GridDemo() {
  return (
    <Grid container spacing={1}>
      <Hidden lgDown>
        <Grid item xl={1}>
          <P1 style={{ fontSize: '2em' }}>＊</P1>
        </Grid>
      </Hidden>
      <Grid item xs={false} sm={6} md={4} lg={3} xl={2}>
        <P1 style={{ fontSize: '2em' }}>白日依山盡</P1>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <P1 style={{ fontSize: '2em' }}>黃河入海流</P1>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <P1 style={{ fontSize: '2em' }}>欲窮千里目</P1>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} >
        <P1 style={{ fontSize: '2em' }}>更上一層樓</P1>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <P1 style={{ fontSize: '1.4em', fontWeight: 'bolder' }}>登鸛雀樓/王之渙</P1>
      </Grid>
      <Hidden lgDown>
        <Grid item xl={1}>
          <P1 style={{ fontSize: '2em' }}>＊</P1>
        </Grid>
      </Hidden>
    </Grid>
  )
}