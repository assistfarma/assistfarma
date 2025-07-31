import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AssistFarma() {
  const [input, setInput] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  async function analisarQueixa() {
    if (!input.trim()) return;
    setLoading(true);
    setResposta("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: input }),
      });

      const data = await response.json();
      setResposta(data.resultado);
    } catch (error) {
      setResposta("❌ Erro ao consultar a inteligência do AssistFarma. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AssistFarma 💊</h1>
      <p className="text-sm mb-4 text-gray-600">Digite a queixa ou situação clínica do cliente e receba uma sugestão de atendimento inteligente.</p>
      <Card>
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="Ex: Cliente com uso de diurético e câimbras noturnas"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={analisarQueixa} disabled={loading}>
            {loading ? "Analisando..." : "Analisar"}
          </Button>
          {resposta && (
            <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">
              {resposta}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}