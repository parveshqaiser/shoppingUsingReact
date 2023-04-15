
import '../Project/index.css';

import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import e from 'express';

export function RegisterPage()
{
    const [message, setMessage]= useState('');
    const navigate = useNavigate();
    const [color,setColor] = useState()


    const formik = useFormik({
        initialValues : {
            Username :'',
            Password :'',
            Email :'',
            Phone :''
        },
        onSubmit : (values)=>
        {
            // alert(JSON.stringify(values));
            axios ({
                method : 'POST',
                url : 'http://127.0.0.1:7000/register',
                data : values
            })
            alert('Submitted Successfully')
            navigate('/login')           
        }
    })

    function verifyName(e)
    {
        axios({
            method :'GET',
            url :'http://127.0.0.1:7000/getUsers'
        })
        .then((response)=>{
            // console.log(res);
            for (var user of response.data)
            {
                if (user.Username == e.target.value)
                {
                    setMessage('Username taken- Try another');
                    setColor('taken')  // don't give dot (.)here
                    break;
                }
                else{
                    setMessage('Username Available');
                    setColor('available')
                }
            }
        }) 
    }
    // function twoCalls(){
    //     formik.handleChange();
    //     numberCheck()
    // }

    // function numberCheck(e)
    // {
    //     if ((e.charCode >=48 && e.charCode <=57) || e.charCode==46)
    //     {
    //         console.log(e.currentTarget.value)
    //          setMessage('Numbers are not allowed')
    //     }
    //     if (typeof(e.target.value) === Number ){
    //     setMessage('Numbers are not allowed');
    //      }
    // }


// onChange={(e)=>twoCalls(e)}
// response contains the data present in (http://127.0.0.1:7000/getUsers) this location
// how to know what obj the third party is using 

    return(
        <div className="container-fluid ">
            
            <form className="register-form" onSubmit={formik.handleSubmit}>
                <h3>Register Details</h3>
                <dl>
                    <dt>Enter Name</dt>
                    <dd>
                        <input type='text' name='Username' required   onKeyUp={verifyName} onChange={formik.handleChange} /> 
                        <div className={color}> {message}</div>
                    </dd>
                    <dt>Enter Password</dt>
                    <dd>
                        {/* name attribute is mandatory here otherwise it wont work */}
                        <input type='password' name='Password' onChange={formik.handleChange} required /> 
                    </dd>
                    <dt>Enter Email </dt>
                    <dd>
                        <input type='email'name='Email' onChange={formik.handleChange} required />
                    </dd>
                    <dt>Enter Phone Number</dt>
                    <dd>
                        <input type='text' name='Phone' onChange={formik.handleChange} required/>
                    </dd>
                </dl>
                <button className="btn btn-success">Register</button>
            </form>

        </div>
    )
}