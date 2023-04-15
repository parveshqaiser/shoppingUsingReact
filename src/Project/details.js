
import {useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

export function DetailsPage()
{
    const params = useParams();
    const [item, setItem]= useState({});

    useEffect(()=>
    {   
        fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then(function(res)
        {
            return res.json();
        })
        .then(function(data)
        {
            setItem(data)
        })

    },[])
    return(
        <div className="container-fluid">
            <h3>Product Details</h3> <code>rate count not working</code>
            <Link to={`/products/`+ item.category}>Back to products</Link> {/* category here ie predefined. be careful*/}
            <dl>
                <dt>Product Title </dt>
                <dd>{item.title}</dd>
                <dt>Product Price </dt>
                <dd>&#8377; {item.price}</dd>
                <dt>Preview Item</dt>
                <dd>
                    <img src={item.image} width='100' height='100' className='p-1' border='1'  />
                </dd>
                {/* <dt>Rating</dt>
                <dd>
                    {
                        details.map(item=>
                        <span>{item.rating.count}</span>
                    )
                    }
                </dd> */}
            </dl>
        </div>
    )
}