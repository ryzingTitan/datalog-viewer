import { fireEvent, render, screen } from "@testing-library/react";
import TrackMapButtons from "./TrackMapButtons";
import TrackMapButtonsProps from "./TrackMapButtonsProps";

describe("TrackMapButtonsComponent", () => {
  let props = {} as TrackMapButtonsProps;

  beforeEach(() => {
    props.playSpeed = 1;
    props.setIsPlaying = jest.fn();
    props.setPlaySpeed = jest.fn();
    props.setCurrentIndex = jest.fn();
  });

  it("should render track map buttons with the correct values", () => {
    render(
      <TrackMapButtons
        playSpeed={props.playSpeed}
        setCurrentIndex={props.setCurrentIndex}
        setIsPlaying={props.setIsPlaying}
        setPlaySpeed={props.setPlaySpeed}
      />,
    );

    expect(screen.getByTitle("RestartButton")).toBeInTheDocument();
    expect(screen.getByTitle("PauseButton")).toBeInTheDocument();
    expect(screen.getByTitle("PlayButton")).toBeInTheDocument();
    expect(screen.getByText("1x")).toBeInTheDocument();
  });

  it("should restart session when the Restart button is clicked", () => {
    render(
      <TrackMapButtons
        playSpeed={props.playSpeed}
        setCurrentIndex={props.setCurrentIndex}
        setIsPlaying={props.setIsPlaying}
        setPlaySpeed={props.setPlaySpeed}
      />,
    );

    fireEvent.click(screen.getByTitle("RestartButton"));

    expect(props.setCurrentIndex).toHaveBeenCalledWith(0);
  });

  it("should play session when the Play button is clicked", () => {
    render(
      <TrackMapButtons
        playSpeed={props.playSpeed}
        setCurrentIndex={props.setCurrentIndex}
        setIsPlaying={props.setIsPlaying}
        setPlaySpeed={props.setPlaySpeed}
      />,
    );

    fireEvent.click(screen.getByTitle("PlayButton"));

    expect(props.setIsPlaying).toHaveBeenCalledWith(true);
  });

  it("should pause session when the Pause button is clicked", () => {
    render(
      <TrackMapButtons
        playSpeed={props.playSpeed}
        setCurrentIndex={props.setCurrentIndex}
        setIsPlaying={props.setIsPlaying}
        setPlaySpeed={props.setPlaySpeed}
      />,
    );

    fireEvent.click(screen.getByTitle("PauseButton"));

    expect(props.setIsPlaying).toHaveBeenCalledWith(false);
  });

  it("should set play speed when a new play speed is selected", () => {
    render(
      <TrackMapButtons
        playSpeed={props.playSpeed}
        setCurrentIndex={props.setCurrentIndex}
        setIsPlaying={props.setIsPlaying}
        setPlaySpeed={props.setPlaySpeed}
      />,
    );

    fireEvent.mouseDown(screen.getByText("1x"));
    fireEvent.click(screen.getAllByRole("option")[3]);

    expect(props.setPlaySpeed).toHaveBeenCalledWith(4);
    expect(screen.getByText("4x")).toBeInTheDocument();
  });
});
