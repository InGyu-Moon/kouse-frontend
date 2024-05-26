'use client'
import React, { use } from 'react';
import {useState,useEffect} from 'react'
import Room from '../../type/Room';

import style from "../../style/room.module.css"
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RoomPage(){

    const [allRoomData, setAllRoomData] = useState<Room[]>([]);

    //============================
    const [imageUrl, setImageUrl] = useState<string[]>([]);
    //============================

    useEffect(() => {
        getAllRooms();
    }, []);
    useEffect(() => {
        getImgUrl();
    }, [allRoomData]);

    async function getAllRooms() {
        try{
            const response = await fetch(`${API_URL}/api/v1/rooms`);
            if(response.ok){
                const data = await response.json();
                console.log("getAllRooms fetch data",data);
                setAllRoomData(data);
            }
            else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function getImgUrl() {
        console.log("getImgUrl - allRoomData",allRoomData);
        allRoomData.forEach(async(room,index)=>{
            if(room.hasImg){
                try{
                    // const response = await fetch(`${API_URL}/api/v1/room/img/${room.roomId}`);
                    const response = await fetch(`http://localhost:8080/api/v1/room/img/${room.roomId}`);
                    if(response.ok){
                        const data = await response.json();
                        room.mainImg = data[0];
                        console.log("getImgUrl - room.mainImg",room.mainImg);
                        getImgFile(room.mainImg,index);
                    }
                    else{
                        throw new Error('Network response was not ok.');
                    }
                }catch(error){
                    console.error('There was a problem with the fetch operation:', error);
                }
            }
        })
    }
    async function getImgFile(img:string,idx:number) {
        try{
            // const response = await fetch(`${API_URL}/api/v1/image/${img}`);
            const response = await fetch(`http://localhost:8080/api/v1/image/${img}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const imageBlob = await response.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);

                // setImageUrl[idx](imageObjectURL);
                setImageUrl(prevState => {
                    const newState = [...prevState]; // Copy the previous state
                    newState[idx] = imageObjectURL; // Update the specific index
                    return newState; // Return the new state
                });
                allRoomData[idx].mainImgFile = imageObjectURL;
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
                        {/* <img src='/images/photo.png' /> */}
                        {imageUrl[index] ? <img src={imageUrl[index]} alt="Fetched from server" /> : <p>Loading Img...</p>}
                        <p>{room.roomName} ({room.roomLocation})</p>
                        <p>보증금: {room.roomDeposit}만원 / {room.roomPaymentType}: {room.roomCost}만원</p>
                    </div>
                </Link>
            ))}
            
        </div>
        </>
    )
}