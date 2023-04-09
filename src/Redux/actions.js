import { INCREMENT_SCORE, RESET_SCORE } from "./constants";

export const incrementScore = () => ({
  type: INCREMENT_SCORE,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
