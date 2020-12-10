const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

class email {
    async clientContact({ body, email, senderEmail, subject, userType, _id, source }) {
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
Sender email: ${senderEmail}
Message: ${body}
Source: ${source}
${userInfo}`;

        const result = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'client@onkelananas.com',
                            Name: 'My Politic',
                        },
                        To: [
                            {
                                Email: 'client@onkelananas.com',
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
