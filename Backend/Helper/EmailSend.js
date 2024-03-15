import nodemailer from "nodemailer";

const sendEmail = async (data, req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'ecampus0822@gmail.com',
                pass: 'bcxipgvatqlnhdtx',
            },
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"E-Campus(ERP-Login)" <abc@gmail.com.com>', // sender address
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text: data.text, // plain text body
            html: data.html, // html body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        // You may want to handle the error accordingly, such as sending an error response if this function is called in an HTTP request context
    }
};

export default sendEmail;
