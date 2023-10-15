import React, { useEffect, useState } from "react";
import {Link, NavLink} from 'react-router-dom';
import UserService from "../services/user.service";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import EventBus from "../common/EventBus";
  
export default function ListPosts(){
    const [posts, setPosts] = useState([]);
    const [info, setInfo] = useState({});
    const { user: currentUser } = useSelector((state) => state.auth);
  
    const fetchPosts = (page) => {
        UserService.getPosts(page)
            .then((data) => {
                setPosts(data.data.results);
                //console.log(data.data.results);
                setInfo(data.data);
                //console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            });
    };

    const handleNextPage = () => {
        fetchPosts(info.next_page);
        window.scrollTo(0, 0);
    };

    const handlePreviousPage = () => {
        fetchPosts(info.prev_page);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        fetchPosts(1);
    }, []);
     
    const handleDelete = (id) => {
        UserService.deletePost(id)
        .then(function(response){
            console.log(response.data);
            alert("Successfully Deleted");
            fetchPosts(1);
        })
        .catch(function(err){
            console.log("Something Wrong");
            alert("Something Wrong");
            if (err.response && err.response.status === 401) {
                EventBus.dispatch("logout");
            }
        });
        
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }
     
    return (
    <div>
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12">
                    <p><Link to="/createpost" className="btn btn-success">Create New Post</Link> </p>
                    <h1>List Posts</h1>
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Update Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, key) =>
                                <tr key={key}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.author_email}</td>
                                    <td>{post.update_time}</td>
                                    <td>
                                        <NavLink to={`/view/${post.id}`} className="btn btn-success mx-2">View</NavLink>
                                        {currentUser && currentUser.email === post.author_email && (<NavLink to={`/edit/${post.id}`} className="btn btn-info mx-2">Edit</NavLink>)}
                                        {currentUser && currentUser.email === post.author_email && (<button onClick={()=>handleDelete(post.id)} className="btn btn-danger">Delete</button>)}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="container pb-5">
                    <nav>
                    <ul className="pagination justify-content-center">
                        {info.prev_page != -1 ? (
                        <li className="page-item">
                            <button className="page-link" onClick={handlePreviousPage}>
                            Previous
                            </button>
                        </li>
                        ) : null}
                        {info.next_page != -1 ? (
                        <li className="page-item">
                            <button className="page-link" onClick={handleNextPage}>
                            Next
                            </button>
                        </li>
                        ) : null}
                    </ul>
                    </nav>
                </div>
            </div>       
        </div>
    </div>
  );
}