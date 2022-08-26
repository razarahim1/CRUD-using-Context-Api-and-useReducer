import React, { useContext } from 'react'
import Context from './Context'
function AddForm(props) {
  const getRecord = useContext(Context)
  return (
    <div className="form-fields">
            <form method='POST'>
                <div className="form-data">
                <p style={{display:"inline-block",width:"55%"}}>Add Record</p>     
                    <input 
                     type="text"
                     placeholder="Enter title..." 
                     className="input-field" 
                     name="title"
                     value={getRecord.singleRecord.title}
                     onChange={props.handleChange}/>

                    <input 
                    type="number" 
                    min="1"
                    max="100"
                    name="votes"
                    placeholder="Enter upvotes number between 0 to 100.." 
                    className="input-field" 
                    value={getRecord.singleRecord.vote}

                    onChange={props.handleChange}/>

                    <input 
                    type="date" 
                    name="date"
                    placeholder="Enter Date.." 
                    className="input-field" 
                    value={getRecord.singleRecord.date}
                    onChange={props.handleChange} />

                    <button 
                      onClick={props.submitRecord}
                      className="add-data-btn">
                      Add Data
                    </button>
                </div>
            </form>
   
            </div>

  )
}

export default AddForm