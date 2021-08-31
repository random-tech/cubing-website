import React, { useContext } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  ComposedChart,
  Line,
  Scatter,
  ErrorBar,
} from "recharts";
import DarkModeContext from "../hooks/useDarkMode";
import { dispDur } from "../utils/displayValue";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { Card, Table, Button } from "react-bootstrap";
import useModal from "../hooks/useModal";
import deleteSession from "../utils/deleteSession";
import { UserContext } from "../services/firebase";
import { FaIcon } from "../fontAwesome";

export default function SessionsChart({ sessionGroup }) {
  const { xs } = useWindowDimensions();
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserContext);
  const [SessionModal, _showSessionModal, hideSessionModal] = useModal();
  const [ConfirmModal, _showConfirmModal, hideConfirmModal] = useModal();

  sessionGroup.sessions = sessionGroup.sessions.filter(
    (sesh) => sesh.sessionAverage !== Infinity
  );

  const sessions = sessionGroup.sessions.map((sesh, i) => {
    const { quartiles, sessionAverage, percentiles } = sesh;
    const { q1, q3 } = quartiles;
    const sessionNum = i + 1;
    const iqrEB = [sessionAverage - q1, q3 - sessionAverage];
    const msbEB = [
      sessionAverage - (percentiles?.p10 || q1),
      (percentiles?.p90 || q3) - sessionAverage,
    ];
    return { ...sesh, iqrEB, msbEB, sessionNum };
  });

  const gray = { 400: "#ced4da", 600: "#6c757d", 700: "#495057" };
  const primaryColor = darkMode ? "#967bb6" : "#af94cf";
  const gridColor = darkMode ? gray[700] : gray[400];
  const axesColor = darkMode ? gray[400] : gray[700];
  const iqrEBcolor = darkMode ? primaryColor + "80" : primaryColor + "60";
  const msbEBcolor = darkMode ? primaryColor + "80" : primaryColor + "60";

  const sideMargin = 20;
  const chartMargins = {
    top: 20,
    right: sideMargin,
    left: sideMargin,
    bottom: 20,
  };

  const renderSessionModalBody = (sesh) => {
    const p10 = sesh.percentiles?.p10;
    const p90 = sesh.percentiles?.p90;
    const q1 = sesh.quartiles?.q1;
    const q3 = sesh.quartiles?.q3;

    let bestsToDisplay = [
      { label: "Ao100", key: "ao100" },
      { label: "Ao50", key: "ao50" },
      { label: "Ao12", key: "ao12" },
      { label: "Ao5", key: "ao5" },
      { label: "Single", key: "single" },
    ];

    bestsToDisplay = bestsToDisplay.filter((b) => sesh.bests[b.key]);

    const rows = [
      { name: "Number of Solves", value: sesh.numSolves },
      { name: "Session Average", value: dispDur(sesh.sessionAverage) },
      {
        name: "50% of solves between",
        value: `${dispDur(q1)} and ${dispDur(q3)}`,
      },
      {
        name: "80% of solves between",
        value: `${dispDur(p10)} and ${dispDur(p90)}`,
      },
      ...bestsToDisplay.map((b) => {
        const isGlobalBest = sesh.id === sessionGroup.bests[b.key].sessionId;
        const color = darkMode ? "gold" : "orange";
        return {
          name: `Best ${b.label}`,
          value: (
            <span>
              {dispDur(sesh.bests[b.key])}{" "}
              {isGlobalBest && <FaIcon icon="star" color={color} />}
            </span>
          ),
        };
      }),
    ];

    return (
      <Table size={xs ? "sm" : ""}>
        <colgroup>
          <col span="1" style={{ width: "45%" }} />
          <col span="1" style={{ width: "55%" }} />
        </colgroup>
        <tbody>
          {rows.map((row) => (
            <tr>
              <td>{row.name}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const showConfirmModal = (sesh) => {
    _showConfirmModal({
      title: "Are you sure?",
      body: (
        <div className="text-center">
          This will permanently delete this session.
        </div>
      ),
      footer: (
        <Button
          variant="danger"
          onClick={() => {
            hideConfirmModal();
            deleteSession(sesh.id, user);
          }}
        >
          Delete
        </Button>
      ),
    });
  };

  const showSessionModal = (sesh) => {
    _showSessionModal({
      title: `Session ${sesh.sessionNum} - ${sesh.date}`,
      body: renderSessionModalBody(sesh),
      footer: (
        <Button
          variant="danger"
          onClick={() => {
            hideSessionModal();
            showConfirmModal(sesh);
          }}
        >
          Delete Session
        </Button>
      ),
    });
  };

  const renderErrorBar = (key, width, color) => {
    return (
      <ErrorBar
        dataKey={key}
        width={0}
        strokeWidth={width}
        stroke={color}
        direction="y"
      />
    );
  };

  const renderAxes = () => {
    const common = { type: "number", stroke: axesColor };
    const labelCommon = { style: { textAnchor: "middle" }, fill: axesColor };

    return (
      <>
        <XAxis
          dataKey="sessionNum"
          name="Session Number"
          label={{
            value: "Session Number",
            position: "bottom",
            ...labelCommon,
          }}
          allowDecimals={false}
          {...common}
        />
        <YAxis
          dataKey="sessionAverage"
          name="Session Average"
          label={{
            value: "Session Average Time",
            position: "insideLeft",
            angle: -90,
            ...labelCommon,
          }}
          domain={["auto", "auto"]}
          tickFormatter={(value) => (xs ? value : dispDur(value).slice(0, -3))}
          allowDecimals={false}
          {...common}
        />
        <ZAxis dataKey="numSolves" range={[50, 400]} {...common} />
      </>
    );
  };

  const renderTooltip = ({ active, payload, label }) => {
    if (active) {
      const sesh = payload?.[0]?.payload;
      const { sessionAverage, numSolves, dateTime, quartiles } = sesh;
      const date = new Date(dateTime).toLocaleDateString();
      const cellStyle = {
        borderColor: darkMode ? "#495057" : "",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 7,
        paddingBottom: 7,
      };
      return (
        <Card style={{ background: darkMode ? "#343a40" : "#fcfdfe" }}>
          <span className="m-2"> {date}</span>
          <Table size="sm" className="m-0">
            <tr>
              <td style={cellStyle}>Average: </td>
              <td style={cellStyle}>{dispDur(sessionAverage)}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Solves: </td>
              <td style={cellStyle}>{numSolves}</td>
            </tr>
          </Table>
        </Card>
      );
    } else return <></>;
  };

  return (
    <div style={{ height: xs ? "300px" : "500px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={sessions}
          margin={chartMargins}
          onClick={(props) => {
            const sesh = props?.activePayload[0]?.payload;
            sesh && showSessionModal(sesh);
          }}
          style={{ cursor: "pointer" }}
        >
          <CartesianGrid strokeDasharray={[3, 3]} stroke={gridColor} />
          {renderAxes()}
          <Scatter name="Session Average" data={sessions} fill={primaryColor}>
            {renderErrorBar("iqrEB", 6, iqrEBcolor)}
            {renderErrorBar("msbEB", 2, msbEBcolor)}
          </Scatter>
          <Line
            type="monotone"
            strokeWidth={0}
            dot={false}
            activeDot={false}
            name="Session Average"
            dataKey="sessionAverage"
            stroke={primaryColor}
          />
          {!xs && (
            <Tooltip
              labelFormatter={(label, other) => {
                const dateTime = other[0]?.payload.dateTime;
                const date = new Date(dateTime).toLocaleDateString();
                return "Session " + label + ": " + date;
              }}
              content={renderTooltip}
              animationDuration={200}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      <SessionModal />
      <ConfirmModal />
    </div>
  );
}