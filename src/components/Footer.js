import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import {auth,db} from '../firebase'
import { useStateValue } from '../StateProvider';

function Footer() {
    const[user,setUser]=useState([])
    //const[data,setData]=useState([])
    //const[admin,setAdmin]=useState(false)
    const [{ basket }, dispatch] = useStateValue();

    const navigate = useNavigate();

    useEffect(() => {
        // will only run once when the app component loads...
    
        auth.onAuthStateChanged((authUser) => {
          console.log("THE USER IS >>> ", authUser);
          setUser(authUser)
          if(authUser){
            db.collection("users").where("email", "==", authUser.email)
            .onSnapshot((querySnapshot) => {
               
              //setData(querySnapshot.docs.map((doc)=>doc.data()))
               
        })
          if(authUser.email === "admin@gmail.com"){
            //setAdmin(true)
            console.log("user admin")
          }else{
            //setAdmin(false)
            console.log("user not admin")
          }
        }else{
            //navigate("/login")
            console.log("user not logged in")
        }
        });
      }, []);

    const logout = () => {
        if (user) {
          auth.signOut();
          //setAdmin(false)
          navigate("/")
        }
      }
  return (<div>
{/* <!-- footer -->*/}
<div class="osahan-menu-fotter fixed-bottom bg-white px-3 py-2 text-center d-none">
        <div class="row">
            <div class="col selected">
                <a onClick={()=>{navigate("/")}} id="link" class="text-success small font-weight-bold text-decoration-none">
                    <p class="h4 m-0"><i class="text-dark feather-home"></i></p>
                    Home
                </a>
            </div>
            <div class="col">
                <a  class="small text-success font-weight-bold text-decoration-none">
                    <p class="h4 m-0"><i class="feather-map-pin"></i></p>
                    Trending
                </a>
            </div>
            <div class="col bg-white rounded-circle mt-n4 px-3 py-2">
                <div class="bg-success rounded-circle mt-n0 shadow">
                    <a onClick={()=>{navigate("/checkout")}} id="link" class="text-white small font-weight-bold text-decoration-none">
                       <i class="text-warning feather-shopping-cart">{basket.length}</i>
        
                </a>
                  
                </div>
            </div>
            <div class="col">
                <a onClick={()=>{navigate("/account")}} id="link" class="text-success small font-weight-bold text-decoration-none">
                    <p class="h4 m-0"><i class="feather-user"></i></p>
                    Profile
                </a>
            </div>
            <div class="col">
                {
                    user?(<>
                     <a onClick={logout} id="link" class="text-danger small font-weight-bold text-decoration-none">
                    <p class="h4 m-0"><i class="text-danger feather-log-out"></i></p>
                   Logout
                </a>
                    </>):(<>
                        <a onClick={()=>{navigate("/login")}} id="link" class="text-dark small font-weight-bold text-decoration-none">
                    <p class="h4 m-0"><i class="feather-log-out"></i></p>
                   Login
                </a>
                    </>)
                }
               
            </div>
            
        </div>
    </div>
   {/* <!-- footer -->*/}
    <footer class="section-footer border-top bg-dark">
        <div class="container">
            <section class="footer-top padding-y py-5">
                <div class="row">
                    <aside class="col-md-4 footer-about">
                        <article class="d-flex pb-3">
                            <div><img alt="#" src="img/logo_web.png" class="logo-footer mr-3"/></div>
                            <div>
                                <h6 class="title text-white">About Us</h6>
                                <p class="text-muted">Some short text about company like You might remember the Dell computer commercials in which a youth reports.</p>
                                <div class="d-flex align-items-center">
                                    <a class="btn btn-icon btn-outline-light mr-1 btn-sm" title="Facebook" target="_blank" href="#"><i class="feather-facebook"></i></a>
                                    <a class="btn btn-icon btn-outline-light mr-1 btn-sm" title="Instagram" target="_blank" href="#"><i class="feather-instagram"></i></a>
                                    <a class="btn btn-icon btn-outline-light mr-1 btn-sm" title="Youtube" target="_blank" href="#"><i class="feather-youtube"></i></a>
                                    <a class="btn btn-icon btn-outline-light mr-1 btn-sm" title="Twitter" target="_blank" href="#"><i class="feather-twitter"></i></a>
                                </div>
                            </div>
                        </article>
                    </aside>
                    <aside class="col-sm-3 col-md-2 text-white">
                        <h6 class="title">Error Pages</h6>
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="not-found.html" class="text-muted">Not found</a></li>
                            <li> <a href="maintence.html" class="text-muted">Maintence</a></li>
                            <li> <a href="coming-soon.html" class="text-muted">Coming Soon</a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-3 col-md-2 text-white">
                        <h6 class="title">Services</h6>
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="faq.html" class="text-muted">Delivery Support</a></li>
                            <li> <a href="contact-us.html" class="text-muted">Contact Us</a></li>
                            <li> <a href="terms.html" class="text-muted">Terms of use</a></li>
                            <li> <a href="privacy.html" class="text-muted">Privacy policy</a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-3  col-md-2 text-white">
                        <h6 class="title">For users</h6>
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="login.html" class="text-muted"> User Login </a></li>
                            <li> <a href="signup.html" class="text-muted"> User register </a></li>
                            <li> <a href="forgot_password.html" class="text-muted"> Forgot Password </a></li>
                            <li> <a href="profile.html" class="text-muted"> Account Setting </a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-3  col-md-2 text-white">
                        <h6 class="title">More Pages</h6>
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="trending.html" class="text-muted"> Trending </a></li>
                            <li> <a href="most_popular.html" class="text-muted"> Most popular </a></li>
                            <li> <a href="restaurant.html" class="text-muted"> Restaurant Details </a></li>
                            <li> <a href="favorites.html" class="text-muted"> Favorites </a></li>
                        </ul>
                    </aside>
                </div>
                
            </section>
            
            <section class="footer-center border-top padding-y py-5">
                <h6 class="title text-white">Countries</h6>
                <div class="row">
                    <aside class="col-sm-2 col-md-2 text-white">
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="#" class="text-muted">India</a></li>
                            <li> <a href="#" class="text-muted">Indonesia</a></li>
                            <li> <a href="#" class="text-muted">Ireland</a></li>
                            <li> <a href="#" class="text-muted">Italy</a></li>
                            <li> <a href="#" class="text-muted">Lebanon</a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-2 col-md-2 text-white">
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="#" class="text-muted">Malaysia</a></li>
                            <li> <a href="#" class="text-muted">New Zealand</a></li>
                            <li> <a href="#" class="text-muted">Philippines</a></li>
                            <li> <a href="#" class="text-muted">Poland</a></li>
                            <li> <a href="#" class="text-muted">Portugal</a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-2 col-md-2 text-white">
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="#" class="text-muted">Australia</a></li>
                            <li> <a href="#" class="text-muted">Brasil</a></li>
                            <li> <a href="#" class="text-muted">Canada</a></li>
                            <li> <a href="#" class="text-muted">Chile</a></li>
                            <li> <a href="#" class="text-muted">Czech Republic</a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-2 col-md-2 text-white">
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="#" class="text-muted">Turkey</a></li>
                            <li> <a href="#" class="text-muted">UAE</a></li>
                            <li> <a href="#" class="text-muted">United Kingdom</a></li>
                            <li> <a href="#" class="text-muted">United States</a></li>
                            <li> <a href="#" class="text-muted">Sri Lanka</a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-2 col-md-2 text-white">
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="#" class="text-muted">Qatar</a></li>
                            <li> <a href="#" class="text-muted">Singapore</a></li>
                            <li> <a href="#" class="text-muted">Slovakia</a></li>
                            <li> <a href="#" class="text-muted">South Africa</a></li>
                            <li> <a href="#" class="text-muted">Green Land</a></li>
                        </ul>
                    </aside>
                    <aside class="col-sm-2 col-md-2 text-white">
                        <ul class="list-unstyled hov_footer">
                            <li> <a href="#" class="text-muted">Pakistan</a></li>
                            <li> <a href="#" class="text-muted">Bangladesh</a></li>
                            <li> <a href="#" class="text-muted">Bhutaan</a></li>
                            <li> <a href="#" class="text-muted">Nepal</a></li>
                        </ul>
                    </aside>
                </div>
               
            </section>
        </div>



       {/* <!-- container -->*/}
        <section class="footer-copyright border-top py-3 bg-light">
            <div class="container d-flex align-items-center">
                <p class="mb-0"> © 2020 Company All rights reserved </p>
                <p class="text-muted mb-0 ml-auto d-flex align-items-center">
                    <a href="#" class="d-block"><img alt="#" src="img/appstore.png" height="40"/></a>
                    <a href="#" class="d-block ml-3"><img alt="#" src="img/playmarket.png" height="40"/></a>
                </p>
            </div>
        </section>
    </footer>
    <nav id="main-nav">
        <ul class="second-nav">
            <li><a href="home.html"><i class="feather-home mr-2"></i> Homepage</a></li>
            <li><a href="my_order.html"><i class="feather-list mr-2"></i> My Orders</a></li>
            <li>
                <a href="#"><i class="feather-edit-2 mr-2"></i> Authentication</a>
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
                <a href="#"><i class="feather-user mr-2"></i> Profile</a>
                <ul>
                    <li><a href="profile.html">Profile</a></li>
                    <li><a href="favorites.html">Delivery support</a></li>
                    <li><a href="contact-us.html">Contact Us</a></li>
                    <li><a href="terms.html">Terms of use</a></li>
                    <li><a href="privacy.html">Privacy & Policy</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="feather-alert-triangle mr-2"></i> Error</a>
                <ul>
                    <li><a href="not-found.html">Not Found</a></li>
                        <li><a href="maintence.html"> Maintence</a></li>
                            <li><a href="coming-soon.html">Coming Soon</a></li>
                </ul>
                </li>
                <li>
                    <a href="#"><i class="feather-link mr-2"></i> Navigation Link Example</a>
                    <ul>
                        <li>
                            <a href="#">Link Example 1</a>
                            <ul>
                                <li>
                                    <a href="#">Link Example 1.1</a>
                                    <ul>
                                        <li><a href="#">Link</a></li>
                                        <li><a href="#">Link</a></li>
                                        <li><a href="#">Link</a></li>
                                        <li><a href="#">Link</a></li>
                                        <li><a href="#">Link</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Link Example 1.2</a>
                                    <ul>
                                        <li><a href="#">Link</a></li>
                                        <li><a href="#">Link</a></li>
                                        <li><a href="#">Link</a></li>
                                        <li><a href="#">Link</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><a href="#">Link Example 2</a></li>
                        <li><a href="#">Link Example 3</a></li>
                        <li><a href="#">Link Example 4</a></li>
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
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Filter</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body p-0">
                    <div class="osahan-filter">
                        <div class="filter">
                            {/*<!-- SORT BY -->*/}
                            <div class="p-3 bg-light border-bottom">
                                <h6 class="m-0">SORT BY</h6>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-radio">
                                <input type="radio" id="customRadio1f" name="location" class="custom-control-input" checked/>
                                <label class="custom-control-label py-3 w-100 px-3" for="customRadio1f">Top Rated</label>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-radio">
                                <input type="radio" id="customRadio2f" name="location" class="custom-control-input"/>
                                <label class="custom-control-label py-3 w-100 px-3" for="customRadio2f">Nearest Me</label>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-radio">
                                <input type="radio" id="customRadio3f" name="location" class="custom-control-input"/>
                                <label class="custom-control-label py-3 w-100 px-3" for="customRadio3f">Cost High to Low</label>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-radio">
                                <input type="radio" id="customRadio4f" name="location" class="custom-control-input"/>
                                <label class="custom-control-label py-3 w-100 px-3" for="customRadio4f">Cost Low to High</label>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-radio">
                                <input type="radio" id="customRadio5f" name="location" class="custom-control-input"/>
                                <label class="custom-control-label py-3 w-100 px-3" for="customRadio5f">Most Popular</label>
                            </div>
                            {/*<!-- filter -->*/}
                            <div class="p-3 bg-light border-bottom">
                                <h6 class="m-0">FILTER</h6>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="defaultCheck1" checked/>
                                <label class="custom-control-label py-3 w-100 px-3" for="defaultCheck1">Open Now</label>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="defaultCheck2"/>
                                <label class="custom-control-label py-3 w-100 px-3" for="defaultCheck2">Credit Cards</label>
                            </div>
                            <div class="custom-control border-bottom px-0  custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="defaultCheck3"/>
                                <label class="custom-control-label py-3 w-100 px-3" for="defaultCheck3">Alcohol Served</label>
                            </div>
                            {/*<!-- filter -->*/}
                            <div class="p-3 bg-light border-bottom">
                                <h6 class="m-0">ADDITIONAL FILTERS</h6>
                            </div>
                            <div class="px-3 pt-3">
                                <input type="range" class="custom-range" min="0" max="100" name="minmax"/>
                                <div class="form-row">
                                    <div class="form-group col-6">
                                        <label>Min</label>
                                        <input class="form-control" placeholder="$0" type="number"/>
                                    </div>
                                    <div class="form-group text-right col-6">
                                        <label>Max</label>
                                        <input class="form-control" placeholder="$1,0000" type="number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-0 border-0">
                    <div class="col-6 m-0 p-0">
                        <button type="button" class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
                    </div>
                    <div class="col-6 m-0 p-0">
                        <button type="button" class="btn btn-primary btn-lg btn-block">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  

  </div>);
}

export default Footer;
