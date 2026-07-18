import { TimelineStep } from "./timeline";
import {
  ImpactedComponentWithInventory,
  RecoveryRecommendation,
  RiskLevel,
} from "./domain.types";
import { SupplyChainEvent } from "./event";

export interface ImpactAnalysis {
  disruptedNode: string;
  affectedComponents: ImpactedComponentWithInventory[];
  affectedProducts: string[];
  estimatedDelayDays: number;
  riskLevel: RiskLevel;
}

export interface AnalysisResponse {
  success: true;
  event: SupplyChainEvent;
  timeline: TimelineStep[];
  impact: ImpactAnalysis;
  recommendation: RecoveryRecommendation;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type AnalyzeApiResponse = AnalysisResponse | ErrorResponse;
