import React, { useEffect,useState } from "react";
import {db,auth} from '../firebase'
import firebase from "firebase";
import { useStateValue } from '../StateProvider';
import { getBasketTotal } from '../reducer'
import CurrencyFormat from 'react-currency-format';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import queryString from 'query-string';
import { useCookies } from 'react-cookie';
import {BallTriangle} from  'react-loader-spinner'


import IdealBankSection from "../components/IdealBankElement";
import {useStripe, useElements, IdealBankElement} from '@stripe/react-stripe-js';


function Checkout() {
    const[data,setData]=useState([])
    //const[user,setUser]=useState([])
    const[name,setName]=useState("")
    const[load,setLoad]=useState(false)
    const[secret,setSecret]=useState("")
    const[email,setEmail]=useState("")
    //const[id,setId]=useState("")
    const[phone,setPhone]=useState("")
    const[address,setAddress]=useState("")
    //const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['id']);

   
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
             
            if(getBasketTotal(basket)===0){
            console.log("basket empty")
       }else{
           //getting secret from server
           await axios.post(`https://serverorder.herokuapp.com/intent/${getBasketTotal(basket)}`).then(response=>{
            console.log(response.data.client_secret)
            setSecret(response.data.client_secret)
          }).catch(error=>{
              console.log(error)
              alert("error with your payment method")
          })
       }
    }
       checkPayment()
    },[cookies.id])

   
    //stripe magic here
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async () => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      //event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      await placeOrder()
      const idealBank = elements.getElement(IdealBankElement);
  
      // For brevity, this example is using uncontrolled components for
      // the accountholder's name. In a real world app you will
      // probably want to use controlled components.
      // https://reactjs.org/docs/uncontrolled-components.html
      // https://reactjs.org/docs/forms.html#controlled-components
      if(name){
       
      
      const {error} = await stripe.confirmIdealPayment(secret, {
        payment_method: {
          ideal: idealBank,
          billing_details: {
            name: name,
          },
        },
        return_url: 'https://ecstatic-noyce-87c54a.netlify.app/',
      });
  
      if (error) {
        // Show error to your customer.
        console.log(error.message);
        alert("Problems with your bank account")
      }
    }else{
        const {error} = await stripe.confirmIdealPayment(secret, {
            payment_method: {
              ideal: idealBank,
              billing_details: {
                name: data[0].name,
              },
            },
            return_url: 'https://ecstatic-noyce-87c54a.netlify.app/',
          });
      
          if (error) {
            // Show error to your customer.
            console.log(error.message);
            alert("Problems with your bank account")
          }
    }
      // Otherwise the customer will be redirected away from your
      // page to complete the payment with their bank.
    };
  
//getting user data to auto fill form
    useEffect(() => {
        // will only run once when the app component loads...
    
        auth.onAuthStateChanged((authUser) => {
          console.log("THE USER IS >>> ", authUser);
          //setUser(authUser)
          if(authUser){
            db.collection("users").where("email", "==", authUser.email)
            .onSnapshot((querySnapshot) => {
               
              setData(querySnapshot.docs.map((doc)=>doc.data()))
               
        })
         
        }else{
            console.log("user not logged in")
            
        }
        });
      }, []);


    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = (id) => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        });

    };

console.log(basket)

