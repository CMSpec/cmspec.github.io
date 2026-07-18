import { CollectionPage } from "../_components/editorial";
import { getCollection } from "../../content/collections";

export default function HealthPage() {
  return <CollectionPage collection={getCollection("salud")!} />;
}
