import React from 'react'
// import Context from './Context'

function EditForm(props) {
// console.log(props.data.id+ ' ' + props.data.title)
    return (
    <div className="form-fields">
    <form method='POST'>
        <div className="form-data">
        <p style={{display:"inline-block",width:"55%"}}>Edit Record</p>
        <p>{props.recordId}</p>
            <input
             type="text"
             placeholder={props.data.title}
             className="input-field"
             name="title"
             onChange={props.handleChange}/>
            <input
            type="number"
            min="1"
            max="100"
            name="votes"
            value={props.data.votes}
            placeholder="Enter upvotes number between 0 to 100.."
            className="input-field"
            onChange={props.handleChange}/>
            <input
            type="date"
            name="date"
            placeholder="Enter Date.."
            className="input-field"
            value={props.data.date}
            onChange={props.handleChange} />
            <button
              onClick={(e) => props.updateRecord(e,props.data.id)}
              className="add-data-btn">
              Update Data
            </button>
        </div>
    </form>

    </div>
)
}

export default EditForm