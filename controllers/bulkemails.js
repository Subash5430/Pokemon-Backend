const resend = require("../config/resend");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

exports.sendbulkmails = async (req, res) => {
    try {
        const contactlist = [];
        const csvPath = path.join(__dirname, "../controllers/contacts.csv");
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (row) => {
                contactlist.push(row);
            })
            .on("end", async () => {
                for (const contact of contactlist) {
                    try {
                        const response = await resend.emails.send({
                            from: "onboarding@resend.dev",
                            to: contact.email,
                            subject: "Welcome",
                            html: `
                                <h2>Hello ${contact.name}</h2>
                                <p><b>Email:</b> ${contact.email}</p>
                                <p><b>Number:</b> ${contact.number}</p>
                                <p><b>DOB:</b> ${contact.dob}</p>
                                <p><b>About:</b> ${contact.abt}</p> `
                        });
                        console.log(`Sent to ${contact.email}`, response.id);
                    } catch (err) {
                        console.error(
                            `Failed for ${contact.email}`,
                            err.message
                        );
                    }
                }
                res.status(200).json({
                    success: true,
                    message: `Sent emails to ${contactlist.length} contacts`
                });
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};