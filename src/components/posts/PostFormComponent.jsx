import React from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../common/TextInput';

const PostFormComponent = ({ pageText, post, onChange, onSave, onReset }) => {
    return (
        <>
            <h1 className="text-info text-center">{pageText}</h1>
            <div className="text-center">
                <Link to="/admin">Back to List</Link>
            </div>

            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <form className="justify-content-center" onSubmit={onSave} onReset={onReset}>
                        <fieldset>
                            <legend className="text-center">Enter Post Information</legend>

                            <TextInput name="name" label="Name" value={post.name} onChange={onChange} />
                            <TextInput name="description" label="Description" value={post.description} 
                            onChange={onChange} />

                            <div className="d-grid gap-2 mx-auto col mt-3">
                                <button type='submit' className="btn btn-success">Save</button>
                                <button type='reset' className="btn btn-secondary">Reset</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostFormComponent;