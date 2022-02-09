import React, { useEffect,useState } from "react";
import {db,auth} from '../firebase'
import { useLocation,useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer'
import CurrencyFormat from 'react-currency-format';
import firebase from "firebase";
import queryString from 'query-string';
import { useCookies } from 'react-cookie';

import Footer from "../components/Footer";
import Header from "../components/Header";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function SingleFood() {
    const navigate = useNavigate();
    const[comment,setComment]=useState("")
    const[stars,setStars]=useState()
    const[review,setReview]=useState([])
    //const[user,setUser]=useState([])
    const {state} = useLocation();
    const[userDetails,setUserDetails]=useState([])
    const[data,setData]=useState([])
    const [cookies, setCookie] = useCookies(['id']);
    const [{ basket }, dispatch] = useStateValue();

    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => setOpen1(true);
    const handleClose = () => setOpen1(false);
    
    useEffect(() => {
        const checkPayment = async()=>{
            //checking params to see if payment was success
            const parsed = queryString.parse(window.location.search);
            console.log(parsed.redirect_status);
            if(parsed.redirect_status==="succeeded"){
                db.collection('order').doc(cookies.id).update({
                    paid:true,
                 })
                alert("payment succes")
            }else if(parsed.redirect_status==="failed"){
                alert("payment failed")
            }else{
                console.log("no response from stripe")
            }
             
            
    }
       checkPayment()
    },[cookies.id])
    
    const addToBasket = (e) => {
        //const sum = 1;
        dispatch({
            type: 'ADD_TO_BASKET',
            item : {
                id: uuidv4(),
                name: e.name,
                price: parseInt(e.price),
               
            },
        })
        setOpen1(true)
    };

    const addSides = (name,price) => {
        //const sum = 1;
        dispatch({
            type: 'ADD_TO_BASKET',
            item : {
                id: uuidv4(),
                name: name,
                price: parseInt(price),
               
            },
        })
        setOpen1(true)
    };

    const removeFromBasket = (id) => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });

    };
    //getting user info so they can comment
    useEffect(() => {
        // will only run once when the app component loads...
    
        auth.onAuthStateChanged((authUser) => {
          console.log("THE USER IS >>> ", authUser);
          //setUser(authUser)
          if(authUser){
            db.collection("users").where("email", "==", authUser.email)
            .onSnapshot((querySnapshot) => {
               
              setUserDetails(querySnapshot.docs.map((doc)=>doc.data()))
               
        })
         
        }else{
            console.log("not logged in")
            
        }
        });
      }, []);

      //posting a comment
   const submit =()=>{
       if(stars && comment){
      if(userDetails[0]){
        db.collection('comment').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            name:userDetails[0].name,
            image:userDetails[0].image,
            comment:comment,
            stars:stars,
        })
         alert("commented")
      }else{
          alert("login to comment")
          navigate("/login")
      }
     console.log(comment)
    }else{
        alert("cannot leave comment or stars black")
    }
   }
  
