// src/pages/participant/submissionFlow/EvaluatedStep.jsx
import { useOutletContext } from "react-router-dom";
import EvaluatedStage from "./stages/evaluated/EvaluatedStage";

export default function EvaluatedStep() {
  const { submission } = useOutletContext();
  return <EvaluatedStage submission={submission} />;
}
