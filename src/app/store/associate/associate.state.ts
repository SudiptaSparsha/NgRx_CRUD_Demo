import { AssociateModel } from "../model/associate.model";

export const associateState : AssociateModel = {
    list : [],
    associateObject : {
        id: 0,
        name: "",
        email: "",
        phone: "",
        type: "Customer",
        address: "",
        associateGroup: "level_1",
        status: true
    },
    errorMessage : ''

}