import { EntryPage } from "../../_components/editorial";
import { getCollection, getEntry } from "../../../content/collections";

export default function DobbleAndProjectiveGeometryPage() {
  const collection = getCollection("investigacion")!;
  return <EntryPage collection={collection} entry={getEntry("investigacion", "/investigacion/dobble-y-geometria-proyectiva")!} />;
}
