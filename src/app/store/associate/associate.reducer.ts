import { createReducer, on } from "@ngrx/store";
import { associateState } from "./associate.state";
import { addAssociateSuccess, loadAssociateFail, loadAssociateSuccess } from "./associate.action";

const _associateReducer = createReducer(associateState,
        on(loadAssociateSuccess, (state, action) =>{
            return {
                ...state,
                list : [...action.list],
                errorMessage : ''
            }
        }),
        on(loadAssociateFail, (state, action) =>{
            return {
                ...state,
                list : [],
                errorMessage : action.errorMessage
            }
        }),
        on(addAssociateSuccess, (state, action) =>{
            const _maxId = Math.max(...state.list.map(object => object.id));
            const _newData = {...action.inputData};
            _newData.id = _maxId + 1;

            return {
                ...state,
                list : [...state.list, _newData],
                errorMessage : ''
            }
        })
    )

export function associateReducer(state: any, action: any){
    return _associateReducer(state, action);
}