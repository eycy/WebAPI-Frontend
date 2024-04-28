import { Button, Input, Row, Col } from "antd";
import { dogAPI } from "../commons/http-commons";
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const SearchBar = ({ setLoading, setDogs, isLoggedIn }) => {
  const navigate = useNavigate();

  const onSearch = async (value, _e, info) => {
    try {
      setLoading(true); // show loading
      const response = await axios.get(`${dogAPI.url}/api/v1/dogs/search?name=${value}`);
      setDogs(response.data);
    } catch (error) {

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          setDogs([]);
          console.log(axiosError.response.status);
        }
      } else
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Row justify="end" gutter={[16, 16]} style={{ padding: '10px' }}>
        <Col span={22} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <span style={{ marginRight: '8px' }}>Search:</span>
          <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
        </Col>
        {isLoggedIn ? (
          <Col span={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={() => { navigate('/listingForm'); }}>
              Add New Listing
            </Button>
          </Col>
        ) : <></>}
      </Row>
    </>
  );
};

export default SearchBar;