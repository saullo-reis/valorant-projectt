export async function getAgents() {
  const response = await fetch(
    "https://valorant-api.com/v1/agents/?language=pt-BR"
  );
  const json = await response.json();
  return await json;
}

