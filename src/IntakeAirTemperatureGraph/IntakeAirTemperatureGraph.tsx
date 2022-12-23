import { ReactElement } from "react";
import IntakeAirTemperatureProps from "./IntakeAirTemperatureProps";

export default function IntakeAirTemperatureGraph(intakeAirTemperatureProps: IntakeAirTemperatureProps): ReactElement {

    return(
        <p>{intakeAirTemperatureProps.datalogs.length}</p>
    )
}