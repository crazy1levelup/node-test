const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "eduard.trif@icould.com",
        subject: "Yhanks for joining in",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendAccountCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "eduard.trif@icould.com",
        subject: "y u leaving",
        text: `${name}.but t tho?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendAccountCancelationEmail
};