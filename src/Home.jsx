import React, { useReducer, useState } from 'react'
import AddForm from './components/AddForm'
import Listing from './components/Listing'
import { nanoid } from 'nanoid'
import Context from './components/Context'
import swal from '@sweetalert/with-react';
import EditForm from './components/EditForm'


const initstate = {
  allRecords : [],
  singleRecord : {
    id : '',
    title: '',
    votes: '',
    date: '',
  }
}

function reducer(state,action){
  switch(action.type){
    case "addRecord": 
      return {
          allRecords : [...state.allRecords],
          singleRecord: {
            ...state.singleRecord,
            [action.payload.name] : action.payload.value,
            id: nanoid()
          }       
      }
      case "submitRecord":
        return {
          allRecords : [
            ...state.allRecords ,
            state.singleRecord
          ],
          singleRecord: {
            ...state.singleRecord,
            id: nanoid()
          },     
        }
       case "deleteRecord":
            return {
              allRecords : state.allRecords.filter(record=> (record.id !== action.payload)),
              singleRecord: {
                ...state.singleRecord,
                id: nanoid()
              },     
            }
            
        case "updateRecord":
          return {
            allRecords : [
              state.allRecords ,
              state.singleRecord,
            ],
            singleRecord: {
              ...state.singleRecord,
              id: action.payload
            },     
          }
      default:
        return state
    }
} 

function Home() {
  const [state, dispatch] = useReducer(reducer, initstate)
  function handleChange(e){
    dispatch({
        type: "addRecord",
        payload: e.target,
      }
    )
  }
  
function submitRecord(e){
  e.preventDefault();
  dispatch(
    {
      type : "submitRecord"
    }
  )
}

function updateRecord(e,id){
    e.preventDefault()
    setIsEdit(false)
    dispatch(
      {
        type : "updateRecord",
        payload : id
      }
    )
}

const [editData, setEditData] = useState([])
const [isEdit, setIsEdit] = useState(false)

function handleEdit(e,recordId){  
  state.allRecords.map((records) => {
    if(records.id === recordId){
      setEditData(records)
      setIsEdit(true)
    }
    return true
  })
  dispatch(
    {
      type : "editRecord",
      payload : recordId
    }
  )
}

function handleDelete(e,recordId){
  e.preventDefault()
  swal({
    title: "Are you sure?",
    text: "You want to delete the record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) { 
      dispatch(
        {
          type: "deleteRecord",
          payload: recordId
      })
      swal("Record deleted successfully!", {
        icon: "success",
      });

    }
  });
}

console.log(state)
  return (
    <>  
        {!isEdit ?
        <AddForm
          handleChange = {handleChange}
          submitRecord={submitRecord}
        />:
         <EditForm 
         data={editData}
         handleChange = {handleChange}
         updateRecord={updateRecord}
         /> 
        }
        <Context.Provider value={state.allRecords}>
            <Listing handleDelete={handleDelete}
            handleEdit={handleEdit}
            />
        </Context.Provider>
    </>
  )
}

export default Home