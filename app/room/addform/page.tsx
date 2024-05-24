'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import Room from '../../../type/Room';
import style from "../../../style/addform.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function RoomAddFormPage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Room>();

    function onSubmit(data) {
        console.log(data);
        // 여기서 데이터를 처리하거나 전송할 수 있습니다.
    }
  

    return (
        <div className={style.addform}>
            <h3>방 정보 추가 하기</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label  htmlFor="roomName">이름 :</label>
                <input type="text" placeholder='  원룸 이름' id="roomName" className='form-control' 
                {...register('roomName', { required: true })} />
                {/* style={errors.roomName ? {borderColor: 'red'} : {}} */}
                
            </div>
            {errors.roomName && <span style={{color: 'red'}} >방 이름을 입력해주세요</span>}
            <div>
                <label htmlFor="roomAddress">주소 :</label>
                <input type="text" placeholder='  원룸 주소' id="roomAddress" className='form-control' 
                {...register('roomAddress', { required: true })} />
            </div>
            {errors.roomAddress && <span style={{color: 'red'}} >주소를 입력해주세요</span>}
            <div>
                <select id="roomPaymentType" 
                {...register('roomPaymentType', { required: true })}>
                    <option value="연세">연세</option>
                    <option value="월세">월세</option>
                </select>
                <input type="number" min={1} placeholder='  보증금' id="roomDeposit" className='form-control' style={{width: '100px', marginLeft:'20px', marginRight:'10px'}}
                {...register('roomDeposit', { required: true })} />만원
                <input type="number" min={1} placeholder='월세, 연세'id="roomCost" className='form-control' style={{width: '100px',marginLeft:'20px',marginRight:'10px'}}
                {...register('roomCost', { required: true })} /> 만원
            </div>
            {errors.roomDeposit && <span style={{color: 'red'}} >금액을 입력해주세요.</span>}
            <div>
                <label htmlFor="roomOption">옵션 : </label>
                <input type="text" placeholder='ex) 전자레인지, 세탁기, 에어컨' id="roomOption" className='form-control'
                {...register('roomOption')} />
            </div>
            <div>
                <label htmlFor="roomDetail">상세정보 :</label>
                <textarea id="roomDetail" placeholder='방에 대해 설명해주세요' className='form-control'
                {...register('roomDetail')}></textarea>
            </div>

            <button className='btn btn-outline-success' type="submit">추가</button>
        </form>
        </div>
        
    );
}

{/* <label htmlFor="roomLocation">위치:</label>
                <select id="roomLocation" {...register('roomLocation', { required: true })}>
                    <option value="연세">농심관</option>
                    <option value="월세">구정문</option>
                </select> */}