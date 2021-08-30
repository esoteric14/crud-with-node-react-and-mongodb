// import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Modal from 'react-modal';
import './App.css';



function App() {

const [user,setUser] = useState({fname:"", lname:"", title:"", email:"",status:""})
const [userlist, setUserlist]= useState([]);
const [modal, setModal] = useState(false);
const [modaldata, setModaldata] = useState([]);
const [updatedData, setUpdatedData] = useState([]);

useEffect(()=>{
  getalldata();
},[]);

const getalldata=()=>{
  Axios.get("http://localhost:3001/readAll").then((response)=>{
    setUserlist(response.data);
  });
}

const addtolist =(e)=>{
  let name = e.target.name;
  let value = e.target.value;
  setUser({...user, [name]:value})
}

const submitData = ()=>{
  Axios('http://localhost:3001/insert', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify(user),
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const deleteHandler =(id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then((respone)=>{
      console.log("done");
      getalldata();
  })
};

const modalHandler=(id)=>{
  setModal(true);
  Axios.get(`http://localhost:3001/read/${id}`).then((response)=>{
    setModaldata(response.data);
    console.log(response.data);
  });  
}

const updateData=(e)=>{
  e.preventDefault();
  let name = e.target.name;
  let value = e.target.value;
  setUpdatedData({...updatedData, [name]:value})
}

const submitUpdatedData=(id)=>{
  
  Axios(`http://localhost:3001/update/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify(updatedData),
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

  return (
    <div className="App">
      <form>
          <h1>the real stuff</h1>
            <input name="fname"  placeholder="fname" onChange={addtolist} type="text"/>
            <input name="lname" placeholder="lname" onChange={addtolist} type="text"/>
            <input name="title" placeholder="title" onChange={addtolist} type="text"/>
            <input name="email" placeholder="email" onChange={addtolist} type="text"/>
            <input name="status" placeholder="status" onChange={addtolist} type="text"/>
            <button onClick={submitData}>Add to list</button>
      </form>

      <div className="table">
      <table>

        <thead>
            <tr>
              <th>First name</th>
              <th>Last Name</th>
              <th>Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>status</th>
              <th>Delete item</th>
              <th>Edit item</th>
            </tr>
        </thead>

        <tbody>
        {userlist.map(item=>{
            return(
              <tr key={item._id}>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.fname} {item.lname}</td>
                  <td>{item.title}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                  <td><button onClick={()=>deleteHandler(item._id)}>delete</button></td>
                  <td><button onClick={()=>modalHandler(item._id)}>edit</button></td>
             </tr>
            )
          }
        )}
        </tbody>

        </table>
      </div>
      
      <div className="modal">

       <Modal isOpen={modal}>
            <h2>{modaldata.fname} {modaldata.lname}</h2>
            <form>
                <h1>update data</h1>
                <input name="fname"  placeholder={modaldata.fname} onChange={updateData} type="text"/>
                <input name="lname" placeholder= {modaldata.lname} onChange={updateData} type="text"/>
                <input name="title" placeholder= {modaldata.title} onChange={updateData} type="text"/>
                <input name="email" placeholder= {modaldata.email} onChange={updateData} type="text"/>
                <input name="status" placeholder= {modaldata.status} onChange={updateData} type="text"/>
                <button onClick={()=>submitUpdatedData(modaldata._id)}>update</button>
            </form>
            <button onClick={()=> setModal(false)}>close</button>
        </Modal>

      </div>
      
    </div>
  );
}

export default App;
