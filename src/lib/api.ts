const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function sendChatMessage(message: { text: string }) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: message.text }),
  });
  if (!res.ok) throw new Error("Chat request failed");
  return res.json(); 
}

export async function requestPolicyGeneration(payload: {
  school: string;
  country: string;
  level: string;
  requirements?: string;
  scope?: string[];
}) {
  const res = await fetch(`${API_BASE}/generate-policy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Policy generation failed");
  return res.json();
}