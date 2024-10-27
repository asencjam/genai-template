const { AzureOpenAI } = require("openai");

// You will need to set these environment variables or edit the following values
const endpoint = "https://atcp-genai-hackathon-002.openai.azure.com/";
const apiKey = "1445a1639d4c4a0c81fcf99728331bcd";
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-35-turbo"; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.

export async function sendMsgToOpenAI(message) {

  const prompt = message;

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });

  const result = await client.completions.create({ prompt, model: deployment, max_tokens: 128 });

  for (const choice of result.choices) {
    console.log(choice.text);
  }

  return result.choices[0].text;
}

//----- AZURE  OpenAI 
export async function sendMsgToOpenAI_Chat(message, fileContent) {

  const prompt = [
    { role: "system", content: "You are an expert real estate agent who specializes in condominiums." },
    { role: "user", content: fileContent !== '' ? (message + 'from this content --- ' + fileContent + "---") : message },
  ];
  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });
  const result = await client.chat.completions.create({
    messages: prompt,
    model: deployment,
  });

  console.log('---- results ----');
  for (const choice of result.choices) {
    console.log(choice.message);
  }

  return result.choices[0].message.content;
}
