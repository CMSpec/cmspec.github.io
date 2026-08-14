import { EntryPage } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";

export default function HumanInTheLoopPage() {
  const collection = getCollection("salud")!;
  return <EntryPage collection={collection} entry={getEntry("salud", "/salud/human-in-the-loop")!} />;
}
