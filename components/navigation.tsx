import Link from "next/link";
import style from "../style/navigation.module.css"


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation(){
    return (

        <nav className={style.nav}>
            <ul>
                <li>
                <Link href="/" style={{fontSize: '20px'}}>KUS House</Link>
                </li>
                <li>
                    <Link href="/room">원룸</Link>
                </li>
                <li className="nav-item">
                    <Link href="/mypage">마이페이지</Link>
                </li>
            </ul>
        </nav>

        // <nav className={`${style.nav} navbar sticky-top navbar-expand-lg navbar-light bg-light`}>
        //     <div className="container-fluid">
        //         <a className="navbar-brand" href="/">KUS-House</a>
                
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav">
        //                 <li className="nav-item">
        //                     <Link className="nav-link" href="/room">원룸</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" href="/mypage">마이페이지</Link>
        //                 </li>
        //             </ul>
        //         </div>

        //     </div>
        // </nav>
    );
}