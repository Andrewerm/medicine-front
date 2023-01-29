import {Divider, Space} from "antd";
import React, {useContext} from "react";
import {ITopPanelContext, TopPanelContext} from "../hooks/topPanel";


export const TopPanel = () => {
    const context = useContext<ITopPanelContext | undefined>(TopPanelContext);
    return (
        <>
            {(context?.buttons && context?.buttons.length>0) && <Divider style={{margin: 0}}/>}
            <Space >
                {context?.buttons.map((item: React.ReactNode, index) => <span key={index}>{item}</span>)}
            </Space>
        </>
    )
}
