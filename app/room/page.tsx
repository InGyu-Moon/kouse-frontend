'use client'
import React from 'react';
import {useState,useEffect} from 'react'
import Room from '../../type/Room';

import style from "../../style/room.module.css"
import Link from 'next/link';

export default function RoomPage(){

    const [allRoomData, setAllRoomData] = useState<Room[]>([]);

    useEffect(() => {
        getAllRooms();
    }, []);

    async function getAllRooms() {
        try{
            // const response = await fetch('http://223.130.155.42:8080/api/v1/rooms');
            const response = await fetch('http://223.130.153.63/api/v1/rooms');
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setAllRoomData(data);
            }
            else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    

    return(
        <>
        <div className={style.container}>
            {allRoomData.map((room, index) => (
                <Link href={`/room/${room.roomId}`} passHref key={index}>
                    <div className={style.roomCard}>
                        <img src='/images/photo.png' />
                        {/* <img src={`http://localhost:8080/images/${room.imgUrl}_1.png`} /> */}
                        {/* <p>{room.imgUrl}_1</p> */}
                        <p>{room.roomName} ({room.roomLocation})</p>
                        <p>보증금: {room.roomDeposit}만원 / {room.roomPaymentType}: {room.roomCost}만원</p>
                    </div>
                </Link>
            ))}
        </div>
        </>
    )
}