
import {useParams,Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';


export function Products()
{
    const [cookie, setCookie, removeCookie]= useCookies()
    let navigate = useNavigate();
    const params = useParams();
    const [product, setProduct]= useState([]);

    useEffect(()=>
    {
        if (cookie['User']== undefined)
        {
            navigate('/register')
        }
        else{
            fetch(`https://fakestoreapi.com/products/category/${params.categories}`) // api based on categories page where i used categories as key
            .then(function(res)
            {
                return res.json();
            })
            .then(data => {
                setProduct(data)
            })
        }       
    })

    function SignOut()
    {
        removeCookie('User')
        navigate('/login')
    }
    return(
        <div className="container-fluid">
            <h4 className='text-center'>Don't Hesitate to shop from our favorite collection</h4>
            <div className='d-flex justify-content-around'>
                <Link to='/categories'>Back to Category Page</Link> 
                <button className='btn btn-outline-danger' onClick={SignOut}>SignOut</button>
            </div>
            <div>
                {
                    product.map(products=>
                        <Link to={`/details/` + products.id}>
                            <div className='d-inline-block justify-content-center'>  {/*not working correctly */}
                                <img src={products.image} width='150px' height='150px' alt='images' border='1' className='mt-2 me-2 p-2'/>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}