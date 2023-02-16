export async function getAgents() {
  const response = await fetch(
    "https://valorant-api.com/v1/agents/?language=pt-BR"
  );
  const json = await response.json();
  return await json;
}

export async function getAgent(id: string) {
  const response = await fetch(
    `https://valorant-api.com/v1/agents/${id}?language=pt-BR`
  );
  const json = await response.json()
  return await json 
}