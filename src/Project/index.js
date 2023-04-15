
import { BrowserRouter,Link, Route, Routes } from "react-router-dom";
import { Categories } from "./categories";
import { HomePage } from "./home";
import '../Project/index.css';
import { Products } from "./products";
import { DetailsPage } from "./details";
import { RegisterPage } from "./register";
import { LoginPage } from "./login";
import {useCookies} from 'react-cookie'
import { useState } from "react";
import { ProductCrud } from "../Crud/productCrud";
import { RegisterCrud } from "../Crud/registerCrud";
import { UpdateCrud } from "../Crud/updateCrud";

export function IndexPageBigBazar()
{
    const [name , setName]= useState('');
    const [cookie] = useCookies();
    return(
        <div className="">
            <BrowserRouter>
                <header className="bg-light p-2 d-flex justify-content-between">
                    <h2>BIG BAZAR </h2>
                    <div className="navBar">
                       <span><Link to='/home'>Home</Link></span>
                       <span><Link to='/about'> About</Link></span>
                       <span><Link to='/contact'>Contact</Link></span>
                       {cookie.User ? <span><Link to='/categories'> Category</Link></span> : <span><Link to='/register'>Register</Link></span> }
                       <span><Link to='/productCrud'>Admin</Link></span>
                       {/* <span><Link to='/register'>Register</Link></span> */}
                    </div>
                    <div>
                        {cookie.User ? '': <span className="bi bi-file-person-fill me-2"><Link to ='/login'>Login</Link></span>}                        
                    </div>
                </header>

                <section style={{height:'450px'}} className='overflow-auto'>
                    <Routes>   
                        <Route path='/home' element={<HomePage />} />                    
                        <Route path='/categories' element={<Categories/>}/>     
                        <Route path='/products/:categories' element={<Products/>}/>   
                        <Route path='/details/:id' element={<DetailsPage/>}/>   
                        <Route path="/register" element={<RegisterPage />} />    
                        <Route path="/login" element={<LoginPage />} />    
                        <Route path='/productCrud' element={<ProductCrud /> } />  
                        <Route path='/addProduct' element={<RegisterCrud /> } /> 
                        <Route path="/update/:id" element={<UpdateCrud />} />                   
                        <Route path="/" element={<HomePage /> } />
                        <Route path='*' element={<code className="m-3">Requested path not found.. Pls try later</code>} />
                    </Routes>

                </section>

                <footer className="container-fluid bg-dark text-white m-2">
                    <div className="d-flex justify-content-around" target="contact">
                        <div>
                            <p>Contact Us @</p>
                            <p>Contact Us @</p>
                            <p>Contact Us @</p>
                        </div>
                        <div>
                            <p>Contact Us @</p>
                            <p>Contact Us @</p>
                            <p>Contact Us @</p>
                        </div>
                    </div>
                </footer>            
            </BrowserRouter>
        </div>
    )
}