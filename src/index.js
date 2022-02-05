import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Input, Tree } from "antd";
const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          {
            title: "0-0-0-0",
            key: "0-0-0-0"
          },
          {
            title: "0-0-0-1",
            key: "0-0-0-1"
          },
          {
            title: "0-0-0-2",
            key: "0-0-0-2"
          }
        ]
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          {
            title: "0-0-1-0",
            key: "0-0-1-0"
          },
          {
            title: "0-0-1-1",
            key: "0-0-1-1"
          },
          {
            title: "0-0-1-2",
            key: "0-0-1-2"
          }
        ]
      },
      {
        title: "0-0-2",
        key: "0-0-2"
      }
    ]
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      {
        title: "0-1-0-0",
        key: "0-1-0-0"
      },
      {
        title: "0-1-0-1",
        key: "0-1-0-1"
      },
      {
        title: "0-1-0-2",
        key: "0-1-0-2"
      }
    ]
  },
  {
    title: "0-2",
    key: "0-2"
  }
];

const Demo = () => {
  let [filterValue, setFilterValue] = useState(undefined);
  return (
    <div>
      <Input.Search
        onSearch={(value) => {
          setFilterValue(value);
        }}
      />
      <div>{filterValue}</div>
      <Tree
        checkable
        defaultExpandAll
        treeData={treeData}
        filterTreeNode={(node) => {
          let filter = false;
          if (!filterValue) {
            return filter;
          }
          filter = node.title.includes(filterValue);
          console.log(node.title, filter);
          return filter;
        }}
      />
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("container"));
