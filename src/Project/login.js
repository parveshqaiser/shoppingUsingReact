
import {useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {useCookies} from 'react-cookie';

export function LoginPage()
{
    const [cookie, setCookie, removeCookie]= useCookies('');
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues : {
            Username :'',
            Password :''
        },
        onSubmit : ((values)=>
        {
            axios({
                method : 'GET',
                url :'http://127.0.0.1:7000/getUsers'
            })
            .then((res)=>
            {
                for ( var user of res.data)
                {
                    if (user.Username==values.Username) // values.Username means whatever value you entered from input field
                    {
                        if (user.Password==values.Password)
                        {
                            setCookie('User', values.Username)
                            navigate('/categories')
                            break;
                        }
                        else
                        {
                            setError('Invalid Password')
                            break;
                        }                        
                    }
                    else{
                        setError('Invalid Username')
                    }
                }
            })
        })
    })
    return(
        <div className="d-flex justify-content-center align-items-center" id="shop-login">
            <form onSubmit={formik.handleSubmit} className='login-form'>
                <dl>
                    <div className="mb-3">
                        <dd className="input-group">
                            <span className="bi bi-person-fill input-group-text"></span>
                            <input type='text' className="form-control" name='Username' onChange={formik.handleChange} placeholder='Enter Username' required />
                        </dd>    
                    </div>  

                    <div className="mb-4">
                        <dd className="input-group ">
                            <span className="bi bi-key input-group-text"></span>
                            <input type='password' className="form-control" name="Password" onChange={formik.handleChange} placeholder='Enter Password' required />
                        </dd>
                        <span className="text-danger">{error}</span>
                    </div>
                </dl>
                <div className="input-group input-group-center mx-2">
                    <button className="btn btn-primary">Login</button>
                    <button className="btn btn-danger"><Link id="link" to='/register'>Not Registered ?</Link></button>
                </div>
                
            </form>
        </div>
    )
}
{/* <div class="input-group">
    <span class="bi bi-person input-group-text"></span>
    <input type="text" name="uname" class="form-control"/>
</div> */}