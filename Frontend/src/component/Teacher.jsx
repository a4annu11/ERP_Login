import { useTeacherAuth } from '../context/teacherAuth'

const Teacher = () => {
    const[teacherauth] = useTeacherAuth()
  return (
    <div>
        {JSON.stringify(teacherauth, null , 4)}
      <h1>{teacherauth?.user?.name}</h1>
      <h2>{teacherauth?.user?.email}</h2>
    </div>
  )
}

export default Teacher
