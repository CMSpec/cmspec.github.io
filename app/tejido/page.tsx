import { CollectionPage } from "../_components/editorial";
import { getCollection } from "../../content/collections";

export default function KnittingPage() {
  return <CollectionPage collection={getCollection("tejido")!} />;
}
