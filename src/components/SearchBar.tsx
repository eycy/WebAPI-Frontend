import React, { useState } from 'react';
import { Button, Input, Row, Col } from "antd";
import { dogAPI } from "../commons/http-commons";
import axios, { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';
import AdvanceSearchPanel from './AdvanceSearchPanel';


const { Search } = Input;

const SearchBar = ({ setLoading, setDogs, isLoggedIn, isStaff }) => {
  const navigate = useNavigate();
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);

  const handleAdvanceSearchToggle = () => {
    setIsAdvanceSearchOpen(!isAdvanceSearchOpen);
  };

  const onNameSearch = async (value, _e, info) => {
    try {
      setLoading(true); // show loading
      const response = await axios.get(`${dogAPI.url}/api/v1/dogs/search?name=${value}`);
      setDogs(response.data);
    } catch (error) {

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
          setDogs([]);
        }
      } else
        console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onAdvSearch = async (values, form) => {
    try {
      setLoading(true); // show loading

      const queryParams = new URLSearchParams();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value);
        }
      });

      const response = await axios.get(`${dogAPI.url}/api/v1/dogs/search?${queryParams.toString()}`);

      if (response.status === 200) {
        const data = response.data;
        setDogs(data);
      } else if (response.status === 404) {
        setDogs([]);
      } else {
        console.error(`Request failed with status ${response.status}`);
      }

      isAdvanceSearchOpen(true);
      form.setFieldsValue(values);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response && axiosError.response.status === 404) {
          setDogs([]);
          console.log(axiosError.response.status);
        }
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Row justify="end" gutter={[16, 16]} style={{ padding: '10px' }}>
        <Col span={18} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <span style={{ marginRight: '8px' }}>Search:</span>
          <Search placeholder="Input Dog's Name" allowClear onSearch={onNameSearch} style={{ width: 200 }} />
        </Col>
        <Col span={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button type="text" onClick={handleAdvanceSearchToggle} style={{ marginLeft: '8px' }}>
            {isAdvanceSearchOpen ? 'Advance Search \u25B2' : 'Advanced Search \u25BC'}
          </Button>
        </Col>

        {isLoggedIn && isStaff ? (
          <Col span={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={() => { navigate('/listingForm'); }}>
              Add New Listing
            </Button>
          </Col>
        ) : <></>}
      </Row>


      {isAdvanceSearchOpen && (
        <AdvanceSearchPanel onAdvSearch={onAdvSearch} isAdvanceSearchOpen={isAdvanceSearchOpen} />
      )}
    </>
  );
};

export default SearchBar;