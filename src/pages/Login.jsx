import { useState } from "react";
import API from "../api/axios";


function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async(e)=>{

        e.preventDefault();


        try{

            const response = await API.post("/auth/login",{

                email,
                password

            });


            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            window.location.href = "/dashboard";


        }
        catch(error){

            console.log(error.message);

        }

    };


    return(

        <div>

            <h2 className="text-center mb-4">

Employee Management System

</h2>

<h4 className="text-center text-muted mb-4">

Admin Login

</h4>


            <form onSubmit={handleLogin}>


                <input

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e)=>setEmail(e.target.value)}

                />


                <br/>


                <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                />


                <br/>


                <button type="submit">

                    Login

                </button>


            </form>


        </div>

    )

}


export default Login;