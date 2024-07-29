import mongoose, {Document, Schema, Types} from "mongoose";
import {type} from "node:os";






/**
 *
 * Modelling the database document for
 *
 */


export interface IExpense extends Document {
    _id: mongoose.Types.ObjectId;
    amount: number;
    description: string;
    nos: number;
    isEqual: boolean;
    isPercentage: boolean;
    isExact: boolean;
    ids: Types.Array<Types.Array<string>>
}

const expenseSchema = new Schema<IExpense>(
    {
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        nos: {
            type: Number,
            required: true,
        },
        isEqual: {
            type: Boolean,
            required: true,
        },
        isPercentage: {
            type: Boolean,
            required: true,
        },
        isExact: {
            type: Boolean,
            required: true,
        },
        ids: {
            type: [[String]],
            required: true,
        }
    },
    { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;
