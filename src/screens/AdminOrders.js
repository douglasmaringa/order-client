import React, { useEffect,useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {db} from '../firebase'
import axios from "axios";

function AdminOrders() {
    const[data,setData]=useState([])
    const[first,setFirst]=useState([])
    const[second,setSecond]=useState([])
    const[third,setThird]=useState([])
    const[fourth,setFourth]=useState([])

    useEffect(() => {
        // will only run once when the app component loads...
        db.collection("order").where("delivered", "==", false).orderBy('timestamp', 'desc').onSnapshot(querySnapshot=>{
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           
            })
      }, []);

      const link1 = ()=>{
       
        db.collection("order").where("delivered", "==", false).orderBy('timestamp', 'desc').onSnapshot(querySnapshot=>{
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           
            })
          setFirst(true)
          setSecond(false)
          setThird(false)
          setFourth(false)
        
      }


      const link2 = ()=>{
       
        db.collection("order").where("delivered", "==", true).orderBy('timestamp', 'desc').onSnapshot(querySnapshot=>{
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           
            })
            setFirst(false)
            setSecond(true)
            setThird(false)
            setFourth(false)
      
        
      }

      const link3 = ()=>{
       
        db.collection("order").where("kitchen", "==", true).orderBy('timestamp', 'desc').onSnapshot(querySnapshot=>{
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           
            })
            setFirst(false)
            setSecond(false)
            setThird(true)
            setFourth(false)
      
        
      }

      const link4 = ()=>{
       
         db.collection("order").where("driving", "==", true).orderBy('timestamp', 'desc').onSnapshot(querySnapshot=>{
             setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
            
             })
             setFirst(false)
             setSecond(false)
             setThird(false)
             setFourth(true)
       
         
       }
      const update =(id,email)=>{
       const choice = 1;
        db.collection('order').doc(id).update({
         kitchen:true,
         })
       
         alert("in the kitchen")
         sendEmail(email,choice)
      }
      const update2 =(id,email)=>{
        const choice = 2;
        db.collection('order').doc(id).update({
         kitchen:false,
         driving:true,
         })
       
         alert("Driving order")
         sendEmail(email,choice)
      }

      const update3 =(id,email)=>{
        const choice = 3;
        db.collection('order').doc(id).update({
            driving:false,
            delivered:true
         })
       
         alert("Delivered")
         sendEmail(email,choice)
      }

const sendEmail =async(email,choice)=>{
    try{
        const res = await axios.post(`https://serverorder.herokuapp.com/${email}/${choice}`)
        //alert("successfully registered now login")
        console.log(res.data)
        }catch(err){
         console.log(err)
         //setError("User Already Registered")
        }
}

      console.log(data)
  return (<div>
      <Header/>
  <div class="fixed-bottom-bar">

<div class="d-none">
    <div class="bg-primary border-bottom p-3 d-flex align-items-center">
        <a class="toggle togglew toggle-2" href="index.html"><span></span></a>
        <h4 class="font-weight-bold m-0 text-white">My Order</h4>
    </div>
</div>
<section class="py-4 osahan-main-body">
    <div class="container">
        <div class="row">
            <div class="col-md-3 mb-3">
                <ul class="nav nav-tabsa custom-tabsa border-0 flex-column bg-white rounded overflow-hidden shadow-sm p-2 c-t-order" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        {
                            first?(<>
                            <a class="nav-link border-0 text-dark py-3 active" id="link" onClick={link1}>
                            <i class="feather-clock mr-2 text-warning mb-0"></i> Pending Orders</a>
                            </>):(<>
                                <a class="nav-link border-0 text-dark py-3" id="link" onClick={link1}>
                            <i class="feather-clock mr-2 text-warning mb-0"></i> Pending Orders</a>
                            </>)
                        }
                        
                    </li>

                    <li class="nav-item" role="presentation">
                        {
                            third?(<>
                            <a class="nav-link border-0 text-dark py-3 active" id="link" onClick={link3}>
                            <i class="feather-clock mr-2 text-warning mb-0"></i> Kitchen</a>
                            </>):(<>
                                <a class="nav-link border-0 text-dark py-3" id="link" onClick={link3}>
                            <i class="feather-clock mr-2 text-warning mb-0"></i> Kitchen</a>
                            </>)
                        }
                        
                    </li>

                    <li class="nav-item" role="presentation">
                        {
                            fourth?(<>
                            <a class="nav-link border-0 text-dark py-3 active" id="link" onClick={link4}>
                            <i class="feather-clock mr-2 text-warning mb-0"></i> On It's Way</a>
                            </>):(<>
                                <a class="nav-link border-0 text-dark py-3" id="link" onClick={link4}>
                            <i class="feather-clock mr-2 text-warning mb-0"></i> On It's Way</a>
                            </>)
                        }
                        
                    </li>

                    <li class="nav-item" role="presentation">
                        {
                            second?(<>
                            <a class="nav-link border-0 text-dark py-3 active" id="link" onClick={link2}>
                            <i class="feather-check mr-2 text-success mb-0"></i> Delivered</a>
                            </>):(<>
                                <a class="nav-link border-0 text-dark py-3" id="link" onClick={link2}>
                            <i class="feather-check mr-2 text-success mb-0"></i> Delivered</a>
                            </>)
                        }
                        
                    </li>
                    
                   
                    
                </ul>
            </div>
            <div class="tab-content col-md-9" id="myTabContent">
                <div class="tab-pane fade show active" id="completed" role="tabpanel" aria-labelledby="completed-tab">
                    <div class="order-body">

                        {
                            data.map((e)=>(
                                <div class="pb-3">
                                <div class="p-3 rounded shadow-sm bg-white">
                                    <div class="d-flex border-bottom pb-3">
                                        <div class="text-muted mr-3">
                                            <img alt="#" src="https://i.ibb.co/YLhZNL8/IMG-20220124-WA0037.jpg" width="80" height="10" class="img-fluid order_img rounded"/>
                                        </div>
                                        <div>
                                            <p class="mb-0 font-weight-bold"><a href="restaurant.html" class="text-dark">{e.name}</a></p>
                                            <p class="mb-0">{e.address}</p>
                                            <p class="mb-0">Cell:{e.phone}</p>
                                            <p>ORDER {e.id}</p>
                                           
                                        </div>
                                        <div class="ml-auto">
                                            {
                                                e.delivered?(<>
                                                <p class="bg-success text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Delivered</p>
                                                </>):(<>
                                                    <p class="bg-primary text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Order Pending</p>
                                                </>)
                                            }
                                            {
                                                    e.paid?(<>
                                                    <p class="bg-success text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Paid</p>
                                                    </>):(<>
                                                        <p class="bg-primary text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Not Yet Paid</p>
                                                    </>)
                                                }
{
                                                e.kitchen?(<>
                                                <p class="bg-primary text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Preparing</p>
                                                </>):(<>
                                                    
                                                </>)
                                            }
                                            
                                            <p class="small font-weight-bold text-center"><i class="feather-clock"></i> {e.timestamp.seconds}</p>
                                        </div>
                                    </div>
                                    <div>
                                    {
                                            e.basket?.map((m)=>(
                                                <div class="small">
                                                <p class="text- font-weight-bold ml-2 mb-0">{m.name} ${m.price}</p>
                                            </div>
                                            ))
                                        }
                                       
                                    </div>
                                    <div class="d-flex pt-3">
                                        
                                        <div class="text-muted m-0 ml-auto mr-3 small">Total Payment<br/>
                                            <span class="text-dark font-weight-bold">${e.total}</span>
                                        </div>
                                        {
                                            e.kitchen?(<>
                                             <div class="text-right">
                                            <button onClick={()=>{update2(e.id,e.email)}} class="btn btn-outline-primary px-3">Deliver</button>
                                        </div>
                                            </>):(<>
                                                 {
                                                     e.delivered?(<>
                                                     
                                                     </>):(<>
                                                        <div class="text-right">
                                            <button onClick={()=>{update(e.id,e.email)}} class="btn btn-outline-primary px-3">Prepare</button>
                                        </div>
                                                     </>)
                                                 }
                                                
                                       
                                            </>)
                                        }

{
                                            e.driving?(<>
                                             <div class="text-right">
                                            <button onClick={()=>{update3(e.id,e.email)}} class="btn btn-outline-primary px-3">Delivered</button>
                                        </div>
                                            </>):(<>
                                                <div class="text-right">
                                           
                                        </div>
                                       
                                            </>)
                                        }
                                       
                                        
                                    </div>
                                </div>
                            </div>
                            ))
                        }

                       
                        




                    </div>
                </div>

          </div>
        </div>
    </div>
</section>




</div>
<Footer/>
  </div>);
}

export default AdminOrders;
