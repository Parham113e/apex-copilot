import express from "express";
import bodyParser from "body-parser";
import { ingest } from "./apexLink";
import { getHealth } from "./aiMechanic";
import { getPrediction } from "./predictiveHealth";
import { getFleetHealth } from "./fleetBrain";

export function startApi(port: number) {
  const app = express();
  app.use(bodyParser.json());

  app.post("/ingest/:source", (req, res) => {
    ingest(req.body);
    res.json({ status: "accepted" });
  });

  app.get("/vehicles/:vin/health", (req, res) => {
    res.json({ vin: req.params.vin, summary: getHealth(req.params.vin) });
  });

  app.get("/vehicles/:vin/predictions", (req, res) => {
    res.json({ vin: req.params.vin, risk: getPrediction(req.params.vin) });
  });

  app.get("/fleet/:id/health", (req, res) => {
    const vins = ["1ABC123", "2XYZ789"];
    res.json(getFleetHealth(vins));
  });

  app.listen(port, () => console.log(`Prototype API running on ${port}`));
}
