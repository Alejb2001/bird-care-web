export interface BirdSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  description: string;
  image: string;
  characteristics: {
    size: string;
    weight: string;
    lifespan: string;
    temperament: string[];
    colors: string[];
  };
  care: {
    dietBasic: string;
    dietDetails: string[];
    cageSize: string;
    temperature: string;
    humidity: string;
    socialNeeds: string;
  };
  health: {
    commonIssues: string[];
    preventiveCare: string[];
    veterinaryVisits: string;
  };
  breeding: {
    maturityAge: string;
    breedingSeason: string;
    clutchSize: string;
    incubationPeriod: string;
  };
  behavior: {
    vocalLevel: number; // 1-5 scale
    activityLevel: number; // 1-5 scale
    sociability: number; // 1-5 scale
    trainability: number; // 1-5 scale
    notes: string[];
  };
  habitat: {
    origin: string;
    naturalHabitat: string;
    cageRequirements: string[];
    enrichment: string[];
  };
  compatibility: {
    withOwnSpecies: string;
    withOtherSpecies: string;
    withChildren: string;
  };
  tips: string[];
}
