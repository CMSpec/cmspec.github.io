import { EntryPage } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";

export default function QuestionsAndModelsPage() {
  const collection = getCollection("investigacion")!;
  return <EntryPage collection={collection} entry={getEntry("investigacion", "/investigacion/preguntas-y-modelos")!} />;
}
