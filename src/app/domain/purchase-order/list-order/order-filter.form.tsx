import { useOrderFilterContext } from "./order.filter.context";

export function OrderFilterForm() {
  const {
    categorySelectionElement,
    statusSelectionElement,
    reviewerSelectionElement,
    reportFilterElements,
  } = useOrderFilterContext();

  return (
    <div>
      <h2>Filters</h2>
      <p className="mb-4">
        Select the following filters you want to apply to the current table.
      </p>
      <div className="mb-4">{categorySelectionElement}</div>
      <div className="mb-4">{statusSelectionElement}</div>

      <div className="mb-4">{reviewerSelectionElement}</div>
      <p className="hint relative top-[-8px]">
        When selecting reviewer, it might ignore other filters.
      </p>
      
      {reportFilterElements}
    </div>
  );
}
