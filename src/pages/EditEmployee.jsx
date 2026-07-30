import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function EditEmployee(){

    const {id} = useParams();

    const navigate = useNavigate();


    const [employee,setEmployee] = useState({

        name:"",
        email:"",
        phone:"",
        department:"",
        designation:"",
        salary:""

    });



    useEffect(()=>{

        getEmployee();

    },[]);



    const getEmployee = async()=>{

        try{

            const response = await API.get(`/employees/${id}`);

            setEmployee(response.data.data);

        }
        catch(error){

            console.log(error);

        }

    };



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

            await API.put(`/employees/${id}`, employee);

            toast.success("Employee updated successfully");

            navigate("/employees");


        }
        catch(error){

        console.log(error);

        toast.error("Failed to update employee.");

}

    };



    return(

        <div className="container mt-5">

            <Navbar/>

        <div className="card shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>

        <h2 className="mb-4 text-center">
            Update Employee Details
            </h2>


            <form onSubmit={handleSubmit}>


                <input
                className="form-control"
                name="name"
                value={employee.name}
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="email"
                value={employee.email}
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="department"
                value={employee.department}
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                />


                <br/>


                <input
                className="form-control"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                />


                <br/>


                <button type="submit"
                className="btn btn-success w-100">

                    Update Employee

                </button>


            </form>
        </div>

        </div>

    )

}


export default EditEmployee;