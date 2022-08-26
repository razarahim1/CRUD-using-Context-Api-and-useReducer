import React, { useContext } from 'react'
import Context from './Context'

function EditForm(props) {
    const getRecord = useContext(Context)
    
    return (
    <div className="form-fields">
    <form method='POST'>
        <div className="form-data">
        <p style={{display:"inline-block",width:"55%"}}>Edit Record</p>
        <p>{props.recordId}</p>
            <input
             type="text"
             value={getRecord.editRecord.title}
             className="input-field"
             name="title"
             onChange={props.handleEditChange}/>
            <input
            type="number"
            min="1"
            max="100"
            name="votes"
            value={getRecord.editRecord.votes}
            placeholder="Enter upvotes number between 0 to 100.."
            className="input-field"
            onChange={props.handleEditChange}/>
            <input
            type="date"
            name="date"
            placeholder="Enter Date.."
            className="input-field"
            value={getRecord.editRecord.date}
            onChange={props.handleEditChange} />
            <button
              onClick={(e) => props.updateRecord(e,getRecord.editRecord.id)}
              className="add-data-btn">
              Update Data
            </button>
        </div>
    </form>

    </div>
)
}

export default EditForm