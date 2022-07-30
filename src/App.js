import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const Sample= () => {

  const [imageURL, setImageURL] = useState("")

  const onImageChange = (event) => {
   if (event.target.files && event.target.files[0]) {
    setAddFormData({...addFormData,img:`${URL.createObjectURL(event.target.files[0])}`})
    setImageURL(URL.createObjectURL(event.target.files[0]));
   }
  }
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({ // initialsize the form!
    fullName: "",
    enrolMent: "",
    class: "",
   gender: "",
   img: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    enrolMent: "",
    class: "",
    gender: "",
    img: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => { //to pass the updated students calling 
    event.preventDefault();

    const fieldName = event.target.getAttribute("name"); //key
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData }; //copying exiting data
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData); //adding new row 
  };

  const handleEditFormChange = (event) => { //updating form dynamically
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      enrolMent: addFormData.enrolMent,
      class: addFormData.class,
      gender: addFormData.gender,
      img: addFormData.img,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => { 
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      enrolMent: editFormData.enrolMent,
      class: editFormData.class,
      gender: editFormData.gender,
      img:editFormData.img,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      enrolMent: contact.address,
      class: contact.phoneNumber,
     gender: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };
 // name add phn email action
 // name enrol clss gender photo
  return (
   
    <div className="app-container">
    <div>
      <h1 >STUDENT DETAILS</h1>
    </div>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>                         
              <th>Name</th>
              <th>Enrollement No.</th>  
              <th>Class</th>
              <th>Gender</th>
              <th>Student photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => ( // for fragment using more children
              <Fragment>                         
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h1 >Add new student details</h1>
      
    <div>
    <form className ="form2" onSubmit={handleAddFormSubmit}>
        <input
        className=""
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="enrolMent"
          required="required"
          placeholder="Enteryour enrollment no...."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="class"
          required="required"
          placeholder="Enter yr class..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="gender"
          required="required"
          placeholder="Enter your gender..."
          onChange={handleAddFormChange}
        />
        
        <input type="file" onChange={onImageChange} className="filetype" />
           <img src={`${imageURL}`} className="img_preview" alt="upload your image and check preview"  />
   
        <button id="btn" style={ { border: '1px solid ', cursor: "pointer" ,width: "250px",background: 'black', color: 'white' }}
        type="submit">ADD</button>
      </form>
    </div>
    </div>
    
   
  );
};

export default Sample;