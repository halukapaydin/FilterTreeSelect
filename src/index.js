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

const contains = (title, filterValue) => {
  if (!filterValue) {
    return true;
  }
  return title.includes(filterValue);
};

const _filterTreeData = (treeData, filterValue, parent) => {
  treeData.forEach((node) => {
    node._visible = contains(node.title, filterValue);
    node._parent = parent;
    if (node._visible) {
      let p = parent;
      while (p) {
        p._visible = true;
        p = p._parent;
      }
    }

    if (node.children) {
      _filterTreeData(node.children, filterValue, node);
    }
  });
};

const filterTreeData = (treeData, filterValue) => {
  let filteredTreeData = [...treeData];
  _filterTreeData(filteredTreeData, filterValue, undefined);
  return filteredTreeData;
};

const renderTreeNode = (nodes) => {
  return (
    nodes &&
    nodes.map((node) => {
      let display = "none";
      if (node._visible === undefined || node._visible) {
        display = "inherit";
      }
      console.log(node.title, node._visible, display);
      return (
        <Tree.TreeNode
          key={node.key}
          title={node.title}
          style={{ display: display }}
          expanded={true}
        >
          {renderTreeNode(node.children)}
        </Tree.TreeNode>
      );
    })
  );
};

const FilterTreeSelect = () => {
  let [filteredData, setFilteredData] = useState(treeData);
  return (
    <div>
      <Input.Search
        onSearch={(value) => {
          const data = filterTreeData(treeData, value);
          setFilteredData(data);
        }}
      />
      <Tree checkable defaultExpandAll>
        {renderTreeNode(filteredData)}
      </Tree>
    </div>
  );
};

ReactDOM.render(<FilterTreeSelect />, document.getElementById("container"));
