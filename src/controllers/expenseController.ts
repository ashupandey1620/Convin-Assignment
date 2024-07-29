
import { Request, Response } from "express";

import UserModel from "../models/userModel";

import { createObjectCsvWriter } from 'csv-writer';
import ExpenseModel from "../models/expenseModel";
import * as fs from "fs";
import ExcelJS from 'exceljs';


/**
 *
 * It provides the profile of the user who made a request to the server
 * it provides the profile on the basis of the header authorization
 *
 */

const getUserProfile = async (req: Request, res: Response) => {
    const user = req.userId;
    try{
        const profile=await UserModel.find({ _id: user });
        res.status(200).json({
            "profile":"User Profile fetched Successfully",
            "properties":profile,
            "status":"success"
        });
    }
    catch(error){
        res.status(500).json({message: error});
    }
}





/**
 *
 * ADD CANDIDATE CONTROLLER is used to add a candidate in the database
 * Candidate is added with respect to its owner
 *
 */

const addExpense = async (req: Request, res: Response) => {

    const userId = req.userId;
    console.log(`User is ${userId}`);

    const {
        amount,
        description,
        nos,
        isEqual,
        isPercentage,
        isExact,
        ids
    } = req.body;


    if (isEqual) {

        if (!Array.isArray(ids) || !ids.every(innerList => Array.isArray(innerList) && innerList.length === 2 && innerList.every(item => typeof item === 'string'))) {
            return res.status(400).json({ message: 'Invalid ids format when isEqual is true' });
        }


        let phoneNumberFound = false;
        for (const innerList of ids) {
            if (innerList.length === 2 && typeof innerList[0] === 'string') {
                // Add amount/nos as the second string in the inner list
                const temp = amount/nos;
                innerList[1] = `${temp}`;
                phoneNumberFound = true;
                break;
            }
        }

        if (!phoneNumberFound) {
            return res.status(400).json({ message: 'No phone number found in ids' });
        }
    }


    try {
        console.log("Entered the try block");
        const expense = new ExpenseModel({
            amount,
            description,
            nos,
            isEqual,
            isPercentage,
            isExact,
            ids
        });

        console.log(expense);

        await expense.save();

        res.status(201).json({
            "message":"Expense Added successfully",
            "status":"success"
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


const getExpense = async (req: Request, res: Response) => {
    const user = req.userId;

    try{

        const userId = await UserModel.findById(user);
        if (!userId) {
            return res.status(404).json({
                message: "User not found",
                status: "error"
            });
        }

        const phoneNumber = userId.phone;

        const expense = await ExpenseModel.find({
            ids: {
                $elemMatch: { $elemMatch: { $eq: phoneNumber } }
            }
        });

        // const expense=await ExpenseModel.find({ _id: user });
        res.status(200).json({
            "message":"All Expenses fetched Successfully",
            "properties":expense,
            "status":"success"
        });
    }
    catch(error){
        res.status(500).json({message: error});
    }
}



const getAllExpense = async (req: Request, res: Response) => {
    const user = req.userId;

    try {
        // Find all expense documents
        const expenses = await ExpenseModel.find();

        res.status(200).json({
            message: "All Expenses fetched Successfully",
            properties: expenses,
            status: "success"
        });
    } catch (error) {
        res.status(500).json({message: error});
    }

}


interface Expense {
    amount: number;
    description: string;
    nos: number;
    isPercentage:boolean;
    isExact:boolean;
    id: string[][]
}




const generateCSV = async (data: any[], fileName: string, res: Response) => {
    const csvWriter = createObjectCsvWriter({
        path: fileName,
        header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(data);

    res.download(fileName, () => {
        // Optionally delete the file after sending
        fs.unlinkSync(fileName);
    });
};


const getIndividualUserExpenseCSV = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const phoneNumber = user.phone;

        const expenses = await ExpenseModel.find({
            ids: {
                $elemMatch: { $elemMatch: { $eq: phoneNumber } }
            }
        });

        // Generate CSV
        const fileName = 'individual_user_expense.csv';
        await generateCSV(expenses.map(expense => expense.toObject()), fileName, res);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

const getAllUserExpenseCSV = async (req: Request, res: Response) => {
    try {
        const expenses = await ExpenseModel.find();

        const fileName = 'all_user_expense.csv';
        await generateCSV(expenses.map(expense => expense.toObject()), fileName, res);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


const generateExcel = async (data: any[], fileName: string, res: Response) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Expenses');

    worksheet.addRow(Object.keys(data[0]));

    data.forEach(row => worksheet.addRow(Object.values(row)));

    await workbook.xlsx.writeFile(fileName);

    res.download(fileName, () => {
        fs.unlinkSync(fileName);
    });
};

const getIndividualExpenseExcel = async (req: Request, res: Response) => {

    const userId = req.userId;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const phoneNumber = user.phone;

        const expenses = await ExpenseModel.find({
            ids: {
                $elemMatch: { $elemMatch: { $eq: phoneNumber } }
            }
        });


        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found' });
        }

        const fileName = 'all_user_expense.xlsx';
        await generateExcel(expenses.map(expense => expense.toObject()), fileName, res);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

const getAllUserExpenseExcel = async (req: Request, res: Response) => {
    try {
        const expenses = await ExpenseModel.find() as any[];

        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: 'No expenses found' });
        }

        const fileName = 'all_user_expense.xlsx';
        await generateExcel(expenses.map(expense => expense.toObject()), fileName, res);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


export default {
    getUserProfile,
    addExpense,
    getExpense,
    getAllExpense,
    getIndividualUserExpenseCSV,
    getAllUserExpenseCSV,
    getAllUserExpenseExcel
};