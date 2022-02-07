import React, {useState} from "react";
import "antd/dist/antd.css";
import "./index.css";
import {Input, Space, Tree} from "antd";

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
            let style = (node._visible === undefined || node._visible) ? {} : {display: 'none'};
            return (
                <Tree.TreeNode
                    key={node.key}
                    title={node.title}
                    style={style}
                >
                    {renderTreeNode(node.children)}
                </Tree.TreeNode>
            );
        })
    );
};

const FilterTree = ({treeData, value, onChange}) => {
    let [filteredData, setFilteredData] = useState(treeData);
    return (
        <Space direction="vertical" style={{width: "100%"}}>
            <Input.Search
                onSearch={(value) => {
                    const data = filterTreeData(treeData, value);
                    setFilteredData(data);
                }}
            />
            <Tree checkable defaultExpandAll
                  defaultCheckedKeys={value}
                  onCheck={(checkedKeys, e) => {
                      if (onChange) {
                          onChange(checkedKeys);
                      }
                  }}>
                {renderTreeNode(filteredData)}
            </Tree>
        </Space>
    );
};

export default FilterTree;
