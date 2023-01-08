import React from "react";
import { Link } from "react-router-dom";

type Tab = {
  name: string;
  path: string;
  selected: boolean;
};

const Tabs = ({ tabs }: { tabs: Tab[] }) => (
  <>
    {tabs.map((tab, i) => (
      <div className={"inline-flex"} key={tab.path}>
        <Link to={tab.path}>
          <p className={tab.selected ? "text-black-600" : "text-grey-600"}>
            {tab.name}
          </p>
        </Link>
        {i + 1 !== tabs.length && <p className="px-2"> | </p>}
      </div>
    ))}
  </>
);

export default Tabs;
