// src/pages/participant/submissionFlow/PendingStep.jsx
import { useOutletContext } from "react-router-dom";
import PendingStage from "./stages/pending/PendingStage";

export default function PendingStep() {
  const { submission } = useOutletContext();

  return <PendingStage submission={submission} />;
}
