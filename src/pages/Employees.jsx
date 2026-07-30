import { useEffect,useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Employees(){
    console.log("Employees page loaded");
    const [employees,setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{

        getEmployees();

    },[]);



    const getEmployees = async()=>{

        try{

            const response = await API.get("/employees");
            console.log(response.data);
            setEmployees(response.data.data);
            setLoading(false);

        }
        catch(error){

        console.log(error);

        setLoading(false);

}

    };
const deleteEmployee = async(id)=>{
    const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
);

if (!confirmDelete) return;
const token = localStorage.getItem("token");
    try{

        await API.delete(`/employees/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        toast.success("Employee deleted successfully!");
        getEmployees();

    }
    catch(error){

        console.log(error);
        
        toast.error("Failed to delete employee.");

    }

};

return(

<div className="container mt-5">
<Navbar/>

<h2 className="mb-4">

Employee Directory

</h2>

<input

className="form-control mb-3"

type="text"

placeholder="🔍 Search employee..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

<table className="table table-striped table-hover table-bordered shadow">

<thead>

<tr>

<th>S.No</th>    

<th>Name</th>

<th>Email</th>

<th>Department</th>

<th>Designation</th>

<th>Salary</th>

<th>Actions</th>

</tr>

</thead>


<tbody>

{
loading ? (

<tr>
<td colSpan="7" className="text-center py-5">

<div className="spinner-border text-primary" role="status">
</div>

<p className="mt-3">
Loading Employees...
</p>

</td>
</tr>

) : (

employees
.filter((employee)=>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||

    employee.email.toLowerCase().includes(search.toLowerCase()) ||

    employee.department.toLowerCase().includes(search.toLowerCase()) ||

    employee.designation.toLowerCase().includes(search.toLowerCase())
)
.length === 0 ? (

<tr>

<td colSpan="7" className="text-center text-muted">

No Employees Found

</td>

</tr>

) : (

employees
.filter((employee)=>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||

    employee.email.toLowerCase().includes(search.toLowerCase()) ||

    employee.department.toLowerCase().includes(search.toLowerCase()) ||

    employee.designation.toLowerCase().includes(search.toLowerCase())
)
.map((employee, index)=>(

<tr key={employee._id}>

<td>{index + 1}</td>

<td>{employee.name}</td>

<td>{employee.email}</td>

<td>
<span className="badge bg-info">
{employee.department}
</span>
</td>

<td>{employee.designation}</td>

<td>
₹ {Number(employee.salary).toLocaleString("en-IN")}
</td>

<td>

<button
className="btn btn-warning btn-sm"
onClick={()=>navigate(`/edit-employee/${employee._id}`)}
>
Edit
</button>

<button
className="btn btn-outline-danger btn-sm ms-2"
onClick={()=>deleteEmployee(employee._id)}
>
Delete
</button>

</td>

</tr>

))

)

)

}

</tbody>


</table>


</div>

)

    

}


export default Employees;