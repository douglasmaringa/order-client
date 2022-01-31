import React, { useEffect,useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {auth,db} from '../firebase'

function Account() {
    const[data,setData]=useState([])
    const[user,setUser]=useState([])
    //const[admin,setAdmin]=useState(false)

    useEffect(() => {
        // will only run once when the app component loads...
    
        auth.onAuthStateChanged((authUser) => {
          console.log("THE USER IS >>> ", authUser);
          setUser(authUser)
          if(authUser){
            db.collection("order").where("email", "==", authUser.email).where("delivered", "==", false).orderBy('timestamp', 'desc')
            .onSnapshot((querySnapshot) => {
               
                setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
               
        })
          if(authUser.email === "admin@gmail.com"){
            //setAdmin(true)
            console.log("admin")
          }else{
            //setAdmin(false)
            console.log("not admin")
          }
        }else{
            //navigate("/login")
            console.log("user not logged in")
        }
        });
      }, []);
      const link1 = ()=>{
        if(user){
            db.collection("order").where("email", "==", user.email).where("delivered", "==", false)
            .onSnapshot((querySnapshot) => {
               
                setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
               
        })
          
        }else{
            //navigate("/login")
            console.log("user not logged in")
        }
        
      }
      const link2 = ()=>{
        if(user){
            db.collection("order").where("email", "==", user.email).where("delivered", "==", true)
            .onSnapshot((querySnapshot) => {
               
                setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
               
        })
          
        }else{
            //navigate("/login")
            console.log("user not logged in")
        }
        
      }
      console.log(data)
  return (
  <div>
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
                            <a class="nav-link border-0 text-dark py-3 active" id="link" onClick={link1}>
                                <i class="feather-check mr-2 text-success mb-0"></i> Pending</a>
                        </li>
                        <li class="nav-item border-top" role="presentation" id="link">
                            <a class="nav-link border-0 text-dark py-3" id="progress-tab" onClick={link2}>
                                <i class="feather-clock mr-2 text-warning mb-0"></i> Delivered</a>
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
                                                <p class="mb-0 font-weight-bold"><a href="restaurant.html" class="text-dark">Sinurame Restaurant</a></p>
                                                <p class="mb-0">Punjab, India</p>
                                                <p>ORDER {e.id}</p>
                                               
                                            </div>
                                            <div class="ml-auto">
                                                {
                                                    e.delivered?(<>
                                                    <p class="bg-success text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Delivered</p>
                                                    </>):(<>
                                                        <p class="bg-primary text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Not Delivered</p>
                                                    </>)
                                                }
                                                {
                                                    e.paid?(<>
                                                    <p class="bg-success text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Paid</p>
                                                    </>):(<>
                                                        <p class="bg-primary text-white py-1 px-2 rounded small mb-1" style={{"text-align":"center"}}>Not Yet Paid</p>
                                                    </>)
                                                }
                                                
                                                <p class="small font-weight-bold text-center"><i class="feather-clock"></i> {Date(e.timestamp.seconds*1000)}</p>
                                            </div>
                                        </div>
                                        <div>
                                        {
                                                e.basket?.map((m)=>(
                                                    <div class="small">
                                                    <p class="text- font-weight-bold ml-2 mb-0">{m.name}</p>
                                                </div>
                                                ))
                                            }
                                           
                                        </div>
                                        <div class="d-flex pt-3">
                                            
                                            <div class="text-muted m-0 ml-auto mr-3 small">Total Payment<br/>
                                                <span class="text-dark font-weight-bold">${e.total}</span>
                                            </div>
                                            <div class="text-right">
                                                <a href="contact-us.html" class="btn btn-outline-primary px-3">Help</a>
                                            </div>
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

export default Account;
