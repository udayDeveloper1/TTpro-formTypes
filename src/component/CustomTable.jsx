import React, { useState } from "react";
import Table from "antd/es/table";
import { useLocation } from "react-router-dom";

const CustomTable = ({ columns, data, scroll, loading, serverPagination, pagination = true, ...rest }) => {
    const path = useLocation()
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <span>{" Previous"}</span>;
        }

        if (type === 'next') {
            return <span>Next</span>;
        }

        return originalElement;
    };

    const sizeChangeProps = { pageSizeOptions: [5,10, 25, 50, 100], showSizeChanger: true };

    const rowSelection = {
        type: "radio",
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        },

    };
    return (
        <div className="custom-table">
            <Table
                rowClassName={(record, index) => {
                    return path?.pathname == "/pending-Requests" && record?.errorFlag ? "table-row error-flag" : "table-row"
                }}
                columns={columns}
                dataSource={data}
                bordered
                pagination={pagination ? { ...serverPagination, itemRender, ...sizeChangeProps } || { defaultPageSize: 5, itemRender, ...sizeChangeProps } : false}
                loading={loading}
                scroll={scroll}
                sticky
                {...rest}
            />
        </div>
    )
};

export default CustomTable