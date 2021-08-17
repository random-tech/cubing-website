import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaIcon } from "../fontAwesome";
import _ from "lodash";
import useLocalStorage from "../hooks/useLocalStorage";
import useDarkMode from "../hooks/useDarkMode";
import ollCaseSet from "../data/ollCaseSet";
import pllCaseSet from "../data/pllCaseSet";
import eollCaseSet from "../data/eollCaseSet";
import ocllCaseSet from "../data/ocllCaseSet";
import epllCaseSet from "../data/epllCaseSet";
import cpllCaseSet from "../data/cpllCaseSet";
import SelectCaseSet from "./selectCaseSet";
import CaseSetTable from "./caseSetTable";

function CaseSetDashboard(props) {
  const [darkMode] = useDarkMode();
  const [selectedCaseSetId, setSelectedCaseSetId] = useLocalStorage(
    "selectedCaseSetId",
    null
  );

  const caseSets = [
    eollCaseSet,
    ocllCaseSet,
    cpllCaseSet,
    epllCaseSet,
    pllCaseSet,
    ollCaseSet,
  ];
  const selectedCaseSet = _(caseSets).find(["details.id", selectedCaseSetId]);
  const [selectedCases, setSelectedCases] = useState([]);

  useEffect(() => {
    props.setSelectedCases(selectedCases);
    if (selectedCaseSet !== undefined) {
      props.setCaseSetDetails(selectedCaseSet.details);
    }
  }, [selectedCases]);

  const { onTest, onLearn } = props;

  return (
    <>
      {!selectedCaseSetId && (
        <SelectCaseSet caseSets={caseSets} onClick={setSelectedCaseSetId} />
      )}
      {selectedCaseSetId && (
        <>
          <Row>
            <Col className="p-0">
              <Button
                onClick={() => setSelectedCaseSetId(null)}
                className="m-1"
                variant={darkMode ? "dark" : "secondary"}
              >
                <FaIcon icon="chevron-left" /> Back to CaseSet Selection
              </Button>
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
            caseSet={selectedCaseSet}
            setSelectedCases={setSelectedCases}
          />
        </>
      )}
    </>
  );
}

export default CaseSetDashboard;
