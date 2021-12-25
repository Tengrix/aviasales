import {filterType} from "../types/types";

type ControlledCheckBoxesType = {
    filter:filterType;
    checkedState:boolean[];
    index:number
    filters:filterType
    newFun:(filter:filterType,pos:number,transfer:number)=>void;
}
export default function ControlledCheckBoxes({filter,checkedState,index,newFun,filters}:ControlledCheckBoxesType){
    return(
        <div>
            <input type="checkbox" onChange={()=>newFun(filters,index,index)} checked={checkedState[index]} name={filter} value={filter}/> {filter}
        </div>
    )
}