import React,{useState , useEffect , useRef } from "react";
import Rating from '@mui/material/Rating';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button} from '@mui/material';
import {getRestaurant , getMenu} from "../Services/axios"
import { RstMenu } from "./menu";
import { Contact_us } from "./contact_us";
import { OrderPage } from "./order"
import { CartContext , TableContext } from "./cart";
import { Tables } from "./table";

export const Restaurant_page = () => {
  const [rest,setRest] = useState({id : null , name : null , date : null , address : "America" })
  const [value, setValue] = useState(3.5);
  //const tags = ["fast food" , "fried" , "chicken"  ]
  const [headImageLink ,setHeadImageLink] = useState ("https://foodexiran.com/wp-content/uploads/2022/08/store-banner.jpg")
  const [logoImage ,setLogoImage] = useState ("https://wpcdn.us-east-1.vip.tn-cloud.net/www.klkntv.com/content/uploads/2020/08/KFC-LOGO-1024x881.jpg")
  const [foods,setFoods] = useState( [{"name" : "Burger" , "count" : 0 , "price" : 183}, {"name" : "Chicken" , "count" : 0, "price" : 223 } , {"name" : "Hot Dog" , "count" : 0 , "price" : 375} , {"name" : "Pasta" , "count" : 0 , "price" : 343} , {"name" : "pizza" , "count" : 0, "price" : 432} , {"name" : "Fried Potato" , "count" : 0 , "price" : 99}])
  const foodTags = ["All", "Burger" ,"Fried", "Dessert" , "Pizza" , "Sandwitch"] 
  const [cart,setCart] = useState([]);
  const [nav,setNav] = useState(<RstMenu foodTags={foodTags} foods={foods} />)
  const [id,setId] = useState (1)
  const [restMenu,setMenu] = useState()
  const tabs = ["Menu 1" ,"Menu 2","Table","Cart"]
  const [active, setActive] = useState(1);
  const [table, setTable] = useState([{ "name" : "2 sit" , "total" : 20 , "full" : 5 } ,{ "name" : "4 sit" , "total" : 20 , "full" : 5 } , { "name" : "6 sit" , "total" : 20 , "full" : 5 }])
  const [tbList,setTbList] = useState( [{"name" : "2 Sit table" , "count" : 0 , "price" : 20}, {"name" : "4 Sit table" , "count" : 0, "price" : 40 } , {"name" : "6 Sit table" , "count" : 0 , "price" : 60}])

  foods.forEach (e =>{
    e["details"] = "Meat, Bread, Pickle, Tomato";
    e["image"] = "https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg";
  })
  
  function loadMenu (i) {
    setFoods(i.foods)
    foods.forEach (e =>{
      e["image"] = "https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg";
    })
  }

  useEffect (() => {

  },[active])

  useEffect(() => {
    getRestaurant(id).then (e => {
      setRest({
        city: e.data.city.cityName,
        comments: "chetori",
        name: e.data.name,
        address: e.data.address,
        description: e.data.description,
        logoImg: e.data.logoImage,
        backgroundImg: e.data.backgroundImg,
        id: e.data.id,
        dateCreated: e.data.dateCreated,
        tags : e.data.tags,
        rate : e.data.avg,
      })
      setValue(e.data.avg)
    }).catch()

    getMenu(id).then (m => {
      console.log(m.data[0].categories[0])
      setMenu(m.data)
    }).catch()
    console.log(restMenu)
  },[]);

  const theme = createTheme({
    palette: {
      neutral: {
        main: '#eeba2c',
      },

      black: {
        main: '#161616',
      },

      white: {
        main : '#ffffff'
      }
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
    <div className="All">
        <img className="HeadImage" src={headImageLink}></img>
        <img className="logo" src={logoImage}></img>
        <div className="details">
          <div className="info" >
            <label className="name">{rest.name}</label>
            <p className="description" >{rest.description}</p>
            <p className="location">City : {rest.city}</p>
            <p className="RestTags">Tags : 
              <ButtonGroup color="neutral" variant="text" aria-label="text button group">
                {rest.tags?.map(u => (
                  <Button>{u.value}</Button>
                  //console.log(u)
                ))}
              </ButtonGroup>
            </p>
            <span className="Rate">Rating :</span> <Rating className="rating" name="half-rating-read" defaultValue={value} precision={0.5} readOnly  />
          </div>
        </div>


        <CartContext.Provider value={{cart,setCart}}>
          <TableContext.Provider value={{tbList, setTbList}}>

          <div className="Tab">
            <button className={(active==1) ? "TabButton active" : "TabButton"} onClick={() => {setNav(<RstMenu foodTags={foodTags} foods={foods} />); setActive(1); }} >MENU</button>
            <button className={(active==2) ? "TabButton active" : "TabButton"} onClick={() => {setNav (<Tables/>); setActive(2)}} >TABLE</button>
            <button className={(active==3) ? "TabButton active" : "TabButton"} onClick={()=>  {setActive(3)}}>COMMENTS</button>
            <button className={(active==4) ? "TabButton active" : "TabButton"} onClick={()=>  {setNav (<Contact_us/>); setActive(4)}}>INFORMATION</button>
          </div>

          <div className="main">
            {nav}
          </div>
          
          </TableContext.Provider>
        </CartContext.Provider>
        
        <div className="distance"></div>
    </div>
    </ThemeProvider>
    </>
  )
}
