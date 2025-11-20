import { useOutletContext } from "react-router-dom";
import PendingStage from "./PendingStage";

export default function PendingPage() {
  const { submission } = useOutletContext();

  return <PendingStage submission={submission} />;
}
