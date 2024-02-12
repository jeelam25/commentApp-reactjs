import { Component } from "react";
import {v4 as uuidv4} from 'uuid'

import ComentItem from "../CommentItem/ComentItem.js";

import './styles.css'

const initialContainerBackgroundClassName = [
    'amber', 'blue', 'orange', 'emerald', 'teal', 'red', 'light-blue'
]

class Comments extends Component{
    state = {
        nameInput: '',
        commentInput: '',
        uploadImage: '',
        commentsList: [],
    }

    toggleIsLiked = id => {
        this.setState(prevState => ({
            commentsList: prevState.commentsList.map(eachComment => {
                if(id === eachComment.id){
                    return {...eachComment, isLiked: !eachComment.isLiked}
                }
                return eachComment
            })
        }))
    }

    deleteComment = commentId => {
        const {commentsList} = this.state

        this.setState({
            commentsList: commentsList.filter(comment => comment.id !== commentId)
        })
    }


    renderCommentsList = () => {
        const {commentsList} = this.state

        return commentsList.map(eachComment => (
            <ComentItem 
            key = {eachComment.id}
            commentDetails = {eachComment}
            toggleIsLiked = {this.toggleIsLiked}
            deleteComment = {this.deleteComment}
            />
        ))

    }

    getLocalCom = () => {
        let stringifycommentList = localStorage.getItem("comList")
        let parseCommetList = JSON.parse(stringifycommentList);
        if (parseCommetList === null){
            return this.setState({commentsList: []})
        } else{
            return this.setState({commentsList: parseCommetList})
        }
    }

    onClickRemoveComments = () => {
        localStorage.removeItem('comList')
    }

    componentDidMount(){
        this.getLocalCom()
    }    

    onClickSaveComments = () => {
        const {commentsList} = this.state
        localStorage.setItem("comList", JSON.stringify(commentsList));
    }

    onAddComment = event => {
        event.preventDefault()
        const {nameInput, commentInput, uploadImage} = this.state
        const initialBackgroundColorClassName = `initial-container ${initialContainerBackgroundClassName[
            Math.ceil(Math.random() * initialContainerBackgroundClassName.length - 1,)
        ]}`

        const newComent = {
            id: uuidv4(),
            name: nameInput,
            comment: commentInput,
            uploadImage: uploadImage,
            date: new Date(),
            isLiked: false,
            initialClassName : initialBackgroundColorClassName
        }

        this.setState(prevState => ({
            commentsList: [...prevState.commentsList, newComent],
            nameInput: '',
            commentInput:'',
            uploadImage: ''
        }))
    }

    onChangeCommentInput = event => {
        this.setState({commentInput: event.target.value})
    }

    onChangeNameInput = event => {
        this.setState({nameInput: event.target.value})
    }

    onChangePhotoInput = event => {
        const uploadImage = event.target.files[0]
        this.setState({uploadImage: uploadImage})

    }

    render(){
        const {nameInput, commentInput,  commentsList} = this.state

        return (
            <div className="app-container">
                <div className = "comments-container">
                    <h1 className="app-heading">Comments</h1>
                    <div className="comments-inputs">
                        <form className="form" onSubmit={this.onAddComment}>
                            <p className="form-description">Say something about my skills</p>
                            <input type = "text" className="name-input" placeholder="Your Name" value = {nameInput} onChange = {this.onChangeNameInput}/>
                            <textarea rows='6' className="comment-input" placeholder="Your Commnet" value = {commentInput} onChange = {this.onChangeCommentInput}/>
                            <input type = "file" name ="upload_file" placeholder="Enter Name" onChange = {this.onChangePhotoInput}/>
                            <button type = "submit" className="add-button">Add Comment</button>
                        </form>
                        <img className="image" src = "./images/display.jpg" alt = "members"/>
                    </div>
                    <hr className="line"/>
                    <p className="heading">
                        <span className="comments-count">{commentsList.length}</span>
                        Comments
                    </p>
                    <ul className="comments-list">{this.renderCommentsList()}</ul>
                    <div className="localStorage-container-buttons">
                        <button className="save" type = 'button' onClick = {this.onClickSaveComments}>Save All Comments</button>
                        <button className="remove" type = 'button' onClick = {this.onClickRemoveComments}>Remove All Comments</button>
                    </div>    
                </div>     
            </div>
        )
    }
}

export default Comments