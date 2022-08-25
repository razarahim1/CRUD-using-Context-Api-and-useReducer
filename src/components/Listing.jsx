import swal from '@sweetalert/with-react';
import React, { useContext } from 'react'
import Context from './Context'

function Listing(props) {

  const getRecord = useContext(Context)

  const displayRecord = getRecord.map((record,index)=>{
    return(
      <tr key={record.id} id={record.id}>
        <td>{record.title}</td>
        <td>{record.votes}</td>
        <td>{record.date}</td>
        <td>
          <button className="button-actions view" onClick={(e)=>handleView(e,record.id,record.title,record.votes,record.date)}>View</button>
          <button className="button-actions edit" onClick={(e)=>props.handleEdit(e,record.id)}>Edit</button>
          <button className="button-actions delete" onClick={(e)=>props.handleDelete(e,record.id)}>Delete</button>
        </td>
      </tr>
    )
  })

  function handleView(e,id,title,votes,date){
    swal(
    
    <div>
      <h2>View Record Details</h2>
      <div className="view-box">
      <p><b>Title:</b><span className="span-left">{title}</span></p>
      </div>
      <div className="view-box">
      <p><b>Votes:</b><span className="span-left">{votes}</span></p>
      </div>
      <div className="view-box">
      <p><b>Date:</b><span className="span-left">{date}</span></p>
      </div>
    </div>
    );
  }

  return (
    <div className="form-fields2">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Search the record"
                />
                <span>Sort By</span>
                <button className="sort-button">Most Updated</button>
                <button className="sort-button">Most Recent</button>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Upvotes</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                      {displayRecord}
                  </tbody>
                </table>
                </div>
  )
}

export default Listing