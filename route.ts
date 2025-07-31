
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const mensagem = body.mensagem || "";

  const prompt = `
Você é um assistente farmacêutico chamado AssistFarma. Dado o seguinte relato de um cliente, sugira:
- Medicamentos isentos de prescrição (MIPs)
- Nutracêuticos adequados
- Associações possíveis
- Cuidados ou contraindicações importantes
- Formate em tópicos organizados

Relato do cliente:
"${mensagem}"
`;

  const resposta = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Você é um assistente farmacêutico inteligente e ético." },
      { role: "user", content: prompt },
    ],
    temperature: 0.6,
    max_tokens: 600,
  });

  const resultado = resposta.choices[0].message.content;

  return NextResponse.json({ resultado });
}
