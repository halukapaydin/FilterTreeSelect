import {Input, Popover, Space, Spin} from "antd";
import React, { useState } from "react";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import FilterTree from "./FilterTree";

const FilterTreeSelect = ({ data, value, onChange, valueRenderer=v=>v}) => {
    const [renderedValue, setRenderedValue] = useState(value ? valueRenderer(value) : "");
    const [treeValue, setTreeValue] = useState(value);
    const content = <FilterTree
        treeData={data}
        value={treeValue}
        onChange={(checkedKeys)=>{
            setTreeValue(checkedKeys);
        }}
    />
    return (
        <div className={"filter-tree-select"}>
            <Popover
                trigger={"click"}
                content={content}
                overlayClassName={"filter-tree-select-overlay"}
                placement={"bottomLeft"}
                builtinPlacements={""}
                showArrow={false}
                onVisibleChange={(visible)=>{
                    if(!visible){
                        if(onChange){
                            onChange(treeValue);
                        }
                        setRenderedValue(valueRenderer(treeValue));

                    }
                }}
            >
                <div className={"ant-input"}>
                    <div>
                        {renderedValue}
                    </div>
                    <div>
                        {renderIcon(data)}
                    </div>
                </div>
            </Popover>
        </div>
    );
};

const renderIcon = (data)=>{
    return !data ? (
        <Spin size={"small"} indicator={<LoadingOutlined />} />
    ) : (
        <DownOutlined />
    )
}

export default FilterTreeSelect;
