import { apexLinkBus, ApexFrame } from "./apexLink";

const summaries = new Map<string, string>();

export function getHealth(vin: string) {
  return summaries.get(vin) || "No data yet.";
}

apexLinkBus.subscribe((frame: ApexFrame) => {
  let summary = "No critical issues detected.";

  if (frame.dtcCodes?.length) {
    summary = `DTC detected: ${frame.dtcCodes.join(", ")}`;
  } else if (frame.coolantTemp && frame.coolantTemp > 110) {
    summary = "High coolant temperature.";
  } else if (frame.batteryVoltage && frame.batteryVoltage < 11.5) {
    summary = "Low battery voltage.";
  }

  summaries.set(frame.vin, summary);
});
