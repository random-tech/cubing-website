import React from "react";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { useAuthState, db } from "../../fire";

export default function StatsPage() {
  const user = useAuthState();
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("sessions")
        .get()
        .then((querySnapshot) => {
          let data = querySnapshot.docs.map((d) => d.data());
          data = data.map((d) => [
            d.name,
            getDate(d.dateTime),
            d.stats.bestSingle,
            d.puzzle,
            d.stats.numSolves,
          ]);
          data = [
            ["name", "dateTime", "best single", "puzzle", "number of solves"],
            ...data,
          ];
          console.log(data);
          setChartData(data);
        });
    }
  }, [user]);

  const getDate = (dateString) => {
    let date = new Date();
    date.setTime(Date.parse(dateString));
    console.log(date.toLocaleTimeString());
    return date;
  };

  return (
    <div>
      <h1>Stats Page</h1>
      <div>
        <Chart
          width={"100%"}
          height={"500px"}
          chartType="BubbleChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          //   data={[
          //     ["ID", "Life Expectancy", "Fertility Rate", "Region", "Population"],
          //     ["CAN", 80.66, 1.67, "North America", 33739900],
          //     ["DEU", 79.84, 1.36, "Europe", 81902307],
          //     ["DNK", 78.6, 1.84, "Europe", 5523095],
          //     ["EGY", 72.73, 2.78, "Middle East", 79716203],
          //     ["GBR", 80.05, 2, "Europe", 61801570],
          //     ["IRN", 72.49, 1.7, "Middle East", 73137148],
          //     ["IRQ", 68.09, 4.77, "Middle East", 31090763],
          //     ["ISR", 81.55, 2.96, "Middle East", 7485600],
          //     ["RUS", 68.6, 1.54, "Europe", 141850000],
          //     ["USA", 78.09, 2.05, "North America", 307007000],
          //   ]}
          options={{
            title: "Session Best Single vs Session Date",
            vAxis: { title: "Solve Time" },
            hAxis: { title: "Date" },
            bubble: { textStyle: { fontSize: 11 } },
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
}
