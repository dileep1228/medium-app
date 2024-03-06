import { SignupInput } from "@dileep1228/medium-app";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type} :{type :"signup" | "signin"})=>{
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        "email":"",
        "password":"",
        "name":""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ?"signin" : "signup" }`,postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.token);
            console.log(jwt.token);
            navigate("/blogs");
        }
        catch(e){
            alert("error while signing up")
        }
    }
    return <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? " Already have an account? " : "Don't have an account "}
                        <Link className="pl-2 underline" to={ type === "signin" ? "/signup ": "/signin"}>{type === "signin" ? "signup" : "signin"}</Link>
                    </div>
                </div>
                <div className="">
                    {type === "signup" ? <LabelledInput label="Name" placeholder="dileep kumar ..." onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            name : e.target.value
                        }))
                    }} /> : null}
                    <LabelledInput label="Email" placeholder="dileep@gmail.com" onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            email : e.target.value
                        }))
                    }} />
                    <LabelledInput label="Password" type={"password"} placeholder="123456789" onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            password : e.target.value
                        }))
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}


function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}