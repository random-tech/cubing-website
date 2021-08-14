import React, { useMemo, useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useRowSelect,
  useGroupBy,
  useExpanded,
} from "react-table";
import _ from "lodash";
import CaseImage from "./common/cubing/cubeImage";
import Checkbox from "./common/checkbox";
import ReactTable from "./common/reactTable";
import MultiProgressBar from "./common/multiProgressBar";
import { useAuthState } from "../fire";
import useDarkMode from "../hooks/useDarkMode";
import useCaseModal from "../hooks/useCaseModal";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { dispDecimal, dispDur, dispOverline } from "../utils/displayValue";
import { getCaseSetDocRef, getUserDocRef } from "../utils/writeCases";
import { FaIcon } from "../fontAwesome";

export default function CaseSetTable(props) {
  const { caseSet, initData } = props;

  const [data, setData] = useState(initData);
  const [caseModalId, setCaseModalId] = useState(null);
  const defaultTrainSettings = {
    hRate: 0.4,
    mmRate: 0.4,
    cmRate: 0.1,
    avgTPS: 2,
    numSolves: 2,
  };
  const [trainSettings, setTrainSettings] = useState(defaultTrainSettings);

  const [CaseModal, showCaseModal, , setCaseModalContent, showing] =
    useCaseModal();
  const { width } = useWindowDimensions();
  const [darkMode] = useDarkMode();
  const user = useAuthState();

  useEffect(() => {
    setCaseModalContent();
    const cas = _.find(data, ["id", caseModalId]);
    setCaseModalContent(cas, caseSet.details);
  }, [showing, _.find(data, ["id", caseModalId])]);

  useEffect(() => {
    let unsubscribe1 = () => {};
    let unsubscribe2 = () => {};
    if (user) {
      unsubscribe1 = getCaseSetDocRef(user, caseSet.details).onSnapshot(
        (caseSetDoc) => {
          if (caseSetDoc.data()) {
            const userCases = caseSetDoc.data().cases;
            const combined = data.map((c) => {
              const userCase = _.find(userCases, ["id", c.id]);
              const caseStats = userCase?.caseStats;
              const alg = userCase?.alg || c.alg;
              const combinedCase = { ...c, ...caseStats, alg };
              return combinedCase;
            });
            setData(combined);
          }
        }
      );
      unsubscribe2 = getUserDocRef(user).onSnapshot((userDoc) => {
        const userSettings = userDoc.data()?.settings?.trainSettings;
        if (userSettings) setTrainSettings(userSettings);
      });
    }
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [user]);

  const getStatLearned = (val, stat) => {
    const settingsValue = trainSettings[stat];
    const map = {
      hRate: { symbol: "<" },
      mmRate: { symbol: "<" },
      cmRate: { symbol: "<" },
      avgTPS: { symbol: ">" },
      numSolves: { symbol: ">" },
    };
    if (typeof map[stat] === "undefined") return null;
    if (map[stat].symbol === ">") {
      return val >= settingsValue;
    } else if (map[stat].symbol === "<") {
      return val <= settingsValue;
    } else throw new Error("symbol not recognized");
  };

  const allStatsLearned = (statsObj) => {
    const mapped = _.mapValues(statsObj, (v, k) => getStatLearned(v, k));
    return !_.some(mapped, (c) => c === false);
  };

  const getStatus = ({ hRate, mmRate, cmRate, avgTPS, numSolves }) => {
    if (allStatsLearned({ hRate, mmRate, cmRate, avgTPS, numSolves })) return 2;
    if (numSolves > 0) return 1;
    return 0;
  };

  const sortStatus = useMemo(() => (rowA, rowB) => {
    const [sA, sB] = [rowA.values.status, rowB.values.status];
    const isAggregated = typeof sA === "object";
    let AisBigger = null;
    if (isAggregated) {
      AisBigger = sA[2] !== sB[2] ? sA[2] > sB[2] : sA[1] > sB[1];
    } else {
      AisBigger = sA > sB;
    }
    return AisBigger ? 1 : -1;
  });

  const renderAggregatedStatus = (counts) => {
    const values = [2, 1, 0].map((n) => counts[n]);
    const variants = ["success", "warning", "secondary"];
    return <MultiProgressBar values={values} variants={variants} />;
  };

  const renderStatus = (status) => {
    const textStyles = ["text-secondary", "text-warning", "text-success"];
    return <FaIcon icon="circle" size="lg" className={textStyles[status]} />;
  };

  const definedAverage = (values) => {
    const definedValues = values.filter((v) => typeof v !== "undefined");
    if (definedValues.length > 0) return _.mean(definedValues);
    else return undefined;
  };

  const hasUniqueGroups = _.uniqBy(caseSet.cases, "group").length > 1;
  const isWide = width >= 576;
  const csDetails = caseSet.details;

  const defaultColumn = useMemo(
    () => ({
      disableGroupBy: true,
      Cell: ({ value }) => dispDecimal(value),
      aggregate: definedAverage,
      sortType: "number",
    }),
    [dispDecimal, definedAverage]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Group",
        accessor: "group",
        Cell: ({ value }) => String(value),
        aggregate: null,
        disableGroupBy: false,
        show: hasUniqueGroups,
      },
      {
        Header: "Case",
        accessor: (row) => row,
        Cell: ({ value }) => (
          <CaseImage alg={value.alg} caseSetDetails={csDetails} size="65" />
        ),
        aggregate: (values) => _(values).sample(),
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (value ? String(value) : ""),
        show: isWide,
        aggregate: null,
      },
      { Header: <FaIcon icon="spinner" />, accessor: "hRate", show: isWide },
      { Header: <FaIcon icon="check" />, accessor: "nmRate", show: isWide },
      { Header: <FaIcon icon="minus" />, accessor: "mmRate", show: isWide },
      { Header: <FaIcon icon="times" />, accessor: "cmRate", show: isWide },
      {
        Header: dispOverline("time"),
        accessor: "avgTime",
        Cell: ({ value }) => dispDur(value),
        show: isWide,
      },
      { Header: dispOverline("TPS"), accessor: "avgTPS", show: isWide },
      {
        Header: "# Solves",
        accessor: "numSolves",
        aggregate: "sum",
        Cell: ({ value }) => dispDecimal(value, 0),
        show: isWide,
      },
      {
        Header: "Status",
        id: "status",
        accessor: getStatus,
        Cell: ({ value }) => renderStatus(value),
        aggregate: (values) => _.countBy(values),
        Aggregated: ({ value }) => renderAggregatedStatus(value),
        sortType: sortStatus,
      },
    ],
    [isWide, trainSettings]
  );

  const getStatNotLearnedProps = ({ column, row, isAggregated, value }) => {
    const statLearned = getStatLearned(value, column.id);
    if (statLearned === null) return;
    const hasSolves = row.original?.numSolves;
    const color = darkMode ? "#ffc107" : "#f09b0a";
    const styleMe = hasSolves && !isAggregated && !statLearned;
    if (styleMe) return { style: { fontWeight: "700", color } };
  };

  const getClickForModalProps = ({ column, row, isAggregated, isGrouped }) => {
    if (!isGrouped && !isAggregated && !(column.id === "selection")) {
      return {
        onClick: () => {
          const cas = row.original;
          setCaseModalId(cas.id);
          showCaseModal(cas, caseSet.details);
        },
        style: { cursor: "pointer" },
      };
    }
  };

  const getCellProps = (cell) => {
    return _.merge(getStatNotLearnedProps(cell), getClickForModalProps(cell));
  };

  const addCheckboxes = (hooks) => {
    const selectCol = {
      id: "selection",
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <Checkbox {...getToggleAllRowsSelectedProps()} />
      ),
      Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
    };
    hooks.visibleColumns.push((columns) => [...columns, selectCol]);
  };

  const initialState = {
    groupBy: hasUniqueGroups ? ["group"] : [],
    sortBy: [{ id: "status", desc: true }],
    hiddenColumns: columns.map((column) => {
      if (column.show === false) return column.accessor || column.id;
    }),
  };

  const table = useTable(
    { columns, data, defaultColumn, initialState },
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    addCheckboxes
  );

  useEffect(() => {
    const selectedRowIds = table.state.selectedRowIds;
    const selectedCases = data.filter((unused, i) => selectedRowIds[i]);
    props.setSelectedCases(selectedCases);
  }, [table.state.selectedRowIds]);

  return (
    <>
      <ReactTable table={table} getCellProps={getCellProps} size="sm" hover />
      <CaseModal />
    </>
  );
}
