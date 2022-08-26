import swal from '@sweetalert/with-react';
import React, { useContext, useState } from 'react'
import Context from './Context'

function Listing(props) {

  const getRecord = useContext(Context)

  let displayRecord = displayMasterRecord(getRecord.allRecords)

  function displayMasterRecord(passedObj){
    const dislpayedRecords = passedObj.map((record) => {
      return (
        <tr key={record.id} id={record.id}>
          <td>{record.title}</td>
          <td>{record.votes}</td>
          <td>{record.date}</td>
          <td>
            <button className="button-actions view" onClick={(e) => handleView(e, record.id, record.title, record.votes, record.date)}>View</button>
            <button className="button-actions edit" onClick={(e) => props.handleEdit(e, record.id)}>Edit</button>
            <button className="button-actions delete" onClick={(e) => props.handleDelete(e, record.id)}>Delete</button>
          </td>
        </tr>
      )
    })
    return dislpayedRecords
  }
  function handleView(e, id, title, votes, date) {
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
  const [searchTerm, setSearchTerm] = useState('');
  
  const recordList =
    getRecord.allRecords.filter((record) => {
      if (searchTerm === "") {
        return displayRecord
      } else if (
        (searchTerm !== "" && (record.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
        ||
        (searchTerm !== "" && (record.votes || '').toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        return record
      }
    }).map((record) => {
      if (record) {
        return (
          <tr key={record.id} id={record.id}>
            <td>{record.title}</td>
            <td>{record.votes}</td>
            <td>{record.date}</td>
            <td>
              <button className="button-actions view" onClick={(e) => handleView(e, record.id, record.title, record.votes, record.date)}>View</button>
              <button className="button-actions edit" onClick={(e) => props.handleEdit(e, record.id)}>Edit</button>
              <button className="button-actions delete" onClick={(e) => props.handleDelete(e, record.id)}>Delete</button>
            </td>
          </tr>
        )
      } else {
        return (<p>no record</p>)
      }
    });

  
  return (
    <div className="form-fields2">
      <input
        onChange={(event) => { setSearchTerm(event.target.value); }}
        type="text"
        className="input-field"
        placeholder="Search the record"
      />
      <span>Sort By</span>
      <button className="sort-button" 
      onClick={(e) => {props.sortedTerm("upvoted")}}
      >Most UpVoted</button>
      <button className="sort-button"
        onClick={(e) => {props.sortedTerm("recent")}}
      >Most Recent</button>
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
          {recordList}
        </tbody>
      </table>
    </div>
  )
}
export default Listing