import { CollectionPage } from "../_components/editorial";
import { getCollection } from "../../content/collections";

export default function ResearchPage() {
  return <CollectionPage collection={getCollection("investigacion")!} />;
}
