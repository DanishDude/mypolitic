const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

class email {
    async clientContact({ body, email, name, senderEmail, source, subject, userType, _id }) {
        if (!senderEmail && (!body || !subject)) {
            return false;
        }

        const userInfo = _id
            ? `
User Email: ${email}
User type: ${userType}
User ID: ${_id}`
            : '';

        const text = `
${body}

Sender email: ${senderEmail}
Name: ${name}
Source: ${source}
${userInfo}`;

        const result = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.CLIENT_EMAIL_SENDER,
                            Name: `[MP] ${name}`,
                        },
                        To: [
                            {
                                Email: process.env.CLIENT_EMAIL_RECEIVER,
                            },
                        ],
                        Subject: `${subject}`,
                        TextPart: text,
                        // - - Alternative to TextPart - - //
                        // HTMLPart: `
                        //     <h3>Sender Email: </h5><p>${senderEmail}</p>
                        //     <h3>Message: </h5><p>${body}</p><br />
                        //     ${userInfo}`,
                        // CustomID: 'AppGettingStartedTest',
                    },
                ],
            })
            .then((result) => {
                if (result.body.Messages[0].Status === 'success') {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((err) => {
                next(err);
            });
        return result;
    }
}

module.exports = new email();
