import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import {useCookies} from 'react-cookie';
import './index.css';



export function Categories()
{
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [name,setName]= useState('');
    const [category, setCategory] = useState([]);

    useEffect(()=>
    {
        if (cookie['User']==undefined)
        {
            navigate('/login')
        }
        else{
            setName(cookie['User'])
            fetch('https://fakestoreapi.com/products/categories')
            .then(res=> res.json())
            .then(data => {
                setCategory(data)
            })
        }      
    },[])

    function SignOut()
    {
        removeCookie('User')
        navigate('/login')
    }


    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-around">
                <h3> Shop According to your Categories</h3>
                <div>
                    <button className="btn btn-outline-danger mt-1" onClick={SignOut}>Sign out</button>
                </div>
            </div>
            <h3 className="text-center heading">Hello ! Mr {name}</h3>
            <ol>
                {
                    category.map(categories=>                      
                        <li key={categories}>
                            <Link to={`/products/` + categories} > {categories.toUpperCase()}</Link>
                        </li>                    
                    )
                }
            </ol>

        </div>
    )
}