//open food in detail page
const open=(e)=>{
    console.log(e)
    navigate('/details', { state: e });
}

   //getting menu 
    useEffect(() => {
        db.collection("food")
        .onSnapshot((querySnapshot) => {
           
          setData(querySnapshot.docs.map((doc)=>doc.data()))
           
    })

    db.collection("comment")
    .onSnapshot((querySnapshot) => {
       
      setReview(querySnapshot.docs.map((doc)=>doc.data()))
       
})
    }, [])
    
    console.log(getBasketTotal(basket))
  return (
  <div>
      <Header/>
<div class="fixed-bottom-bar">
   {/*Top black hero for food type*/}
    <div class="d-none">
    <Modal
        open={open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                                 <div class="col-md-12 px-0 border-top">
                                    <div class="p-3 border-bottom gold-members">
                                    <span class="float-right"><button onClick={()=>{addSides("(extras) bread","5")}} class="btn-success btn-outline-secondary btn-sm" style={{"color":"yellow"}} data-toggle="modal" data-target="#extras">ADD</button></span>
                                    <div class="media">
                                        <div class="mr-3" style={{"border-radius":"20px"}}>
                                            <img src="https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" width="120" height="80" />
                                        </div>
                                        <div class="media-body">
                                            <h6 class="mb-1" id="link" >(extras) With Bread </h6>
                                            <p class="text-muted mb-2">€5</p>
                                            <p class="text-muted mb-0">bread on side</p>
                                            
                                        </div>
                                    </div>
                                </div>
                               
                        </div>

                        <div class="col-md-12 px-0 border-top">
                                    <div class="p-3 border-bottom gold-members">
                                    <span class="float-right"><button onClick={()=>{addSides("(extras) sauce","5")}} class="btn-success btn-outline-secondary btn-sm" style={{"color":"white"}} data-toggle="modal" data-target="#extras">ADD</button></span>
                                    <div class="media">
                                        <div class="mr-3" style={{"border-radius":"20px"}}>
                                            <img src="https://images.pexels.com/photos/1435901/pexels-photo-1435901.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" width="120" height="80" />
                                        </div>
                                        <div class="media-body">
                                            <h6 class="mb-1" id="link">(extras) With Sauce </h6>
                                            <p class="text-muted mb-2">€5</p>
                                            <p class="text-muted mb-0">Sauce on side</p>
                                            
                                        </div>
                                    </div>
                                </div>
                               
                        </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Choose extras with your food
            <span class="float-right"><button onClick={()=>{handleClose()}} class="btn-primary btn-outline-secondary btn-sm" style={{"color":"white"}} >Close</button></span>
          </Typography>
        </Box>
      </Modal>
    </div>
    <div class="offer-section py-4">
        <div class="container position-relative">
            <img alt="" src="https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" class="restaurant-pic"/>
            <div class="pt-3 text-white">
                <h2 class="font-weight-bold">Sinurame Restraunt</h2>
                
                <div class="rating-wrap d-flex align-items-center mt-2">
               
          <ul class="rating-stars list-unstyled">
                    <li>
                        <i class="feather-star text-warning"></i>
                        <i class="feather-star text-warning"></i>
                        <i class="feather-star text-warning"></i>
                        <i class="feather-star text-warning"></i>
                        <i class="feather-star text-warning"></i>
                    </li>
                </ul>
           
                    
                    <p class="label-rating text-white ml-2 small"> (245 Reviews)</p>
                </div>
            </div>
            <div class="pb-4">
                <div class="row">
                    <div class="col-6 col-md-2">
                        <p class="text-white-50 font-weight-bold m-0 small">Delivery</p>
                        <p class="text-white m-0">Free</p>
                    </div>
                    <div class="col-6 col-md-2">
                        <p class="text-white-50 font-weight-bold m-0 small">Open time</p>
                        <p class="text-white m-0">8:00 AM</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container ">
        <div class="p-3 btn-success mt-n3 rounded position-relative">
            <div class="d-flex align-items-center">
                <div class="feather_icon">
                    <a href="#ratings-and-reviews" class="text-decoration-none text-dark"><i class="p-2 bg-light rounded-circle font-weight-bold  feather-upload"></i></a>
                    <a href="#ratings-and-reviews" class="text-decoration-none text-dark mx-2"><i class="p-2 bg-light rounded-circle font-weight-bold  feather-star"></i></a>
                    <a href="#ratings-and-reviews" class="text-decoration-none text-dark"><i class="p-2 bg-light rounded-circle font-weight-bold feather-map-pin"></i></a>
                </div>
                <a href="contact-us.html" class="btn btn-sm btn-outline-light ml-auto">Contact</a>
            </div>
        </div>
    </div>
   



    {/*<!-- Menu for the food type -->*/}
    <div class="container position-relative">
        <div class="row">
            <div class="col-md-8 pt-3">
                <div class="shadow-sm rounded bg-white mb-3 overflow-hidden">
                  
                    <div class="row m-0">
                        <h6 class="p-3 m-0 font-weight-bold w-100">Menu <small class="text-black-50">{data.length} ITEMS</small></h6>
                        <div class="col-md-12 px-0 border-top">
                            {/*Map in the spaces*/}
                            {
                                data.map((e)=>(
                                    <div class="p-3 border-bottom gold-members">
                                    <span class="float-right"><button onClick={()=>{addToBasket(e)}} class="btn-success btn-outline-secondary btn-sm" style={{"color":"white"}} data-toggle="modal" data-target="#extras">ADD</button></span>
                                    <div class="media">
                                        <div class="mr-3" style={{"border-radius":"20px"}}>
                                            <img src={e.image} alt="" width="120" height="80" />
                                        </div>
                                        <div class="media-body">
                                            <h6 class="mb-1" id="link" >{e.name} </h6>
                                            <p class="text-muted mb-2">€{e.price}</p>
                                            <p class="text-muted mb-0">{e.desc}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    
                   
                    <div class="bg-white p-3 mb-3 restaurant-detailed-ratings-and-reviews shadow-sm rounded">
                        <a class="text-primary float-right" href="index.html">Top Rated</a>
                        <h6 class="mb-1">All Ratings and Reviews</h6>

                        {
                            review?.map((e)=>(
                                <div class="reviews-members py-3">
                                <div class="media">
                                   <img alt="#" src={e.image} width="80" height="80" class="mr-3 rounded-pill"/>
                                    <div class="media-body">
                                        <div class="reviews-members-header">
                                            <div class="star-rating float-right">
                                            {(() => {
        switch (e.stars) {
          case 1:   return (<>
          <ul class="rating-stars list-unstyled">
                    <li>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star"></i>
                        <i class="feather-star"></i>
                        <i class="feather-star"></i>
                        <i class="feather-star"></i>
                    </li>
                </ul>
          
          </>);
          case 2: return (<>
          <ul class="rating-stars list-unstyled">
                    <li>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star"></i>
                        <i class="feather-star"></i>
                        <i class="feather-star"></i>
                    </li>
                </ul>
          
            </>);
          case 3:  return (<>
          <ul class="rating-stars list-unstyled">
                    <li>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star"></i>
                        <i class="feather-star"></i>
                    </li>
                </ul>
          
            </>);
            case 4:  return (<>
                <ul class="rating-stars list-unstyled">
                          <li>
                              <i class="feather-star star_active"></i>
                              <i class="feather-star star_active"></i>
                              <i class="feather-star star_active"></i>
                              <i class="feather-star star_active"></i>
                              <i class="feather-star"></i>
                          </li>
                      </ul>
                
                  </>);
          default:      return (<>
          
          <ul class="rating-stars list-unstyled">
                    <li>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star star_active"></i>
                        <i class="feather-star star_active"></i>
                    </li>
                </ul>
            </>);
        }
      })()}
       
                                            </div>
                                            <h6 class="mb-0">{e.name}</h6>
                                            <p class="text-muted small"></p>
                                        </div>
                                        <div class="reviews-members-body">
                                            <p>{e.comment}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            ))
                        }

                     


                       
                       
                    </div>
                    <div class="bg-white p-3 rating-review-select-page rounded shadow-sm">
                        <h6 class="mb-3">Leave Comment</h6>
                        <div class="d-flex align-items-center mb-3">
                            <p class="m-0 small">Rate the Place</p>
                            <div class="star-rating ml-auto">
                                <input placeholder="number between 1-5" type="number" value={stars} onChange={(e)=>{setStars(e.target.value)}} />
                            </div>
                        </div>
                        <div >
                            <div class="form-group"><label class="form-label small">Your Comment</label><textarea class="form-control" value={comment} onChange={(e)=>{setComment(e.target.value)}}></textarea></div>
                            <div class="form-group mb-0"><button onClick={submit} type="button" class="btn btn-primary btn-block"> Submit Comment </button></div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Right checkout pannel that hides in mobile*/}
            <div class="col-md-4 pt-3">
                <div class="osahan-cart-item rounded rounded shadow-sm overflow-hidden bg-white sticky_sidebar">
                    <div class="d-flex border-bottom osahan-cart-item-profile bg-white p-3">
                        <img alt="osahan" src="https://i.ibb.co/YLhZNL8/IMG-20220124-WA0037.jpg" width="40" height="20" class="mr-3 rounded-circle img-fluid"/>
                        <div class="d-flex flex-column">
                            <h6 class="mb-1 font-weight-bold">Siruname Restaurant</h6>
                            <p class="mb-0 small text-muted"><i class="feather-map-pin"></i> 2036 2ND AVE, Siruname, NY 10029</p>
                        </div>
                    </div>
                    {
                        basket?(<>
                             {
                                 basket.map((e)=>(
                                    <div class="bg-white border-bottom py-2">
                                    <div class="gold-members d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
                                        <div class="media align-items-center">
                                            <div class="mr-2 text-danger">&middot;</div>
                                            <div class="media-body">
                                                <p class="m-0">{e.name}</p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span class="count-number float-right"><button onClick={()=>{removeFromBasket(e.id)}} type="button" class="btn-sm left dec btn btn-outline-secondary"> <i class="feather-minus"></i> </button></span>
                                            <p class="text-gray mb-0 float-right ml-2 text-muted small">${e.price}</p>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                </div>
                                 ))
                             }
                        </>):(<>
                            <div class="bg-white border-bottom py-2">
                        <div class="gold-members d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
                            <div class="media align-items-center">
                                <div class="mr-2 text-danger">&middot;</div>
                                <div class="media-body">
                                    <p class="m-0">Cart is currently Empty</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <span class="count-number float-right"><button type="button" class="btn-sm left dec btn btn-outline-secondary"> <i class="feather-minus"></i> </button><input class="count-number-input" type="text" /><button type="button" class="btn-sm right inc btn btn-outline-secondary"> <i class="feather-plus"></i> </button></span>
                                <p class="text-gray mb-0 float-right ml-2 text-muted small">$0</p>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                        </>)
                    }
                    
                    <div class="bg-white p-3 py-3 border-bottom clearfix">
                        <div class="input-group-sm mb-2 input-group">
                            <input placeholder="Enter promo code" type="text" class="form-control"/>
                            <div class="input-group-append"><button type="button" class="btn btn-success"><i class="feather-percent"></i> APPLY</button></div>
                        </div>
                       
                    </div>
                    <div class="bg-white p-3 clearfix border-bottom">
                        <p class="mb-1">Item Total ({basket.length})<span class="float-right text-dark"><CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></span></p>
                       
                        
                        <hr/>
                        <h6 class="font-weight-bold mb-0">TO PAY <span class="float-right">
                            
                         ${getBasketTotal(basket)}
                            </span></h6>
                    </div>
                    <div class="p-3">
                        <button class="btn btn-success btn-block btn-lg" onClick={()=>{navigate("/checkout")}}><CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>Proceed To Checkout {value} <i class="feather-arrow-right"></i></div>} /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

   
   <Footer/>
</div>

  );
}

export default SingleFood;
