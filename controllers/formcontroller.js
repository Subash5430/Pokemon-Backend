const express=require('express')
const resend = require("../config/resend");
const sheets = require("../config/googlesheets");


require("dotenv").config();

exports.sendemail=async(req,res)=>{
    try{
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SHEET_ID,
            range: "Sheet1!A:E",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    req.body.name,
                    req.body.email,
                    req.body.dob,
                    req.body.number
                ]]
            }
        });

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.ADMIN,
        subject: "New Form Submission",
        html: `One user usbmitted the form. 
                <h1>Name: ${req.body.name}</h1>
                <h1>Email: ${req.body.email}</h1>
                <h1>Number: ${req.body.number}</h1>
                <h1>Date of Birth: ${req.body.dob}</h1>`,
        
    });

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: req.body.email,
        subject: "Successfully submitted the form",
        html: `<p>${req.body.name}, your submission has been recorded<p>`,
    });
    res.status(200).json({
            success: true,
            message: "Form submitted successfully"
        });
    }
    catch(err){
        res.status(400).json({
            message:err.message,
            err
        })
    }
    
}