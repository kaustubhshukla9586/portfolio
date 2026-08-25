import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const formattedMessage = message.replace(/\n/g, '<br/>');
  const timestamp = new Date().toISOString();

  const htmlTemplate = `
    <div style="background-color: #0a0a0a; color: #f2dfd3; font-family: Helvetica, Arial, sans-serif; padding: 40px 20px; margin: 0; width: 100%; box-sizing: border-box;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a;">
        
        <!-- Header -->
        <div style="border-top: 1px solid rgba(242, 223, 211, 0.2); border-bottom: 1px solid rgba(242, 223, 211, 0.2); padding: 20px 0; margin-bottom: 40px; width: 100%;">
          <div style="color: #ffb77d; font-family: Courier, 'Courier New', monospace; font-size: 14px; letter-spacing: 2px; margin: 0; font-weight: bold; text-transform: uppercase;">
            // NEW TRANSMISSION SECURED
          </div>
        </div>

        <!-- Sender Metadata (Grid/Table) -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 0px; border-bottom: 1px solid rgba(242, 223, 211, 0.2); padding-bottom: 40px;">
          <tr>
            <td width="120" style="font-family: Courier, 'Courier New', monospace; font-size: 14px; color: rgba(242, 223, 211, 0.5); padding: 8px 0; vertical-align: top;">
              SENDER:
            </td>
            <td style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; color: #f2dfd3; font-weight: bold; padding: 8px 0; vertical-align: top;">
              ${name}
            </td>
          </tr>
          <tr>
            <td width="120" style="font-family: Courier, 'Courier New', monospace; font-size: 14px; color: rgba(242, 223, 211, 0.5); padding: 8px 0; vertical-align: top;">
              REPLY-TO:
            </td>
            <td style="font-family: Helvetica, Arial, sans-serif; font-size: 16px; color: #f2dfd3; font-weight: bold; padding: 8px 0; vertical-align: top;">
              ${email}
            </td>
          </tr>
        </table>

        <!-- Message Block -->
        <div style="padding: 40px 0; margin: 0;">
          <div style="font-family: Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.6; color: #f2dfd3; margin: 0;">
            ${formattedMessage}
          </div>
        </div>

        <!-- Footer -->
        <div style="padding-top: 40px; margin-top: 20px;">
          <div style="font-family: Courier, 'Courier New', monospace; font-size: 12px; color: rgba(242, 223, 211, 0.4); margin: 0; text-transform: uppercase;">
            SYSTEM: PORTFOLIO_V1 // ${timestamp}
          </div>
        </div>

      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['kaustubh.work77@gmail.com'],
      subject: \`[PORTFOLIO] New message from \${name}\`,
      text: \`Name: \${name}\\nEmail: \${email}\\nMessage: \${message}\`,
      html: htmlTemplate,
    });

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
