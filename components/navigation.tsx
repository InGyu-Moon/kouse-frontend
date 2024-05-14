'use client'
import Link from "next/link";
import React from 'react';
import {useState} from 'react'

import style from "../style/navigation.module.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation(){


    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };
    return (

        <nav className={style.nav}>
            <ul>
                <li>
                    <Link href="/">KOUSE</Link>
                </li>
                <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Link href="/room/" >원룸</Link>
                    {showDropdown && (
                        <ul className={style.dropdown}>
                            <li><Link href="/room/a">A 메뉴</Link></li>
                            <li><Link href="/room/b">B 메뉴</Link></li>
                            <li><Link href="/room/c">C 메뉴</Link></li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link href="/mypage">마이페이지</Link>
                </li>
                <li>
                    <Link href="/Login">로그인</Link>
                </li>
                <li>
                    <Link href="/Join">회원가입</Link>
                </li>
            </ul>
        </nav>
    );
}