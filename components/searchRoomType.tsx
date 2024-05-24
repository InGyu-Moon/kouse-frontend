import Link from "next/link";
import style from "../style/searchForm.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchRoomType(){
    return(
        <div className={style.search}>
            <Link href="/room/addform" >
                <button style={{marginRight:'30px'}} className='btn btn-outline-success'>원룸 추가 하기</button>
            </Link>
            <form>
                <select name="searchRoomByType" id="searchRoomLocationType">
                    <option value="">전체</option>   
                    <option value="">농심뒤</option>
                    <option value="">학관뒤</option>
                    <option value="">구정문</option>
                </select>
                <input type='text'/>
                <button className='btn btn-outline-primary' type='submit'>검색</button>
            </form>
        </div>
    )
}

