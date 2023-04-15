import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


export function UpdateCrud()
{
    const [name, setName]= useState('Out of Stock')

    // const [adminPass, setAdminPass]= useState()
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([{}]);

    function loadProducts()
    {
        axios({
            method : 'GET',
            url :`http://127.0.0.1:7000/details/${params.id}` // predefined params.id
        })
        .then(res=>{
            setProduct(res.data)
            // console.log(res.data)
        })
    }
    useEffect(()=>
    {
        loadProducts();
    },[])

    const formik = useFormik({
        initialValues : {
            Product :'',
            Price : 0,
            Stock : true
        },
        onSubmit : ((values)=>
        {
            values.Stock = (values.Stock==true)? 'true' : 'false' ;
            // console.log(values)
            console.log( typeof(values.Stock))
            axios.patch(`http://127.0.0.1:7000/update/${params.id}`, {
                Product : values.Product,
                Price : values.Price,
                Stock : values.Stock
            })
            // console.log(params.id)
            navigate('/productCrud')
            // alert(JSON.stringify(values))
        })
    })

    function SwitchCase(e)  // onClick
    {
        if (e.target.checked)
        {
            setName('Available')
        }
        else{
            setName('Out of Stock')
        }
    }
    return(
        <div className="container-fluid">
            <h3>Update Page</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Product Name</dt>
                    <dd>
                        <input type='text' required defaultValue={product[0].Product} onChange={formik.handleChange} name='Product' />
                    </dd>
                    <dt>Product Price</dt>
                    <dd>
                        <input type='text' required defaultValue={product[0].Price} onChange={formik.handleChange}  name='Price' />
                    </dd>
                    <dt>Stock</dt>
                    <dd className="form-switch">
                        <input onClick={SwitchCase} className="form-check-input" type='checkbox' defaultValue={product[0].Stock} onChange={formik.handleChange} name='Stock' /> {name}
                    </dd>
                </dl>
                <button className="btn btn-primary">Submit Update</button>
            </form>
            <p>
                <Link to='/productCrud'>Go to Product Page</Link>
            </p>
        </div>
    )
}