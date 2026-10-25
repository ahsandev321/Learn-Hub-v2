import React from 'react'

function AdminContactUsComponent({ data, messageId }) {
       return (
              <div className='admin-users-cards-section'>

                     {/*Display the sender's name. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Name : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1>{data.name}</h1>
                     </div>

                     {/*Display the sender's email address. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Email : </h1>
                     </div>
                     <div className='admin-users-cards-text-section'>
                            <h1> {data.email} </h1>
                     </div>

                     {/*Display the contact us message. */}
                     <div className='admin-users-cards-heading-section'>
                            <h1>Message : </h1>
                     </div>
                     <div className='admin-users-cards-message-text-section'>
                            <p> {data.message} </p>
                     </div>

                     {/*Delete the selected message */}
                     <div className='admin-users-cards-button-section'>

                            <button className='admin-users-cards-delete-button' onClick={() => messageId(data)} >Delete</button>

                     </div>


              </div>
       )
}

export default AdminContactUsComponent
