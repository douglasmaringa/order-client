import React, { useEffect,useState } from "react";
import {db} from '../firebase'
import firebase from "firebase";
import { useLocation,useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

function AdminMenuAdd() {
    const {state} = useLocation();
    const[data,setData]=useState([])
    const[name,setName]=useState("")
    const[price,setPrice]=useState()
    const navigate = useNavigate();
    console.log(state)

    useEffect(() => {
        if(state?.foodId){
        db.collection("menu").where("foodId", "==", state.foodId)
        .onSnapshot((querySnapshot) => {
           
            setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
           
    })
}
},[state.foodId])

const save = async (e) =>{
                e.preventDefault()
              db.collection('menu').add({
                 timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                 foodId: state.foodId,
                 name:name,
                 price:price,
             })
             
             alert("added")
     
 }
 const submit=(id)=>{
    db.collection('menu').doc(id).delete()
    alert("Deleted Successfully")
   
  
 }

  return (<div>
<Header/>
<div class="col-md-9 mt-4" style={{"margin":"auto"}}>
<div class="pt-4 pb-2 pl-2 title d-flex align-items-center">
                <h5 class="m-0">Menu Options</h5>
               
            </div>
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
                                                    <p class="mb-0 font-weight-bold" >${e.price}</p>
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
                                                <div class="text-muted m-0 ml-auto mr-3 font-weight-bold small">Delete {e.name}<br/>
                                                    <span class="text-dark font-weight-bold"></span>
                                                </div>
                                                <div class="text-right">
                                                    <button onClick={()=>{submit(e.id)}} class="btn btn-outline-primary px-3">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        </div>
               
        ))
    }
</div>

<div class="fixed-bottom-bar">

    <div class="osahan-profile">
        
       
        <div class="container position-relative">
            <div class="py-5 osahan-profile row">
                
                <div class="col-md-12 mb-3">
                    <div class="rounded shadow-sm p-4 bg-white">
                        <h5 class="mb-4">Add Item To Menu</h5>
                        <div id="edit_profile">
                            <div>
                                <form onSubmit={save}>
                                    <div class="form-group">
                                        <label for="exampleInputName1">Name</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="exampleInputNumber1">Price</label>
                                        <input type="number" style={{"width":"100%"}}   value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                                    </div>
                                    
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary btn-block">Save</button>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>


    
    
    
  
</div>
<Footer/>
  </div>);
}

export default AdminMenuAdd;
