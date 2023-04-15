import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function ProductCrud()
{
    let navigate = useNavigate();
    const [product, setProduct] = useState([]);

    function loadProducts()
    {
        axios({
            method : 'GET',
            url :'http://127.0.0.1:7000/getProducts'
        })
        .then(res=>{
            setProduct(res.data)
        })
    }

    useEffect(()=>
    {
        loadProducts()

    },[])

    function deleteProduct(e)
    {
        axios({
            method :'DELETE',
            url :`http://127.0.0.1:7000/delete/${e.currentTarget.value}` // be careful with the APi, don't forget to write delete
        })
        console.log(e.currentTarget.value)
        alert('Record Deleted')
        navigate('/addProduct')

        /*for (var property in e)
        {
            console.log(e)
        } */
    }


    return(
        <div className="container-fluid">
            <h3>List of All products</h3>
            <table className="table table-responsive table-dark table-hover">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map(item=>
                            <tr>
                                <td>{item.Id}</td>
                                <td>{item.Product}</td>
                                <td>&#8377; {item.Price}</td>
                                <td>{(item.Stock==true)?'Available' : 'Out of Stock'}</td>
                                <td>
                                    <Link to='' className="bi bi-eye-slash-fill"></Link> {/*view link*/}
                                </td>
                                <td>
                                    <Link to={'/update/'+ item.Id} className="bi bi-pen-fill text-warning"></Link>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger bi bi-trash3" value={item.Id} onClick={deleteProduct}></button>
                                </td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
            <p>
                <Link to='/addProduct'>Add New Product</Link>
            </p>
        </div>
    )
}