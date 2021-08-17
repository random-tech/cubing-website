import React, { useMemo, useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import {
  useTable,
  useSortBy,
  useRowSelect,
  useGroupBy,
  useExpanded,
} from "react-table";
import { FaIcon } from "../fontAwesome";
import _ from "lodash";
import CaseImage from "./common/cubing/cubeImage";
import { Checkbox } from "./common/checkbox";
import ReactTable from "./common/reactTable";
import { useAuthState, db } from "../fire";
import { dispDur, dispDecimal, dispOverline } from "../utils/displayValue";
import { getCaseSetDocRef } from "../utils/writeCases";
import useDarkMode from "../hooks/useDarkMode";
import useCaseModal from "../hooks/useCaseModal";
import useWindowDimensions from "../hooks/useWindowDimensions";

export default function CaseSetTable(props) {
  const { caseSet } = props;
  // const data = useMemo(() => caseSet.cases, []);
  const initData = caseSet.cases.map((c) => ({ ...c, alg: c.algs[0] }));
  const [data, setData] = useState(initData);
  const user = useAuthState();
  const [darkMode] = useDarkMode();
  const [CaseModal, showCaseModal, , setCaseModalContent, showing] =
    useCaseModal();
  const [caseModalId, setCaseModalId] = useState(null);
  const { width } = useWindowDimensions();
  const defaultTrainSettings = {
    hRate: 0.4,
    mmRate: 0.4,
    cmRate: 0.1,
    avgTPS: 2,
    numSolves: 2,
  };
  const [trainSettings, setTrainSettings] = useState(defaultTrainSettings);

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
              const caseStats = userCase ? userCase.caseStats : null;
              const alg = userCase && userCase.alg ? userCase.alg : c.alg;
              const combinedCase = { ...c, ...caseStats, alg };
              return combinedCase;
            });
            setData(combined);
          }
        }
      );
      unsubscribe2 = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((userDoc) => {
          if (
            userDoc.data() &&
            userDoc.data().settings &&
            userDoc.data().settings.trainSettings
          ) {
            setTrainSettings(userDoc.data().settings.trainSettings);
          }
        });
    }
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [user]);

  const getPropLearned = (prop, val) => {
    const settingsValue = trainSettings[prop];
    const map = {
      hRate: { symbol: "<" },
      mmRate: { symbol: "<" },
      cmRate: { symbol: "<" },
      avgTPS: { symbol: ">" },
      numSolves: { symbol: ">" },
    };
    if (typeof map[prop] === "undefined") return null;
    if (map[prop].symbol === ">") {
      return val >= settingsValue;
    } else if (map[prop].symbol === "<") {
      return val <= settingsValue;
    } else throw new Error("symbol not recognized");
  };

  const getStatus = ({ hRate, mmRate, cmRate, avgTPS, numSolves }) => {
    const allLearned =
      getPropLearned("hRate", hRate) &&
      getPropLearned("cmRate", cmRate) &&
      getPropLearned("mmRate", mmRate) &&
      getPropLearned("avgTPS", avgTPS) &&
      getPropLearned("numSolves", numSolves);
    if (allLearned) return 2;
    if (numSolves > 0) return 1;
    return 0;
  };

  const aggregateStatus = (statuses) => {
    const statusEnum = [0, 1, 2];
    const percents = statusEnum.map((status) => {
      const count = statuses.filter((s) => s === status).length;
      const percentage = (count * 100) / statuses.length;
      return percentage;
    });
    return percents;
  };

  const sortStatus = (rowA, rowB) => {
    // docs say this function should be memoized
    const [sA, sB] = [rowA.values.status, rowB.values.status];
    let AisBigger = null;
    if (Array.isArray(sA)) {
      // 2 is learned, 1 is learning
      AisBigger = sA[2] !== sB[2] ? sA[2] > sB[2] : sA[1] > sB[1];
    } else AisBigger = sA > sB;

    return AisBigger ? 1 : -1;
  };

  const renderAggregatedStatus = (percents) => {
    return (
      <ProgressBar style={{ height: "8px" }}>
        <ProgressBar variant="success" now={percents[2]} key={2} />
        <ProgressBar variant="warning" now={percents[1]} key={1} />
        <ProgressBar variant="secondary" now={percents[0]} key={0} />
      </ProgressBar>
    );
  };

  const renderStatus = (status) => {
    const map = {
      0: ["text-secondary", "not started"],
      1: ["text-warning", "learning"],
      2: ["text-success", "learned"],
    };
    const color = map[status][0];
    return (
      <span>
        <FaIcon icon="circle" size="lg" className={color} />
      </span>
    );
  };

  const renderCaseImage = ({ value }) => {
    return (
      <CaseImage alg={value.alg} caseSetDetails={caseSet.details} size="65" />
    );
  };

  const hasUniqueGroups = _.uniqBy(caseSet.cases, "group").length > 1;

  const definedAverage = (values) => {
    const definedValues = values.filter((v) => typeof v !== "undefined");
    if (definedValues.length > 0) return _.mean(definedValues);
    else return undefined;
  };

  const showStats = width >= 576;

  const defaultColumn = useMemo(() => ({ disableGroupBy: true }), []);

  const columns = useMemo(
    () => [
      {
        Header: "Group",
        accessor: "group",
        disableGroupBy: false,
        show: hasUniqueGroups,
      },
      {
        Header: "Case",
        accessor: (row) => row,
        Cell: renderCaseImage,
        aggregate: (values) => _(values).sample(),
        Aggregated: renderCaseImage,
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "name",
        show: showStats,
      },
      {
        Header: <FaIcon icon="spinner" />,
        accessor: "hRate",
        aggregate: definedAverage,
        Cell: ({ value }) => dispDecimal(value),
        sortType: "number",
        show: showStats,
      },
      {
        Header: <FaIcon icon="check" />,
        accessor: "nmRate",
        aggregate: definedAverage,
        Cell: ({ value }) => dispDecimal(value),
        sortType: "number",
        show: showStats,
      },
      {
        Header: <FaIcon icon="minus" />,
        accessor: "mmRate",
        aggregate: definedAverage,
        Cell: ({ value }) => dispDecimal(value),
        sortType: "number",
        show: showStats,
      },
      {
        Header: <FaIcon icon="times" />,
        accessor: "cmRate",
        aggregate: definedAverage,
        Cell: ({ value }) => dispDecimal(value),
        sortType: "number",
        show: showStats,
      },
      {
        Header: dispOverline("time"),
        accessor: "avgTime",
        aggregate: definedAverage,
        Cell: ({ value }) => dispDur(value),
        sortType: "number",
        show: showStats,
      },
      {
        Header: dispOverline("TPS"),
        accessor: "avgTPS",
        aggregate: definedAverage,
        Cell: ({ value }) => dispDecimal(value),
        sortType: "number",
        show: showStats,
      },
      {
        Header: "# Solves",
        accessor: "numSolves",
        aggregate: "sum",
        Cell: ({ value }) => dispDecimal(value, 0),
        sortType: "number",
        show: showStats,
      },
      // {
      //   Header: "Alg Len",
      //   accessor: "algs[0]",
      //   Cell: ({ value }) => {
      //     let ret = null;
      //     try {
      //       ret = getSTM(value);
      //     } catch {
      //       ret = 0;
      //     }
      //     return ret;
      //   },
      //   aggregate: "average",
      //   Aggregated: ({ value }) => value,
      //   sortType: "number",
      // },
      {
        Header: "Status",
        id: "status",
        accessor: getStatus,
        Cell: ({ value }) => renderStatus(value),
        aggregate: aggregateStatus,
        Aggregated: ({ value }) => renderAggregatedStatus(value),
        sortType: sortStatus,
      },
    ],
    [showStats, trainSettings]
  );

  const getCellProps = (cell) => {
    const { isAggregated, isGrouped } = cell;
    const columnId = cell.column.id;
    const statusCols = ["hRate", "cmRate", "mmRate", "avgTPS", "numSolves"];
    let props = {};
    if (statusCols.includes(columnId)) {
      const propLearned = getPropLearned(columnId, cell.value);
      if (typeof cell.value === "number" && !isAggregated && !propLearned)
        props = {
          style: {
            fontWeight: "700",
            color: darkMode ? "#ffc107" : "#f09b0a",
          },
        };
    }
    if (!isGrouped && !isAggregated && !(columnId === "selection")) {
      props = {
        ...props,
        onClick: () => {
          const cas = cell.row.original;
          setCaseModalId(cas.id);
          showCaseModal(cas, caseSet.details);
        },
        style: { ...props.style, cursor: "pointer" },
      };
    }
    return props;
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        groupBy: hasUniqueGroups ? ["group"] : [],
        sortBy: [{ id: "status", desc: true }],
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
        }),
      },
    },
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
      ]);
    }
  );

  useEffect(() => {
    const selectedRowIds = tableInstance.state.selectedRowIds;
    const selectedCases = data.filter((unused, i) => selectedRowIds[i]);
    props.setSelectedCases(selectedCases);
  }, [tableInstance.state.selectedRowIds]);

  return (
    <>
      <ReactTable
        table={tableInstance}
        getCellProps={getCellProps}
        size="sm"
        hover
      />
      <CaseModal />
    </>
  );
}
