import React, { useState } from "react";
import firebase from "firebase"
import { auth,db,storage } from "../firebase";
import { useNavigate } from 'react-router-dom';
import {BallTriangle} from  'react-loader-spinner'



function Register() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    //const[image,setImage]=useState("")
    const[phone,setPhone]=useState("")
    const[address,setAddress]=useState("")
    const[load,setLoad]=useState(false)
    const allInputs={imgUrl:''}
    const[imageAsFile,setImageAsFile]= useState("")
  const[imageAsUrl,setImageAsUrl]= useState(allInputs)
  //const[caption,setCaption]= useState("")
  const[name,setName]= useState("")
  
  const navigate = useNavigate();
  
  const handleImageAsFile=(e)=>{
      const image = e.target.files[0]
      setImageAsFile(imageFile=>(image))
  }
  
  const handleFireBaseUpload= (e)=>{
    e.preventDefault()
      setLoad(true)
      console.log('start of upload')
      if(imageAsFile===''){
          console.error("not an image")
      }
      const uploadTask =storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      uploadTask.on('state_changed',(snapShot)=>{
          console.log(snapShot)
      },(err)=>{
          console.log(err)
      },()=>{
          storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseUrl=>{
              
            setImageAsUrl(firebaseUrl)
            signup(firebaseUrl)
          })
      })
  }
  
  
  
   
  
      const signup = async (firebaseUrl) =>{
         // e.preventDefault() // this stops the refresh
          setLoad(true)
          
          // register logic
          auth
              .createUserWithEmailAndPassword(email,password)
              .then((auth )=>{
                   db.collection('users').add({
                      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                      name:name,
                      email:email,
                      phone:phone,
                      address:address,
                      image:firebaseUrl,
                  })
                  setLoad(false)
                  navigate("/")
              })
              .catch(e=> alert(e.message))
          
      }

      console.log(imageAsUrl)
  return (<div>
<div>
    <div class="osahan-signup login-page">
        <video loop autoPlay muted id="vid">
            <source src={require("../img/bg.mp4")} type="video/mp4"/>
            <source src={require("../img/bg.mp4")} type="video/ogg"/>
            Your browser does not support the video tag.
         </video>
       
        <div class="d-flex align-items-center justify-content-center flex-column vh-100">
            <div class="px-5 col-md-6 ml-auto">
                <div class="px-5 col-10 mx-auto">
                    <h2 class="text-dark my-0">Hello There.</h2>
                    <p class="text-50">Sign up to continue</p>
                    <form class="mt-5 mb-4" onSubmit={(e)=>{handleFireBaseUpload(e)}}>
                        <div class="form-group">
                            <label for="exampleInputName1" class="text-dark">Name</label>
                            <input type="text" placeholder="Enter Name" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputNumber1" class="text-dark">Email</label>
                            <input type="text" placeholder="Enter Email" class="form-control" id="exampleInputNumber1" aria-describedby="numberHelp" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1" class="text-dark">Password</label>
                            <input type="password" placeholder="Enter Password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputName1" class="text-dark">Phone Number</label>
                            <input type="number" placeholder="Enter Name" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputName1" class="text-dark">Address</label>
                            <input type="text" placeholder="Enter Name" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputName1" class="text-dark">Image</label>
                            {
                                load?(<>
                                <BallTriangle color="#00BFFF" height={40} width={40} />
                                </>):(<>
                                    
                                </>)
                            }
                            <input type="file" onChange={handleImageAsFile} placeholder="upload image" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                        </div>
                        <button class="btn btn-facebook btn-lg btn-block">
                           SIGN UP
                        </button>
                        <div class="py-2">
                            <button class="btn btn-primary btn-lg btn-block" onClick={()=>{navigate("/")}}> Cancel</button>
                        </div>
                    </form>
                </div>
                <div class="new-acc d-flex align-items-center justify-content-center">
                   
                        <p class="text-center m-0 mb-4" id="link" onClick={()=>{navigate("/login")}}>Already an account? Sign in</p>
                    
                </div>
            </div>
        </div>
    </div>
    <nav id="main-nav">
        <ul class="second-nav">
            <li><a href="home.html"><i class="feather-home mr-2"></i> Homepage</a></li>
            <li><a href="my_order.html"><i class="feather-list mr-2"></i> My Orders</a></li>
            <li>
               <i class="feather-edit-2 mr-2"></i> Authentication
                <ul>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="signup.html">Register</a></li>
                    <li><a href="forgot_password.html">Forgot Password</a></li>
                    <li><a href="verification.html">Verification</a></li>
                    <li><a href="location.html">Location</a></li>
                </ul>
            </li>
            <li><a href="favorites.html"><i class="feather-heart mr-2"></i> Favorites</a></li>
            <li><a href="trending.html"><i class="feather-trending-up mr-2"></i> Trending</a></li>
            <li><a href="most_popular.html"><i class="feather-award mr-2"></i> Most Popular</a></li>
            <li><a href="restaurant.html"><i class="feather-paperclip mr-2"></i> Restaurant Detail</a></li>
            <li><a href="checkout.html"><i class="feather-list mr-2"></i> Checkout</a></li>
            <li><a href="successful.html"><i class="feather-check-circle mr-2"></i> Successful</a></li>
            <li><a href="map.html"><i class="feather-map-pin mr-2"></i> Live Map</a></li>
            <li>
               <i class="feather-user mr-2"></i> Profile
                <ul>
                    <li><a href="profile.html">Profile</a></li>
                    <li><a href="favorites.html">Delivery support</a></li>
                    <li><a href="contact-us.html">Contact Us</a></li>
                    <li><a href="terms.html">Terms of use</a></li>
                    <li><a href="privacy.html">Privacy & Policy</a></li>
                </ul>
            </li>
            <li>
                <i class="feather-alert-triangle mr-2"></i> Error
                <ul>
                    <li><a href="not-found.html">Not Found</a></li>
                        <li><a href="maintence.html"> Maintence</a></li>
                            <li><a href="coming-soon.html">Coming Soon</a></li>
                </ul>
                </li>
                <li>
                  <i class="feather-link mr-2"></i> Navigation Link Example
                    <ul>
                        <li>
                            Link Example 1
                            <ul>
                                <li>
                                  
                                    <ul>
                                      
                                    </ul>
                                </li>
                                <li>
                                   
                                    <ul>
                                        
                                    </ul>
                                </li>
                            </ul>
                        </li>
                       
                        <li data-nav-custom-content>
                            <div class="custom-message">
                                You can add any custom content to your navigation items. This text is just an example.
                            </div>
                        </li>
                    </ul>
                </li>
        </ul>
        <ul class="bottom-nav">
            <li class="email">
                <a class="text-danger" href="home.html">
                    <p class="h5 m-0"><i class="feather-home text-danger"></i></p>
                    Home
                </a>
            </li>
            <li class="github">
                <a href="faq.html">
                    <p class="h5 m-0"><i class="feather-message-circle"></i></p>
                    FAQ
                </a>
            </li>
            <li class="ko-fi">
                <a href="contact-us.html">
                    <p class="h5 m-0"><i class="feather-phone"></i></p>
                    Help
                </a>
            </li>
        </ul>
   </nav>
</div>

  </div>);
}

export default Register;
