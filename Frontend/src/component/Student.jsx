import React from 'react'
import { useAuth } from '../context/auth'

const Student = () => {
    const [auth] = useAuth()
  return (
    <div>
      <h1>{auth?.user?.name}</h1>
      <h2>{auth?.user?.email}</h2>
      <h3>{auth?.user?.batch}</h3>
    </div>
  )
}

export default Student
