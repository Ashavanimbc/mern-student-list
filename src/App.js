import React, { useEffect, useState } from "react"
import axios from "axios"
function App() {
  const [students, setstudents] = useState([])
  const [Form, setform] = useState({ name1: "", age1: "", grade1: "" })
  const [message, setmessage] = useState("")

  const handlechange = (e) => {setform({ ...Form, [e.target.name]: e.target.value })
    
  }

  const submitstudent = () => {
    axios.post("http://localhost:5000/addstudent", Form).then(res => {
      setmessage(res.data)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/getstudents").then(res => setstudents(res.data))
      .catch(error => console.log(error))

  },[])


  return (
    <div>
      <h2>student list</h2>
      <table border="1">
        <th>Name</th><th>Age</th><th>Grade</th>
        {students.map(s => (
          <tbody key={s._id}>
            <tr><td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.grade}</td>
              </tr>
          </tbody>
        ))
        }
      </table>

      <form>
        <h2>add student</h2>
        <input type="text" name="name1" value={Form.name1} onChange={handlechange} />
        <br />
        <br />
        <input type="number" name="age1" value={Form.age1} onChange={handlechange} />
        <br />
        <br />
        <input type="text" name="grade1" value={Form.grade1} onChange={handlechange} />
        <br />
        <br />
        <button type="button" onClick={submitstudent}>save</button>
        <p> {message}</p>
      </form>

    </div>
  )
  
}
export default App
