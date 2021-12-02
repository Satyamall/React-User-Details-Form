
import { useEffect, useState } from 'react';
import './App.css';
import Form from './Components/Form';
import TableItem from './Components/Table/TableItem'

function App() {

  const [data, setData] = useState([]);
  const [page,setPage]= useState(1);

  const getData=(page)=>{
    fetch(`http://localhost:3000/employeeDetails?_limit=5&_page=${page}`)
      .then(res => res.json())
      .then((res) => {
        setData([...res]);
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
      getData(page);
  }, [page])

  const handleTask = async ({ name, age, address, department, salary, maritalStatus, image }) => {
    const payload = {
      name: name,
      age: age,
      address: address,
      department: department,
      salary: salary,
      maritalStatus: maritalStatus,
      image: image
    }

    const config = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    await fetch(`http://localhost:3000/employeeDetails`, config)
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/employeeDetails/${id}`, {
        method: "DELETE"
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  const [deptData,setDeptData]=useState({
    dept: "Show All"
  })
  const handleDept=(dept)=>{
     setDeptData({dept: dept})
  }

  const [order,setOrder]=useState({
    sortMethod: null
  })
  const handleSort=(order)=>{
    setOrder({sortMethod: order})
  }

  const handlePage=(e)=>{
    switch(e.target.name){
      case "Prev":
        if(page<=1)
        {
          setPage(1);
        }
        else{
          setPage((prev)=>prev-1);
        }
        break;
      case "Next":
        setPage((next)=>next+1);
        break;
      default:
        break;
    }
  }
  return (
    <div className="App">
      <h1>User Details Form</h1>
      <Form onTaskCreate={handleTask} />
      <div className="dept">
        Department: {" "}
        {
          ["Show All","CEO", "Director", "Manager", "Front-End Developer", "Back-End Developer", "Software Developer"].map((dept)=>{
            return <button key={dept} onClick={()=>handleDept(dept)}>{dept}</button>
          })
        }
      </div>
      <div className="sort">
        Sort: {" "}
        {
          ["All","Low To High","High To Low"].map(order=> {
            return <button key={order} onClick={() =>handleSort(order)}>
               {order}
             </button>
           })
        }
      </div>
      <TableItem handleDelete={handleDelete} data={data.filter((department)=>{
        if(deptData.dept==="Show All")
        {
          return "Show All"
        }
        return department.department=== deptData.dept;
      }).sort((a, b) =>{
        if (order.sortMethod === "Low To High") {
          return a.salary - b.salary;
        }
        if (order.sortMethod === "High To Low") {
          return b.salary - a.salary;
        }
        return 0;
      })} />

      {
        <div className="page">
            <button name="Prev" onClick={(e)=>handlePage(e)}>Prev</button>
            <h5>{page}</h5>
            <button name="Next" onClick={(e)=>handlePage(e)}>Next</button>
        </div>
      }
    </div>
  );
}

export default App;
