import { toast } from "react-toastify";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function AddEmployee(){

    const [employee,setEmployee] = useState({

        name:"",
        email:"",
        phone:"",
        department:"",
        designation:"",
        salary:""

    });
    const navigate = useNavigate();

    const handleChange=(e)=>{

        setEmployee({

            ...employee,

            [e.target.name]:e.target.value

        });

    };


    const handleSubmit=async(e)=>{

        e.preventDefault();
        if(employee.name.trim()===""){
    toast.error("Name is required");
    return;
}

if(employee.email.trim()===""){
    toast.error("Email is required");
    return;
}

const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(employee.email)){
    toast.error("Enter a valid email");
    return;
}

if(employee.phone.trim()===""){
    toast.error("Phone number is required");
    return;
}

if(!/^\d{10}$/.test(employee.phone)){
    toast.error("Phone number must contain exactly 10 digits");
    return;
}

if(employee.department.trim()===""){
    toast.error("Department is required");
    return;
}

if(employee.designation.trim()===""){
    toast.error("Designation is required");
    return;
}

if(employee.salary===""){
    toast.error("Salary is required");
    return;
}

if(Number(employee.salary)<=0){
    toast.error("Salary must be greater than 0");
    return;
}

        try{

            const response = await API.post("/employees", employee);

            console.log(response.data);

            toast.success("Employee Added Successfully");

setEmployee({

name:"",
email:"",
phone:"",
department:"",
designation:"",
salary:""

});

navigate("/employees");

        }
        catch(error){

            console.log(error);

        }

    };


    return(

        <div className="container mt-5">

            <Navbar/>


            <h2>Add Employee</h2>
           
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>

            <h2 className="mb-4 text-center">
            Add Employee
            </h2>
            
            <form onSubmit={handleSubmit}>


                <input
                className="form-control"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                />
                <br/>


                <input
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="department"
                placeholder="Department"
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="designation"
                placeholder="Designation"
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="salary"
                placeholder="Salary"
                onChange={handleChange}
                />


                <br/>


                <button
                 type="submit"
                 className="btn btn-success w-100">
                    Add New Employee
                </button>


            </form>

</div>
        </div>

    )

}


export default AddEmployee;