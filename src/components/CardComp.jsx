import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

function CardComp() {
  return (
    <>
      <Card
        sx={{
          maxWidth: 500,
          my: 4,
          mx: "auto",
          border: 1,
          borderColor: "primary.main",
          boxShadow: 3,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[100] }} aria-label="resolve">
              A
            </Avatar>
          }
          title="Abishek"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Artificial Intelligence scope in future
          </Typography>
          <Typography sx={{ my: 1 }} variant="body2" color="text.secondary">
            #artificialintelligence #artificialIntelligencedevelopment{" "}
          </Typography>
          <Typography variant="body2" color="text.primary">
            How do you envision the responsible integration of artificial
            intelligence in the society, considering both its potential benefits
            and the ethical challenges it may pose? What kind of principles
            should guide the development and deployment of AI technologies?
          </Typography>
        </CardContent>

        <CardMedia
          component="img"
          height="200"
          image="https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg"
          alt="Artificial Intelligence"
        />
        <CardActions>
          <Button size="small" variant="outlined" sx={{ height: 30 }}>
            <IconButton aria-label="upvote" sx={{ cursor: "pointer" }}>
              <ThumbUpOutlinedIcon />
            </IconButton>
            <Typography textTransform={"lowercase"}>2k</Typography>
          </Button>
          <Button size="small" variant="outlined" sx={{ height: 30 }}>
            <IconButton aria-label="downvote" sx={{ cursor: "pointer" }}>
              <ThumbDownOutlinedIcon />
            </IconButton>
          </Button>
          <Button variant="contained" sx={{ height: 30, cursor: "pointer" }}>
            learn more
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
export default CardComp;
