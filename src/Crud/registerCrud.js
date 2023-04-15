import { Link } from "react-router-dom";

import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function RegisterCrud()
{
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            Id :0,
            Product :'',
            Price :0,
            Stock :true
        },
        onSubmit : ((values)=>
        {
            values.Stock = (values.Stock==true)? 'true' : 'false' ; // very imp step
            axios({
                method: 'POST',
                url :'http://127.0.0.1:7000/addProducts',
                data : values
            })
            alert('Data Submitted')
            navigate('/productCrud')
            // alert(JSON.stringify(values))
        })
    })
    return(
        <div className="container-fluid">
            <form onSubmit={formik.handleSubmit}>
                <h4>Register Product Page</h4>
                <dl>
                    <dt>Enter ID</dt>
                    <input type='text' name="Id" onChange={formik.handleChange} required />
                    <dt>Enter Name</dt>
                    <input type='text' name='Product' onChange={formik.handleChange} required/>
                    <dt>Enter Price</dt>
                    <input type='text' name='Price' onChange={formik.handleChange}  required/>
                    <dt> Stock </dt>
                    <dd className="form-switch">
                        <input className="form-check-input" type='checkbox' name='Stock' onChange={formik.handleChange}  /> Available
                    </dd>
                </dl>
                <button className="btn btn-warning">Add To Items</button>
            </form>
            <p>
                <Link to='/productCrud'>Go to products page</Link>
            </p>
        </div>
    )
}