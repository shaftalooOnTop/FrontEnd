import { useState ,useContext ,useEffect} from "react";
import { CartContext} from "./cart";
import { OrderPage } from "./order";
import { getMenu ,getRestaurant} from "../../Services/axios";
import {url} from "../../Services/consts"


export function  RstMenu  ({id}) {
  const {cart,setCart} = useContext (CartContext);
  const [foodTags,setFoodTags] = useState ();
  const [foods,setFoods] = useState();
  const [flag, setFlag] = useState(0);
  const [restMenu,setMenu] = useState()
  var forFlag = 0;
  const [startFlag,setStart] = useState (0)
  
  const [favoriteFoods, setFavoriteFoods] = useState();

  useEffect(() => {
    getRestaurant(id).then (m => {
      setMenu(m.data.menu)
      setStart(() => !startFlag)
      setFavoriteFoods(m.data.favorites)
    }).catch()
  },[])

  // useEffect(() => {
  //   console.log ("ji")  
  //   loadAll(restMenu)
  // },[startFlag])

  function loadMenu (i) {
    console.table(i.foods)
    setFoods(i)
    //console.log(i.foods[0])
  }

  function loadAll (x) {
    setFoods([]);
    for (let i=0 ; i<x.length ; i++) {
      for (let j=0 ; j < x[i].foods.length ; j++) {
        // console.log(x[i].foods[j])
        //x.push(x[i].foods[j])
        setFoods(current => [...current, x[i].foods[j]])
      }
      //console.log(restMenu[i].foods)
      //foods.push(restMenu[i].foods)
    }
  }

  function inc (t) {
    t.foodCnt+=1
    console.log("ezafe")
    for (let i = 0 ; i < cart.length ; i++){
      if (t.name === cart[i].name) {
        forFlag=1;
        cart[i].order+=1
        break ;
      }
    }
    if (forFlag===0) {
      cart.push({
        name : t.name,
        price : t.price ,
        order : 1 ,
        id : t.id,
      });
    }
    

    forFlag = 0
    if (flag ===1 ) setFlag(0)
    else setFlag(1)
  }

  function dec (t) {
    t.foodCnt-=1
    for (let i = 0 ; i < cart.length ; i++){
      if (t.name === cart[i].name) {
        cart[i].order-=1;
        if (cart[i].order===0){
          setCart( cart.filter( a=>
            a.name !== t.name
          ))
          break;
        }
      }
    }
    if (flag ===1 ) setFlag(0)
    else setFlag(1)
  }

    return (
    
        <>
          <div className="menu">
            <div> 
              <div className="categories">
                <button onClick={() => loadAll(restMenu)} className="catButton">All</button>
                <button onClick={() => loadMenu(favoriteFoods)} className="catButton">Favorite</button>
                {restMenu?.map (tag => (
                  //JSON.stringify(tag.categories)
                  <button onClick={() => loadMenu(tag.foods)} className="catButton">{tag.categoryName}</button>
                ))}
              </div>
              <div className="foods">
                {foods?.map(x => (
                  <div className="newCard">
                    <img src={url+"api/www/ImgGet/"+x.photo.id} className="imageCard" />
                    <h2 className="cardTitle">{x.name}</h2>
                    <p className="cardDetails">{/*x.details*/}{x.foodDescription}</p>
                    <p className="cardLeft">Left : {x.count}</p>
                    <p className="price">{x.price}$</p>
                    <div className="ButtonGroup">
                    <button className="cardButton" onClick={() => {if (x.foodCnt > 0 ) {dec(x)}}} >-</button>
                      <span className="cardButton">{x.foodCnt}</span>
                      <button className="cardButton" onClick={() => { if (x.foodCnt < x.count) {inc(x)}}}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>  
          </div>
          
          <div className="receipt">
            <OrderPage id={id} />
          </div>


          
        </>
    )
}