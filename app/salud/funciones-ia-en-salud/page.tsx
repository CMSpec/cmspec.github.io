import { EntryPage } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";

export default function HealthAIFunctionsPage() {
  const collection = getCollection("salud")!;
  return <EntryPage collection={collection} entry={getEntry("salud", "/salud/funciones-ia-en-salud")!} />;
}
