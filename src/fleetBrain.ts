import { getHealth } from "./aiMechanic";
import { getPrediction } from "./predictiveHealth";

export function getFleetHealth(vins: string[]) {
  return vins.map(vin => ({
    vin,
    health: getHealth(vin),
    risk: getPrediction(vin)
  }));
}
