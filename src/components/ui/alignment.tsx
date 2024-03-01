"use client"
import React, { useState } from 'react'
import { Col, Form, Radio, Row } from 'antd'

const Alignment = ({justify, items, setJustify, setItems}: {justify: string, items: string, setJustify: React.Dispatch<React.SetStateAction<string>>, setItems: React.Dispatch<React.SetStateAction<string>>}) => {


    return (
        // <Form.Item label="Alignment:" name={'[align]'}>
        <>
            <Row>
                <Col span={12}>
                    <Form.Item label="Alignment:" name={'justify'}>
                        <Radio.Group value={justify} onChange={(e) => setJustify(e.target.value)}>
                            <Col span={24}>
                                <Radio value="between">Between</Radio>
                            </Col>
                            <Col span={24}>
                                <Radio value="start">Start</Radio>
                            </Col>
                            <Col span={24}>
                                <Radio value="center">Center</Radio>
                            </Col>
                            <Col span={24}>
                                <Radio value="end">End</Radio>
                            </Col>
                        </Radio.Group>
                    </Form.Item>

                </Col>
                <Col span={12}>
                    <Form.Item label="Alignment:" name={'items'}>
                        <Radio.Group value={items} onChange={(e) => setItems(e.target.value)}>
                            <Col span={24}>
                                <Radio value="between">Between</Radio>
                            </Col>
                            <Col span={24}>
                                <Radio value="start">Start</Radio>
                            </Col>
                            <Col span={24}>
                                <Radio value="center">Center</Radio>
                            </Col>
                            <Col span={24}>
                                <Radio value="end">End</Radio>
                            </Col>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            {/* </Form.Item> */}
        </>

    )
}

export default Alignment