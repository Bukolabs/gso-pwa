import { useUserIdentity } from "@core/utility/user-identity.hook";
import { useRequestFilterContext } from "./request-filter.context";

export function RequestFilterForm() {
  const { isRequestor } = useUserIdentity();
  const {
    departmentSelectionElement,
    categorySelectionElement,
    statusSelectionElement,
    reviewerSelectionElement,
  } = useRequestFilterContext();

  return (
    <div>
      <h2>Filters</h2>
      <p className="mb-4">
        Select the following filters you want to apply to the current table.
      </p>
      {!isRequestor ? (
        <div className="mb-4">{departmentSelectionElement}</div>
      ) : (
        <></>
      )}
      <div className="mb-4">{categorySelectionElement}</div>
      <div className="mb-4">{statusSelectionElement}</div>

      <div className="mb-4">{reviewerSelectionElement}</div>
      <p className="hint relative top-[-8px]">
        When selecting reviewer, it might ignore other filters.
      </p>
    </div>
  );
}
