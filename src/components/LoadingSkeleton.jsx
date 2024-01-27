import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";

function LoadingSkeleton() {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={64}
      />
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={5}>
          <Stack spacing={2.5}>
            {Array.from(new Array(5)).map((item, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="35vw"
                  height={80}
                />
              </Grid>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={5}>
          <Stack spacing={1}>
            {/* <Skeleton variant="rectangular" width={150} height={30} marginleft={70} /> */}

            <Skeleton
              variant="circular"
              width={40}
              height={40}
              marginLeft={10}
            />
            <Skeleton variant="rectangular" width={510} height={60} />
            <Skeleton variant="rounded" width={510} height={200} />
            <Skeleton variant="rectangular" width={510} height={30} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default LoadingSkeleton;
