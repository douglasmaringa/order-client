import React,{useState,useEffect} from 'react';
import firebase from "firebase"
import { db,storage } from "../firebase";
import {BallTriangle} from  'react-loader-spinner'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function  AdminType() {
 const[name,setName]=useState("")
 const[desc,setDesc]=useState("")
 const[data,setData]=useState([])
 const[offer,setOffer]=useState()
 const[price,setPrice]=useState()
 const[stars,setStars]=useState()
 const[load,setLoad]=useState(false)
    const allInputs={imgUrl:''}
    const[imageAsFile,setImageAsFile]= useState("")
  const[imageAsUrl,setImageAsUrl]= useState(allInputs)
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
          save(firebaseUrl)
        })
    })
}

useEffect(() => {
    db.collection("food").onSnapshot(querySnapshot=>{
        setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
      })
}, [])

const submit=(id)=>{
    db.collection('food').doc(id).delete()
    alert("Deleted Successfully")
   
  
 }
 

    const save = async (firebaseUrl) =>{
       // e.preventDefault() // this stops the refresh
        setLoad(true)
        
        
       
                 db.collection('food').add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    foodId: uuidv4(),
                    name:name,
                    price:price,
                    desc:desc,
                    offer:offer,
                    stars:stars,
                    image:firebaseUrl,
                })
                setLoad(false)
                alert("saved")
        
    }

    console.log(imageAsUrl)
 

  return (
  <div>
      <Header/>
      <div class="col-md-9 mt-4" style={{"margin":"auto"}}>
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
                                                    <p class="mb-0 font-weight-bold">{e.name}</p>
                                                   
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
                                                    <p class="text- font-weight-bold mb-0">${e.price}</p>
                                                    <p class="text- font-weight-bold mb-0">{e.desc}</p>
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
    <div class="fixed-bottom-bar">

    <div class="osahan-profile">
        
       
        <div class="container position-relative">
            <div class="py-5 osahan-profile row">
                
                <div class="col-md-12 mb-3">
                    <div class="rounded shadow-sm p-4 bg-white">
                        <h5 class="mb-4">Add Food Type</h5>
                        <div id="edit_profile">
                            <div>
                                <form onSubmit={handleFireBaseUpload}>
                                    <div class="form-group">
                                        <label for="exampleInputName1">Name</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputName1">Desc</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
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
                        <div class="form-group">
                                        <label for="exampleInputNumber1">Price</label>
                                        <input type="number" class="form-control" id="exampleInputNumber1" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputNumber1">Offer</label>
                                        <input type="number" class="form-control" id="exampleInputNumber1" value={offer} onChange={(e)=>{setOffer(e.target.value)}}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Stars</label>
                                        <input type="number" class="form-control" id="exampleInputEmail1" value={stars} onChange={(e)=>{setStars(e.target.value)}}/>
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
</div>
<Footer/>
  </div>);
}

export default AdminType;
