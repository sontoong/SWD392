import { Table, TableProps } from "antd";
import { formatCurrency } from "../utils/utils";
import { Transaction } from "../models/transaction";
import { Transactions } from "../../constants/testData";
import { generateTransactionType } from "../utils/generators";


export default function TransactionList(props:{role: string}) {
  interface TransactionTable extends Transaction{
    MoneyFormat: string;
    TypeFormat: string
  }

const data: TransactionTable[] = Transactions.map((item)=>(
  {...item, MoneyFormat:formatCurrency(item.moneyAmount), TypeFormat:generateTransactionType(item.type)}
))

const columns: TableProps<TransactionTable>["columns"] = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Loại",
      dataIndex: "TypeFormat",
      key: "TypeFormat",
    },
    {
      title: props.role=="freelancer"? "Khách hàng" : "Freelancer",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số tiền",
      dataIndex: "MoneyFormat",
      key: "MoneyFormat",
    },
    {
        title: "Mã giao dịch",
        dataIndex: "id",
        key: "id",
    },
  ];

 return <Table columns={columns} dataSource={data} pagination={{position:["bottomCenter"]}}/>;
}