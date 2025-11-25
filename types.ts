
export enum ServiceType {
  CONSULTING = 'CONSULTING',
  MAILBOX = 'MAILBOX',
  RECEPTIONIST = 'RECEPTIONIST',
  LOGISTICS = 'LOGISTICS',
  VIRTUAL_LAB = 'VIRTUAL_LAB',
  NETWORKING = 'NETWORKING',
  TASK_MANAGER = 'TASK_MANAGER',
  NETWORK_INTELLIGENCE = 'NETWORK_INTELLIGENCE' // New Service
}

export interface BusinessGenome {
  industrySector: string;
  servicesOffered: string[];
  servicesNeeded: string[];
  targetMarkets: string[];
  companySize: 'Startup' | 'SME' | 'Enterprise';
  collaborationPreferences: string[];
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string; // Now uses keys like 'TECHNOLOGY', 'AVAILABLE'
  logoUrl: string;
  color: string;
  isOccupied: boolean;
  gridPosition: { x: number; y: number }; // Simplified grid coordinates
  activeVisitors?: number;
  services?: string[];
  genomeProfile?: BusinessGenome; // Added Genome Profile
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
}

export interface MatchAnalysisPoint {
  factor: string;
  description: string;
}

export interface MatchResult {
  companyId: string;
  score: number; // 0-100
  matchReason: string;
  sharedInterests: string[];
  collaborationOpportunity: string;
  analysisPoints?: MatchAnalysisPoint[]; // Detailed data points
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export interface NetworkingPost {
  id: string;
  author: string;
  content: string;
  tags: string[];
  likes: number;
}

export interface Invoice {
  id: string;
  planName: string;
  amount: string;
  date: Date;
  status: 'pending' | 'paid';
  reference: string;
}
