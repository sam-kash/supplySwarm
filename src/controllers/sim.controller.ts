import { Request, Response } from "express";
import { analyzeDisruption } from "../agents/analysis-orchestrator.agent";
import { AnalyzeApiResponse } from "../types/response.types";
import { isAppError } from "../utils/errors";
import { parseAnalyzeRequest } from "../utils/request-validation";

export const analyseSupplyChain = async (
  req: Request<object, AnalyzeApiResponse, unknown>,
  res: Response<AnalyzeApiResponse>
): Promise<void> => {
  try {
    const event = parseAnalyzeRequest(req.body);

    if (!event) {
      res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message:
            "Request body must include a supported type and non-empty node.",
        },
      });
      return;
    }

    const analysis = await analyzeDisruption(event);

    res.status(200).json(analysis);
  } catch (error) {
    if (isAppError(error)) {
      res.status(error.statusCode).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong while analyzing the disruption.",
      },
    });
  }
};
