import React from 'react';
import { Flex } from "antd";
import Article from "./Article";
// import articles from "./articles.json";
// import { Link } from "react-router-dom";
import { blogAPI } from "../commons/http-commons";
import { filmAPI } from "../commons/http-commons";
import { articleAPI } from "../commons/http-commons";
import axios from "axios";

const Articles = ({ credentials }) => {
  const [articles, setArticles] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${articleAPI.url}/api/v1/articles`, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })

      .then((res) => {
        setArticles(res.data)
      })
  }, [])

  if (!articles) {
    return (<div>loading...</div>)
  } else {

    return (
      <>
        <Flex justify="space-evenly" wrap="wrap" gap="middle">
          {
            articles &&
            // articles.map(({ _id, title, director }) => (
            //   <>
            //     <Article title={title} key={_id} href={_id}>{director}</Article>
            //   </>
            articles.map(({ id, title, description }) => (
              <>
                <Article title={title} key={id} href={id}>{description}</Article>
              </>
            ))
          }
        </Flex>
      </>
    )
  }
}

export default Articles;