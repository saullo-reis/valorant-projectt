export interface AgentsType {
  displayIcon: string;
  displayIconSmall: string;
  displayName: string;
  isPlayableCharacter: boolean;
  uuid: string;
}

export interface AgentTypes {
  abilities: Array<{
    description: string;
    displayIcon: string;
    displayName: string;
  }>;
  background: string;
  displayName: string;
  fullPortrait: string;
  role: {
    description: string;
    displayIcon: string;
    displayName: string;
  };
}