//placing order
const placeOrder =()=>{
    setLoad(true)
    if(data[0]){
    db.collection('order').add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        name:data[0].name,
        email:data[0].email,
        phone:data[0].phone,
        address:data[0].phone,
        total:getBasketTotal(basket),
        basket:basket,
        paymentType:"cash on delivery",
        kitchen:false,
        driving:false,
        delivered:false,
        paid:false,
    }).then(res=>{
        //setting order id as cookie so we can track it after paying
        setCookie('id', res.id, { path: '/' });
        setLoad(false)
        alert("order placed now pay")
    })
   
}else{
    db.collection('order').add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        name:name,
        email:email,
        phone:phone,
        address:address,
        total:getBasketTotal(basket),
        basket:basket,
        paymentType:"cash on delivery",
        kitchen:false,
        driving:false,
        delivered:false,
        paid:false,
    }).then(res=>{
         //setting order id as cookie so we can track it after paying
        setCookie('id', res.id, { path: '/' });
        setLoad(false)
        alert("order placed now pay")
    })
    
}
}
console.log(cookies.id)

  return (<div>
      <Header/>
   
<div class="fixed-bottom-bar">
    
    <div class="osahan-checkout">
        <div class="d-none">
            <div class="bg-primary border-bottom p-3 d-flex align-items-center">
                <a class="toggle togglew toggle-2" href="index.html"><span></span></a>
                <h4 class="font-weight-bold m-0 text-white">Checkout</h4>
            </div>
        </div>

       { /*<!-- checkout -->*/}
        <div class="container position-relative">
            <div class="py-5 row">
                <div class="col-md-8 mb-3">
                    <div>
                        <div class="osahan-cart-item mb-3 rounded shadow-sm bg-white overflow-hidden">
                            <div class="osahan-cart-item-profile bg-white p-3">
                                <div class="d-flex flex-column">
                                    <h6 class="mb-3 font-weight-bold">Delivery Address</h6>
                                    <div class="row">
                                        <div class="custom-control col-lg-12 custom-radio mb-3 position-relative border-custom-radio">
                                            <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input"/>
                                            <label class="custom-control-label w-100" for="customRadioInline1">
                                       <div>
                                          <div class="p-3 bg-white rounded shadow-sm w-100">
                                             <div class="d-flex align-items-center mb-2">
                                                <h6 class="mb-0">Home</h6>
                                                <p class="mb-0 badge badge-success ml-auto"><i class="icofont-check-circled"></i> Default</p>
                                             </div>
                                             {
                                                 data[0]?(<>
                                                  <p class="small text-muted m-0">{data[0].address}</p>
                                             
                                                 </>):(<>
                                                    <p class="small text-muted m-0">failed to get your address</p>
                                             
                                                 </>)
                                             }
                                            
                                          </div>
                                         
                                       </div>
                                    </label>
                                        </div>
                                        
                                    </div>
                                    <a class="btn btn-primary" href="index.html" data-toggle="modal" data-target="#exampleModal"> ADD NEW ADDRESS </a>
                                </div>
                            </div>
                        </div>
                        <div class="accordion mb-3 rounded shadow-sm bg-white overflow-hidden" id="accordionExample">
                            <div class="osahan-card bg-white border-bottom overflow-hidden">
                                <div class="osahan-card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="d-flex p-3 align-items-center btn btn-link w-100" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                 <i class="feather-credit-card mr-3"></i> Credit/Debit Card
                                 <i class="feather-chevron-down ml-auto"></i>
                                 </button>
                                    </h2>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="osahan-card-body border-top p-3">
                                        <h6 class="m-0">Add new card</h6>
                                        <p class="small">WE ACCEPT <span class="osahan-card ml-2 font-weight-bold">( Master Card / Visa Card / Rupay )</span></p>
                                        <div>
                                            <div class="form-row">

                                            {
                                                data[0]?(<>
                                                
                                                
                                                </>):(<>
                                                    <div class="col-md-12 form-group">
                                                    <label class="form-label font-weight-bold small">Name</label>
                                                    <div class="input-group">
                                                    <input placeholder="Name" type="text" class="form-control" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                                        
                                                    </div>
                                                </div>

                                                <div class="col-md-12 form-group">
                                                    <label class="form-label font-weight-bold small">Email</label>
                                                    <div class="input-group">
                                                        <input placeholder="Email" type="text" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                                        
                                                    </div>
                                                </div>

                                                <div class="col-md-12 form-group">
                                                    <label class="form-label font-weight-bold small">Address</label>
                                                    <div class="input-group">
                                                    <input placeholder="Address" type="text" class="form-control" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                                                        
                                                    </div>
                                                </div>

                                                <div class="col-md-12 form-group">
                                                    <label class="form-label font-weight-bold small">Phone</label>
                                                    <div class="input-group">
                                                    <input placeholder="Contact nUMBER" type="number" class="form-control" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                                                        
                                                    </div>
                                                </div>
                                                
                                                </>)
                                            }
                                           


                                                <div class="col-md-12 form-group">
                                                <div className="form-row">
                                                    <IdealBankSection />
                                               </div>
     
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="osahan-card bg-white overflow-hidden">
                                <div class="osahan-card-header" id="headingThree">
                                    <h2 class="mb-0">
                                        <button class="d-flex p-3 align-items-center btn btn-link w-100" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                 <i class="feather-dollar-sign mr-3"></i> Cash on Delivery
                                 <i class="feather-chevron-down ml-auto"></i>
                                 </button>
                                    </h2>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div class="card-body border-top">
                                        <h6 class="mb-3 mt-0 mb-3 font-weight-bold">Cash</h6>
                                        <p class="m-0">Please keep exact change handy to help us serve you better</p>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
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
                                <div class="input-group-append"><button type="button" class="btn btn-primary"><i class="feather-percent"></i> APPLY</button></div>
                            </div>
                            
                        </div>
                        <div class="bg-white p-3 clearfix border-bottom">
                        <p class="mb-1">Item Total <span class="float-right text-dark"><CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} /></span></p>
                           
                        
                            <hr/>
                        <h6 class="font-weight-bold mb-0">TO PAY <span class="float-right">
                        <CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                            </span></h6>
                        </div>
                        <div class="p-3">
                        <button class="btn btn-success btn-block btn-lg" disabled={!stripe} onClick={()=>{handleSubmit("douglas")}}><CurrencyFormat value={getBasketTotal(basket)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>Pay {value} <i class="feather-arrow-right"></i></div>} /></button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

   
   { /*<!-- modal delivery address -->*/}
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Delivery Address</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                    <form class="">
                        <div class="form-row">
                            <div class="col-md-12 form-group">
                                <label class="form-label">Delivery Area</label>
                                <div class="input-group">
                                    <input placeholder="Delivery Area" type="text" class="form-control"/>
                                    <div class="input-group-append"><button type="button" class="btn btn-outline-secondary"><i class="feather-map-pin"></i></button></div>
                                </div>
                            </div>
                            <div class="col-md-12 form-group"><label class="form-label">Complete Address</label><input placeholder="Complete Address e.g. house number, street name, landmark" type="text" class="form-control"/></div>
                            <div class="col-md-12 form-group"><label class="form-label">Delivery Instructions</label><input placeholder="Delivery Instructions e.g. Opposite Gold Souk Mall" type="text" class="form-control"/></div>
                            <div class="mb-0 col-md-12 form-group">
                                <label class="form-label">Nickname</label>
                                <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                                    <label class="btn btn-outline-secondary active">
                              <input type="radio" name="options" id="option12"/> Home
                              </label>
                                    <label class="btn btn-outline-secondary">
                              <input type="radio" name="options" id="option22"/> Work
                              </label>
                                    <label class="btn btn-outline-secondary">
                              <input type="radio" name="options" id="option32"/> Other
                              </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer p-0 border-0">
                    <div class="col-6 m-0 p-0">
                        <button type="button" class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
                    </div>
                    <div class="col-6 m-0 p-0">
                        <button type="button" class="btn btn-primary btn-lg btn-block">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
</div>

<Footer/>
  </div>);
}

export default Checkout;
