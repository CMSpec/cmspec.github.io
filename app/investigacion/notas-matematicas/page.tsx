import { EntryPage } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";

export default function MathNotesPage() {
  const collection = getCollection("investigacion")!;
  return <EntryPage collection={collection} entry={getEntry("investigacion", "/investigacion/notas-matematicas")!} />;
}
