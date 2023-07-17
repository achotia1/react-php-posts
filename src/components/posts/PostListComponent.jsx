import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../common/ConfirmModal';
import Pagination from '../common/Pagination';
import '../common/pagination.css';

const PostListComponent = ({ posts, currentPage, totalRecords, totalPages, pageLimit, onDelete, onPageChanged }) => {
   
    const totalPosts = totalRecords;

    if (totalPosts === 0) return null;
    const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
    
    return (

        <table className="table table-hover">
           
        <thead>
            <tr>
                <th>
                <h2 className={headerClass}>
                    <strong className="text-secondary">{totalPosts}</strong> Posts
                </h2>
                </th>
                <th>

                { currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
                </span>
              ) }
                </th>
                <th><Pagination totalRecords={totalRecords} pageLimit={pageLimit} pageNeighbours={1} 
                onPageChanged={onPageChanged} currentPage={currentPage} /></th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            {
                (posts.length > 0) ? 
                 posts.map(post => <PostListRow key={post.id} post={post} onDelete={onDelete} />)
                 : 
                 <tr><td colSpan='5'>No Record Found</td></tr> 
                }
        </tbody>
    </table>
       

            
    );
};

const PostListRow = ({ post, onDelete }) => {
    var [show, setShow] = useState(false);

    return (
        <>
            <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.name}</td>
                <td>{post.description}</td>
                <td>
                    <Link className="text-info" to={"admin/post/" + post.id}>Edit</Link>
                </td>
                <td>
                    <Link className="text-danger" to={"admin/post/" + post.id} onClick={
                        e => {
                            e.preventDefault();
                            setShow(true);
                        }
                    }>Delete</Link>
                </td>
            </tr>

            <ConfirmModal show={show} handleYes={
                e => {
                    onDelete(post);
                    setShow(false);
                }
            } handleNo={e => { setShow(false); }} />
        </>
    );
}

export default PostListComponent;