import React, { useReducer, useState,useEffect } from 'react'
import AddForm from './components/AddForm'
import Listing from './components/Listing'
import { nanoid } from 'nanoid'
import Context from './components/Context'
import swal from '@sweetalert/with-react';
import EditForm from './components/EditForm'


const initstate = {
  allRecords : [],
  singleRecord : { id : '', title: '', votes: '', date: '' },
  editRecord : { id : '', title: '', votes: '', date: '' } 
}

function reducer(state,action){
  switch(action.type){
    case "addRecord": 
      return {
          allRecords : [...state.allRecords],
          singleRecord: {...state.singleRecord,[action.payload.name] : action.payload.value, id: nanoid()},     
          editRecord: {...state.editRecord},
      }

      case "submitRecord":
        return {
          allRecords : [ ...state.allRecords , state.singleRecord ],
          singleRecord: {
            id : '',
            title: '',
            votes: '',
            date: '',
          },  
          editRecord: {...state.editRecord},     
        }
      
        case "submitEditedRecord":
          
          state.allRecords = state.allRecords.filter(record=> (record.id !== action.payload))
        return{
            allRecords : [state.editRecord,...state.allRecords],
            singleRecord: {...state.singleRecord},  
            editRecord: { id : '', title: '', votes: '', date: '' },    
          }
          case "deleteRecord":
          return {
              allRecords : state.allRecords.filter(record=> (record.id !== action.payload)),
              singleRecord: { ...state.singleRecord, id: nanoid() },  
              editRecord: { ...state.editRecord}   
            }
       
          case "editRecord":         
          return{
            allRecords : [...state.allRecords],
            singleRecord: {...state.singleRecord},
            editRecord: {...state.editRecord,[action.payload.name] : action.payload.value},
          }

          case "sortData":
            {
              if(action.payload === "upvoted"){
                state.allRecords =state.allRecords.sort((a, b) => a.votes - b.votes).reverse()
            }else if(action.payload === "recent"){
              state.allRecords = state.allRecords.sort((a, b) => (new Date(a.date) || 0) - (new Date(b.date) || 0)).reverse()
            }
              return  {
                allRecords : state.allRecords,
                singleRecord: {...state.singleRecord},     
                editRecord: {...state.editRecord},
              }
            }
          case "populateEditRecord":
          {
            let thisEditRecord =[]
            state.allRecords.map((record)=>{
              if(action.payload === record.id){
                thisEditRecord = {
                  id : record.id,
                  title: record.title,
                  votes: record.votes,
                  date: record.date,
                }
              }
              return true
            })
            return {
              allRecords : [ ...state.allRecords],
              singleRecord: {...state.singleRecord},
              editRecord: {
                id : thisEditRecord.id,
                title: thisEditRecord.title,
                votes: thisEditRecord.votes,
                date: thisEditRecord.date,
              }     
            }
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
        type : "submitEditedRecord",
        payload : id
      }
    )
}

function handleEditChange(e,id){
  dispatch({
    type: "editRecord",
    payload: e.target,
  }
)
}

const [editData, setEditData] = useState([])
const [isEdit, setIsEdit] = useState(false)

function handleEdit(e,recordId){  
      setIsEdit(true)
      dispatch({
        type: "populateEditRecord",
        payload : recordId
      })
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
function sortedTerm(type){
  dispatch(
    {
      type: "sortData",
      payload: type
  })
}

  return (
    <>  
    <Context.Provider value={state}>
        {!isEdit ?
        <AddForm
          handleChange = {handleChange}
          submitRecord={submitRecord}
        />:
         <EditForm 
         handleEditChange = {handleEditChange}
         updateRecord={updateRecord}
         /> 
        }
        
            <Listing handleDelete={handleDelete}
            handleEdit={handleEdit}
            sortedTerm={sortedTerm}

            />
        </Context.Provider>
    </>
  )
}

export default Home