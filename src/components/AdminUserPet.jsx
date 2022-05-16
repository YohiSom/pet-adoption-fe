import React from 'react'

function AdminUserPet({name, status}) {
  return (
    <div >
    <div>{`Name: ${name}`}</div>
    <div>{`Status: ${status}`}</div>
    
</div>
  )
}

export default AdminUserPet