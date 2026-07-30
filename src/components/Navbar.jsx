import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

const confirmLogout = window.confirm(
"Are you sure you want to logout?"
);

if(!confirmLogout){
    return;
}

localStorage.removeItem("token");

toast.success("Logged out successfully!");

navigate("/");

};

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link className="navbar-brand" to="/dashboard">

                    Employee Management System

                </Link>

                <div>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="btn btn-outline-light me-2"
                        to="/employees"
                    >
                        Employees
                    </Link>

                    <Link
                        className="btn btn-success me-2"
                        to="/add-employee"
                    >
                        Add Employee
                    </Link>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;