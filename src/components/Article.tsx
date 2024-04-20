import { Card } from "antd";
import { Link } from 'react-router-dom';

const { Meta } = Card

const Article = (props) => {
  return (
    <>
      <Card style={{ width: 300 }} cover={<img alt="example" src="https://dummyimage.com/medrect" />}>
        <Meta title={props.title} description={props.children} />
        <Link to={`/a/${props.href}`}>Detail</Link>
      </Card>
    </>
  )
}

export default Article;