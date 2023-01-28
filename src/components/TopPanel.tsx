import {Col, Row} from "antd";
import React, {useContext} from "react";
import {ITopPanelContext, TopPanelContext} from "../hooks/topPanel";


export const TopPanel = () => {
    const context = useContext<ITopPanelContext | undefined>(TopPanelContext);
    return (
        <Row gutter={10}>
            {context?.buttons.map((item: React.ReactNode, index) => <Col key={index}>{item}</Col>)}
        </Row>
    )
}
