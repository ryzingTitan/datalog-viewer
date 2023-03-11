export default interface Datalog {
  sessionId: string;
  timestamp: string;
  longitude: number;
  latitude: number;
  altitude: number;
  intakeAirTemperature: number;
  boostPressure: number;
  coolantTemperature: number;
  engineRpm: number;
  speed: number;
  throttlePosition: number;
}
