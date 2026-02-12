import { EventBus } from "./eventBus";

export interface ApexFrame {
  vin: string;
  timestamp: number;
  speed?: number;
  rpm?: number;
  coolantTemp?: number;
  fuelLevel?: number;
  batteryVoltage?: number;
  dtcCodes?: string[];
}

export const apexLinkBus = new EventBus<ApexFrame>();

export function ingest(raw: any) {
  const frame: ApexFrame = {
    vin: raw.vin || "UNKNOWN",
    timestamp: Date.now(),
    speed: raw.speed ?? raw.vehicleSpeed,
    rpm: raw.rpm ?? raw.engineRPM,
    coolantTemp: raw.coolantTemp ?? raw.temp,
    fuelLevel: raw.fuelLevel ?? raw.fuel,
    batteryVoltage: raw.batteryVoltage ?? raw.voltage,
    dtcCodes: raw.dtc || []
  };

  apexLinkBus.publish(frame);
}
