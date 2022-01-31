import React, { useEffect,useState } from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeCard from "../components/HomeCard"
import {db} from '../firebase'
import "../index.css"

function Home() {
  const[data,setData]=useState([])

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

  useEffect(() => {
    db.collection("food").onSnapshot(snapshot=>{
        setData(snapshot.docs.map(doc=>doc.data()))
      })
}, [])

console.log(data)
  return (<div>
      <Header/>
      <div class=" mb-4"  >
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner" >
    <div class="carousel-item active">
      <img class="d-block w-100" id="slider1"   src="https://thumbs.dreamstime.com/b/flat-lay-traditional-japanese-ramen-bowls-chicken-meat-shiitake-mushrooms-bamboo-chopsticks-over-dark-red-damaged-184221397.jpg" alt="First slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" id="slider1"  src="https://thumbs.dreamstime.com/b/italian-pizza-fresh-salad-red-wine-wide-composition-party-dinner-flat-lay-various-kinds-glasses-over-rustic-wooden-table-174281796.jpg" alt="Second slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" id="slider1" src="https://thumbs.dreamstime.com/b/helathy-asian-cuisine-flat-lay-vegan-spring-summer-rice-paper-rolls-vegetables-sauce-chopsticks-over-concrete-background-111578744.jpg" alt="Third slide/"/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>
<div class="pt-4 pb-2 pl-2 title d-flex align-items-center">
                <h5 class="m-0">Available Options</h5>
               
            </div>
<div class='card'>
  {
    data.map((e)=>(
<div className='innerCard'>
  <HomeCard data={e}/>
  </div>
    ))
  }
  
</div>



      <Footer/>
  </div>);
}

export default Home;
