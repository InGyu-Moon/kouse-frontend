'use client'
import React from 'react';
import {useState,useEffect} from 'react'

import Room from '../../../type/Room';
import style from "../../../style/roomDetails.module.css"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function RoomDetails({
    params:{id},
}:{params:{id:string}}){

    const [roomData, setRoomData] = useState<Room>();

    useEffect(() => {
        getRoomById();
    }, []);

    async function getRoomById() {
        try{
            const response = await fetch(`${API_URL}/api/v1/room/${id}`);
            if(response.ok){
                const data = await response.json();
                setRoomData(data);
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
        <div className={style.roomDetails}>
            {roomData && (
                <div>
                    <h1>{roomData.roomName}</h1>
                    <p>
                        <strong>보증금/{roomData.roomPaymentType} : </strong> {roomData.roomDeposit}/{roomData.roomCost} (만원) &nbsp;
                        <strong>위치:</strong> {roomData.roomLocation}
                    </p>
                    <p><strong>주소:</strong> {roomData.roomAddress}</p>
                    <p><strong>옵션:</strong> {roomData.roomOption}</p>
                    <p><strong>상세 정보:</strong> {roomData.roomDetail}</p>
                    
                </div>
            )}
        </div>
        </>
    )
}

// {Array.from({ length: room.num }).map((_, i) => (
//     <p key={i}>This is p tag {i + 1}</p>
// ))}