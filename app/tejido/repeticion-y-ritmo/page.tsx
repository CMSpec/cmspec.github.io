import { EntryPage } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";

export default function RepetitionAndRhythmPage() {
  const collection = getCollection("tejido")!;
  return <EntryPage collection={collection} entry={getEntry("tejido", "/tejido/repeticion-y-ritmo")!} />;
}
