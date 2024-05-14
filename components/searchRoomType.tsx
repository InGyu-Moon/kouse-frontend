import style from "../style/searchForm.module.css"

export default function SearchRoomType(){
    return(
        <div className={style.search}>
            <form>
                <select name="searchRoomByType" id="searchRoomLocationType">
                    <option value="">전체</option>   
                    <option value="">농심뒤</option>
                    <option value="">학관뒤</option>
                    <option value="">구정문</option>
                </select>
                <input type='text'/>
                <button type='submit'>검색</button>
            </form>
        </div>
    )
}

