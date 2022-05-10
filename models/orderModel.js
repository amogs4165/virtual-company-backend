import mongoose from "mongoose";

const orderRequestSchema = mongoose.Schema({
    data:{
        type: String,
        required: true,
    },
    companyId:{
        type:String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    dueData:{
        type: String,
        required: true,
    },
    isAccepted:{
        type: Boolean,
        required: true,
        default: false,
    }
})

const orderConfirmSchema = mongoose.Schema({
    orderId:{
        type: String,
        required: true,
    },
    companyId:{
        type:String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false,
    },
    isPaidToCompany:{
        type: Boolean,
        required: true,
        default: false,
    }

})

export const OrderRequest = mongoose.model("orderRequest",orderRequestSchema)
export const OrderConfirm = mongoose.model("orderConfirm",orderConfirmSchema)