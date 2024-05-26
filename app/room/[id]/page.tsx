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
    const [imageUrl, setImageUrl] = useState<string[]>([]);

    useEffect(() => {
        getRoomById();
    }, []);

    async function getRoomById() {
        try{
            const response = await fetch(`${API_URL}/api/v1/room/${id}`);
            if(response.ok){
                const data = await response.json();
                setRoomData(data);
                if(data.hasImg){
                    try{
                        const response = await fetch(`${API_URL}/api/v1/room/img/${id}`);
                        if(response.ok){
                            const data = await response.json();
                            getImgUrl(data);
                        }
                        else{
                            throw new Error('Network response was not ok.');
                        }
                    }catch(error){
                        console.error('There was a problem with the fetch operation:', error);
                    }
                }
            }
            else{
                throw new Error('Network response was not ok.');
            }
        }catch(error){
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async function getImgUrl(data:string[]) {
        data.forEach(async(img,idx)=>{
            try{
                const response = await fetch(`${API_URL}/api/v1/image/${img}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const imageBlob = await response.blob();
                    const imageObjectURL = URL.createObjectURL(imageBlob);
    
                   
                    setImageUrl(prevState => {
                        const newState = [...prevState]; // Copy the previous state
                        newState[idx] = imageObjectURL; // Update the specific index
                        return newState; // Return the new state
                    });
            }catch(error){
                console.error('There was a problem with the fetch operation:', error);
            }
        })
    }
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % imageUrl.length);
      };
    
      const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + imageUrl.length) % imageUrl.length);
      };

    return(
        <>
        <div className={style.roomDetails}>
            {roomData && (
                <div className={style.detail}>
                    <h1>{roomData.roomName}</h1>

                    <div>
                        <img src={imageUrl[currentImageIndex]} alt="room image" style={{maxHeight:'300px', width: 'auto'}}/>
                    </div>

                    <div>
                        {imageUrl.map((url, idx) => (
                            <img key={idx} src={url} alt="room thumbnail" 
                            style={{width:'80px', cursor: 'pointer', opacity: idx === currentImageIndex ? 1 : 0.5}}
                            onClick={() => setCurrentImageIndex(idx)} />
                        ))}
                        
                    </div>

                    <div>
                        <button onClick={nextImage} className='btn btn-outline-primary'>다음</button>
                    </div>
                    
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