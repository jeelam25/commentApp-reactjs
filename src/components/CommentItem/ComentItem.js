import {formatDistanceToNow} from 'date-fns'

import './styles.css'

const ComentItem = props => {
    const {commentDetails, toggleIsLiked, deleteComment} = props
    const {id, name, comment, initialClassName, date, isLiked, uploadImage} = commentDetails
    const inital = name ? name[0].toUpperCase() : ''
    const postedTime = formatDistanceToNow(date)
    const likeTextClassName = isLiked ? 'button active' : 'button'
    const likeImageUrl = isLiked ? './images/like-highlight.jpg' : './images/like-to-click.jpg'

    const onClickLike = () => {
        toggleIsLiked(id)
    }

    const onClickDelete = () => {
        deleteComment(id)
    }


  return (
    <li className='comment-item'>
        <div className='comment-container'>
            <div className={initialClassName}>
                <p className='initial'>{inital}</p>
            </div>
            <div>
                <div className='username-time-container'>
                    <p className='username'>
                        {name}
                    </p>
                    <p className='time'>{postedTime}</p>
                </div>
                <p className='comment'>{comment}</p>
                <img src = {uploadImage} alt = "pic"/>
            </div>
        </div>
        <div className='buttons-container'>
            <div className='like-container'>
                <img src = {likeImageUrl} alt = "like" className="like-image"/>
                <button className={likeTextClassName} type = "button" onClick= {onClickLike}>Like</button>
            </div>
            <button className='button' type = "button" onClick = {onClickDelete}>
                <img src ="./images/delete.jpg" alt = "delete" className='delete'/>
            </button>
        </div>
        <hr className='comment-line'/>
    </li>
  )
}

export default ComentItem
