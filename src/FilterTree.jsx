import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Divider, Input, Space, Tree } from "antd";

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
      let display =
        node._visible === undefined || node._visible ? "inherit" : "none";
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

const FilterTree = ({ treeData }) => {
  let [filteredData, setFilteredData] = useState(treeData);
  return (
    <Space direction="vertical" align={""} style={{ width: "100%" }}>
      <Input.Search
        onSearch={(value) => {
          const data = filterTreeData(treeData, value);
          setFilteredData(data);
        }}
      />
      <Tree checkable defaultExpandAll>
        {renderTreeNode(filteredData)}
      </Tree>
    </Space>
  );
};

export default FilterTree;
