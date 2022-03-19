import path from 'path';
import ejs from 'ejs';
import sgMail from '@sendgrid/mail';
import config from '../constants/app-config';

const buildMailTemplate = (templateName, params) => {
  const templateDir = `templates/${templateName}.ejs`;
  const template = path.join(__dirname, templateDir);

  return ejs
    .renderFile(template, params)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const emailService = {
  sendMail: async (to, subject, templateName, params) => {
    sgMail.setApiKey(config.sendGrid.apiKey);
    const templateMail = await buildMailTemplate(templateName, params);

    const msg = {
      to: to,
      from: {
        email: config.mail.senderEmail,
        name: config.mail.senderName
      },
      subject: subject,
      html: templateMail
    };

    return sgMail
      .send(msg)
      .then(() => {
        console.log('Mail sent');
      })
      .catch((error) => {
        console.error(error);
        throw new Error(error);
      });
  }
};

export default emailService;
