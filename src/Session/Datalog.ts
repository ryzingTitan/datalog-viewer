export default interface Datalog {
  sessionId: string;
  timestamp: string;
  intakeAirTemperature: number;
  boostPressure: number;
  coolantTemperature: number;
  engineRpm: number;
  speed: number;
  throttlePosition: number;
}
