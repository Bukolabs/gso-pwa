import { useMonitorFilterContext } from "./list-monitor-filter.context";

export function ListMonitorFilterForm() {
  const {
    statusSelectionElement,
    reportFilterElements,
    departmentSelectionElement,
  } = useMonitorFilterContext();

  return (
    <div>
      <h2>Filters</h2>
      <p className="mb-4">
        Select the following filters you want to apply to the current table.
      </p>

      <div className="mb-4">{statusSelectionElement}</div>

      {departmentSelectionElement}
      {reportFilterElements}
    </div>
  );
}
