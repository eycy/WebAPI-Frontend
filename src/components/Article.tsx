import { Card } from "antd";
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card

const Article = (props) => {
  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={<img alt="example" src="https://dummyimage.com/medrect" />}
        actions={props.isLoggedIn ? ([
          <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>,
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" />
        ]) : ([
          <Link to={`/a/${props.href}`}><InfoCircleOutlined key="detail" /></Link>
        ])}
      >
        <Meta title={props.title} description={props.children} />
      </Card>



    </>
  )
}



export default Article;