import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import articles from './articles.json';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

const DetailArticles = ({ articles }) => {
  const { aid } = useParams();
  const navigate = useNavigate();

  for (const article of articles) {
    if (article.id == +aid) {
      return (
        <>
          <h1>{article.title}</h1>
          <h1>{article.alltext}</h1>
          <Button onClick={() => navigate(-1)} icon={<RollbackOutlined />}></Button>
        </>
      )
    }
  }

}

export default DetailArticles;