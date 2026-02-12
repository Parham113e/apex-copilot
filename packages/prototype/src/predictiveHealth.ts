import { apexLinkBus, ApexFrame } from "./apexLink";

const predictions = new Map<string, number>();

export function getPrediction(vin: string) {
  return predictions.get(vin) ?? 0;
}

apexLinkBus.subscribe((frame: ApexFrame) => {
  let risk = 0;

  if (frame.coolantTemp && frame.coolantTemp > 110) risk += 40;
  if (frame.batteryVoltage && frame.batteryVoltage < 11.5) risk += 30;
  if (frame.dtcCodes?.length) risk += 50;

  predictions.set(frame.vin, Math.min(risk, 100));
});
