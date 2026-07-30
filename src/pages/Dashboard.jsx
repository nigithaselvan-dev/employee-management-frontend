import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard(){
const [stats, setStats] = useState({

    totalEmployees: 0,

    departments: 0,

    averageSalary: 0

});
useEffect(() => {

    fetchStats();

}, []);

const fetchStats = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await API.get(

            "/dashboard/stats",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        setStats(response.data.data);

    }

    catch (error) {

        console.log(error);

    }

};
   return (

<div>

<Navbar />

<h2 className="mb-4">

Welcome Admin 👋

</h2>

<div className="container mt-5">

<h2 className="mb-4">

Dashboard

</h2>

<div className="row g-4">

<div className="col-md-4 mb-3">

<div
className="card shadow border-0 h-100"
style={{
borderRadius:"15px",
transition:"0.3s"
}}>

<div className="card-body text-center py-4">

<i className="bi bi-people-fill display-3 text-primary"></i>

<h5 className="mt-3">
Total Employees
</h5>

<h2 className="fw-bold display-5">

{stats.totalEmployees}

</h2>

</div>

</div>

</div>

<div className="col-md-4 mb-3">

<div
className="card shadow border-0 h-100"
style={{
borderRadius:"15px",
transition:"0.3s"
}}
>

<div className="card-body text-center py-4">

<i className="bi bi-building display-3 text-primary"></i>

<h5 className="mt-3">
Departments
</h5>

<h2>
{stats.departments}
</h2>

</div>

</div>

</div>

<div className="col-md-4 mb-3">

<div
className="card shadow border-0 h-100"
style={{
borderRadius:"15px",
transition:"0.3s"
}}
>

<div className="card-body text-center py-4">

<i className="bi bi-cash-stack display-3 text-primary"></i>

<h5 className="mt-3">
Average Salary
</h5>

<h2>
₹ {stats.averageSalary}
</h2>

</div>

</div>

</div>

</div>

</div>
<Footer />
</div>

);

}


export default Dashboard;