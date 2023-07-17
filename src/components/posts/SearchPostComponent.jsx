import React from 'react';
import { withRouter } from 'react-router-dom';

const SearchPostComponent = ({value,onChange,onClick}) => {
    return (
              <div className="input-group">
                <input type="text" className="form-control"
                id='searchpost' value={value} name='searchpost' placeholder='Search Post...'
                 onChange={onChange}/>
                <div className="input-group-append">
                    <button className="btn btn-secondary" type="button" onClick={onClick}>
                        <i className="bi bi-search" ></i>
                    </button>
                </div>
            </div> 
            );
};

export default  withRouter(SearchPostComponent);