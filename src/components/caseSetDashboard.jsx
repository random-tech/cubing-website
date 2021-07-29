import React from "react";
import { Button } from "react-bootstrap";
import ollCaseSet from "../data/ollCaseSet";
import pllCaseSet from "../data/pllCaseSet";
import useLocalStorage from "../hooks/useLocalStorage";
import SelectCaseSet from "./selectCaseSet";
import useCaseSetTable from "./caseSetTable";
import { withRouter } from "react-router-dom";
import _ from "lodash";

function CaseSetDashboard(props) {
  const [selectedCaseSetId, setSelectedCaseSetId] = useLocalStorage(
    "selectedCaseSetId",
    null
  );
  const caseSets = [ollCaseSet, pllCaseSet];
  const selectedCaseSet = _(caseSets).find(["details.id", selectedCaseSetId]);
  const [renderTable, selectedCases] = useCaseSetTable(selectedCaseSet);
  console.log(selectedCases);

  return (
    <div>
      {!selectedCaseSetId && (
        <SelectCaseSet caseSets={caseSets} onClick={setSelectedCaseSetId} />
      )}
      {selectedCaseSetId && (
        <div>
          <Button
            onClick={() => setSelectedCaseSetId(null)}
            className="m-1"
            variant="secondary"
          >
            <i className="fa fa-chevron-left" aria-hidden="true"></i> Back to
            CaseSet Selection
          </Button>
          {selectedCases.length > 0 && (
            <div>
              <Button
                onClick={() => props.history.push("/train/learn")}
                className="m-1"
                variant="info"
              >
                Learn <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </Button>
              <Button
                onClick={() => props.history.push("/train/test")}
                className="m-1"
                variant="success"
              >
                Test <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </Button>
            </div>
          )}

          {renderTable()}
        </div>
      )}
    </div>
  );
}

export default withRouter(CaseSetDashboard);
