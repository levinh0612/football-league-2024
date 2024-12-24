import React from "react";
import { Tabs } from "antd";
import Matches from "./components/Matches";
import Ranking from "./components/Ranking";
import Statistics from "./components/Statistics";
import Players from "./components/Players";
import Results from "./components/Results";

const { TabPane } = Tabs;

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>WLF Champion League 2024</h1>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Trận đấu" key="1">
          <Matches />
        </TabPane>
        <TabPane tab="BXH" key="2">
          <Ranking />
        </TabPane>
        <TabPane tab="Số liệu thống kê" key="3">
          <Statistics />
        </TabPane>
        {/* <TabPane tab="Cầu thủ" key="4">
          <Players />
        </TabPane> */}
        <TabPane tab="Giải thưởng & Kỷ luật" key="5">
          <Results />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;