import {render, screen} from "@testing-library/react";
import App from "../App.tsx";

test('testScheduleRendering', () => {
    render(<App/>);
    const scheduleTables = screen.queryAllByRole('table');
    expect(scheduleTables).toBeInTheDocument();
})

test('testScheduleType', () => {
    render(<App/>);
    const scheduleType = screen.queryByTestId('teacher')
    expect(scheduleType).not.toBeNull();
})