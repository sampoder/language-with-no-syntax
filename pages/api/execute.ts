import { NextApiRequest, NextApiResponse } from "next";
import piston from "piston-client";

export default async function handler(
		req: NextApiRequest,
		res: NextApiResponse
) {
	console.log(`
Turn the pseudocode below into Python. Respond with nothing but pure python code.

\`\`\`
${JSON.parse(req.body).input}
\`\`\`
`)
	let response = await fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.token}`
		},
	
		body: JSON.stringify({
			'model': 'gpt-3.5-turbo',
			'messages': [
				{
					'role': 'user',
					'content': `

Turn the pseudocode below into Python. Respond with nothing but pure python code.

\`\`\`
${JSON.parse(req.body).input}
\`\`\`
					
					`
				}
			],
		})
	}).then(r => r.json())
	const client = piston({ server: "https://emkc.org" });
	const result = await client.execute('python', response.choices[0].message.content);
	res.json({result: result.run.stdout})
}