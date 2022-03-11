import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons';

const Search = () => {
    let dispatch = useDispatch();
    const {search} = useSelector((state) => ({...state}))
    const {text} = search;

    let navigate = useNavigate();

    const handleChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        e.prevent.default();
        navigate(`/shop?${text}`)
    }

    return (
        <>
        {/* <form className='row' onSubmit={handleSubmit}>
            <div classNmae='col'><input 
                onChange={handleChange}
                type='search' 
                value={text} 
                className='form-control mr-sm-2' 
                placeholder='Search' 
            /></div>
            <div className='col'><SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} /></div>
        </form> */}
        <form class="row row-cols-lg-auto g-1 align-items-center">
            <div class="col-11">
                <div class="input-group">
                <input class="form-control" 
                    onChange={handleChange}
                    type='search' 
                    value={text} 
                    className='form-control mr-sm-2' 
                    placeholder='Search'
                />
                </div>
            </div>

            <div class="col-2">
            <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
            </div>
        </form>
      </>
    )
    
};

export default Search;