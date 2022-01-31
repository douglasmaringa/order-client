import React, { useEffect,useState } from "react";
import {db} from '../firebase'
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminMenu() {
    const navigate = useNavigate();
    const[data,setData]=useState([])

  useEffect(() => {
    db.collection("food").onSnapshot(snapshot=>{
        setData(snapshot.docs.map(doc=>doc.data()))
      })
}, [])

const open=(e)=>{
    navigate('/adminmenuadd', { state: e });
}
  return (
  <div>
      <Header/>
  <div class="tab-content col-md-9 mt-4" style={{"margin":"auto"}}>

    {
        data.map((e)=>(
            <div class="order-body">
            <div class="pb-3">
            <div class="p-3 rounded shadow-sm bg-white">
                                            <div class="d-flex border-bottom pb-3">
                                                <div class="text-muted mr-3">
                                                <img alt="#" class="img-fluid" id="link" onClick={()=>{navigate("/")}} src="https://i.ibb.co/YLhZNL8/IMG-20220124-WA0037.jpg" width="70" height="20"/>
                                                </div>
                                                <div>
                                                    <p class="mb-0 font-weight-bold"><button  class="text-dark">{e.name}</button></p>
                                                    <p class="mb-0">Siruname Restraunt</p>
                                                    <p>Food Id: {e.foodId}</p>
                                                    <p class="mb-0 small"></p>
                                                </div>
                                                <div class="ml-auto">
                                                    <p class="bg-danger text-white py-1 px-2 rounded small mb-1"></p>
                                                    <p class="small font-weight-bold text-center"> </p>
                                                </div>
                                            </div>
                                            <div class="d-flex pt-3">
                                                <div class="small">
                                                    <p class="text- font-weight-bold mb-0">{e.name}</p>
                            
                                                </div>
                                                <div class="text-muted m-0 ml-auto mr-3 font-weight-bold small">View or Create Menu For {e.name}<br/>
                                                    <span class="text-dark font-weight-bold"></span>
                                                </div>
                                                <div class="text-right">
                                                    <button onClick={()=>{open(e)}} class="btn btn-outline-primary px-3">View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        </div>
               
        ))
    }
    </div>
    <Footer/>
  </div>);
}

export default AdminMenu;
