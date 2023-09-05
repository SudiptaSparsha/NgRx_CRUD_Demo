import { createAction, props } from "@ngrx/store"
import { Associates } from "../model/associate.model"

export const LOAD_ASSOCIATE = '[associate page]load associate'
export const LOAD_ASSOCIATE_SUCCESS = '[associate page]load associate success'
export const LOAD_ASSOCIATE_FAIL = '[associate page]load associate fail'
export const UPDATE_ASSOCIATE = '[associate page]update associate'
export const UPDATE_ASSOCIATE_SUCCESS = '[associate page]update associate success'
export const OPEN_POPUP = '[associate page]open popup'
export const EDIT_ASSOCIATE = '[associate page]edit associate'
export const EDIT_ASSOCIATE_SUCCESS = '[associate page]edit associate success'

export const ADD_ASSOCIATE = '[associate page]add associate'
export const ADD_ASSOCIATE_SUCCESS = '[associate page]add associate success'

export const loadAssociate = createAction(LOAD_ASSOCIATE)
export const loadAssociateSuccess = createAction(LOAD_ASSOCIATE_SUCCESS, props<{list : Associates[]}>())
export const loadAssociateFail = createAction(LOAD_ASSOCIATE_FAIL, props<{errorMessage : string}>())

export const addAssociate = createAction(ADD_ASSOCIATE, props<{inputData : Associates}>())
export const addAssociateSuccess = createAction(ADD_ASSOCIATE_SUCCESS, props<{inputData : Associates}>())

export const updateAssociate = createAction(UPDATE_ASSOCIATE, props<{id: number}>())
export const updateAssociateSuccess = createAction(UPDATE_ASSOCIATE_SUCCESS, props<{object : Associates}>())

export const openPopup = createAction(OPEN_POPUP)

export const editAssociate = createAction(EDIT_ASSOCIATE, props<{inputData : Associates}>())
export const editAssociateSuccess = createAction(EDIT_ASSOCIATE_SUCCESS, props<{inputData : Associates}>())
