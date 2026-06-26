export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export interface Service {
  number: string;
  name: string;
  description: string;
  keywords: string;
}

export interface Project {
  name: string;
  category: string;
  description: string;
  stack: string[];
}

export interface QuoteService {
  name: string;
  description: string;
  price: number;
}

export interface Quote {
  isQuote: true;
  projectTitle: string;
  summary: string;
  services: QuoteService[];
  timeline: string;
  totalMin: number;
  totalMax: number;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  quote?: Quote | null;
}
