import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaIcon } from "../fontAwesome";
import _ from "lodash";
import BackButton from "./common/backButton";
import useLocalStorage from "../hooks/useLocalStorage";
import CaseSetsContext from "../hooks/useCaseSets";
import SelectCaseSet from "./selectCaseSet";
import CaseSetTable from "./caseSetTable";

function CaseSetDashboard(props) {
  const [selectedCaseSetId, setSelectedCaseSetId] = useLocalStorage(
    "selectedCaseSetId",
    null
  );

  const caseSets = useContext(CaseSetsContext);
  const selectedCaseSet = _(caseSets).find(["details.id", selectedCaseSetId]);
  const [selectedCases, setSelectedCases] = useState([]);

  useEffect(() => {
    props.setSelectedCases(selectedCases);
    if (selectedCaseSet !== undefined) {
      props.setCaseSetDetails(selectedCaseSet.details);
    }
  }, [selectedCases]);

  const { onTest, onLearn } = props;
  const initData = selectedCaseSet?.cases.map((c) => ({
    ...c,
    alg: c.algs[0],
  }));

  return (
    caseSets && (
      <>
        {!selectedCaseSetId && (
          <SelectCaseSet caseSets={caseSets} onClick={setSelectedCaseSetId} />
        )}
        {selectedCaseSetId && (
          <>
            <Row>
              <Col className="p-0">
                <BackButton onClick={() => setSelectedCaseSetId(null)} />
              </Col>
              <Col className="justify-content-end d-flex p-0">
                <Button
                  onClick={onLearn}
                  className="m-1"
                  variant="info"
                  disabled={selectedCases.length === 0}
                >
                  Learn <FaIcon icon="chevron-right" />
                </Button>
                <Button
                  onClick={onTest}
                  className="m-1"
                  variant="success"
                  disabled={selectedCases.length < 2}
                >
                  Test <FaIcon icon="chevron-right" />
                </Button>
              </Col>
            </Row>
            <CaseSetTable
              initData={initData}
              caseSet={selectedCaseSet}
              setSelectedCases={setSelectedCases}
            />
          </>
        )}
      </>
    )
  );
}

export default CaseSetDashboard;
