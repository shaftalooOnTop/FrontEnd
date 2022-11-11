import React,{useState} from "react";
//import pic from "./Images/burger.jpg"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

export const Restaurant_page = () => {
  const [value, setValue] = useState(3.5);
  const tags = ["fast food" , "fried" , "chicken" ]
  const [link,setLink] = useState("https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg")
  const foods = ["Burger" , "Chicken" , "Hot Dog" ,"Pasta", "Fried Potato", "pizza"]

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#eeba2c',
      },
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
    <div className="All">
      <div className="HeadImage"></div>
      <div className="logo"></div>
      <div className="details">
        <div className="info" >
          <label className="name">KFC</label>
          <p className="description" >The first and best brand of fried foods in the world</p>
          <p className="location">Location : North california</p>
          <p className="Tags">Tags : <ButtonGroup color="neutral" variant="text" aria-label="text button group">
            {tags.map(tags => (
              <Button>{tags}</Button>
            ))}
            </ButtonGroup>
          </p>
          <span className="Rate">Rating :</span> <Rating className="rating" name="half-rating-read" defaultValue={value} precision={0.5} readOnly  />
        </div>
      </div>
      <div className="main">
        <div className="menu">


          <div className="categories">
            <button className="catButton">All</button>
            <button className="catButton">Burger</button>
            <button className="catButton">Fried</button>
            <button className="catButton">Dessert</button>
            <button className="catButton">Pizza</button>
            <button className="catButton">Sandwitch</button>
          </div>

          
          <div className="foods">
          {foods.map(x => (
            <div className="newCard">
              <img src={link} className="imageCard" />
              <h2 className="cardTitle">{x}</h2>
              <p className="cardDetails">Meat, Bread, Pickle, Tomato</p>
              <div className="ButtonGroup">
                <button className="cardButton">-</button>
                <button className="cardButton">0</button>
                <button className="cardButton">+</button>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
    </>
  )
}




/*
<div className="foods">
            {foods.map(x => (
              <Card className="MenuCard" sx={{ maxWidth: 230 , minHeight: 300 }}>
                <CardMedia component="img" height="140" image={link} alt="green iguana" />
                  <CardContent className="CardDetails">
                    <Typography gutterBottom variant="h5" component="div" className="typo">
                      {x}
                    </Typography>
                    <Typography variant="body2">
                      Meat, Bread, Pickle, Tomato
                      asdasdads
                    </Typography>
                  </CardContent>
                  <CardActions className="CardAction">
                    <Button color="neutral" size="small">-</Button>
                    <Button color="neutral" size="small">0</Button>
                    <Button color="neutral" size="small">+</Button>
                  </CardActions>
              </Card>
            ))}
          </div>
*/