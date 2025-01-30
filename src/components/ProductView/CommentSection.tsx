import React, { useState } from 'react';
import { Comment, Product } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateProduct } from '../../store/productSlice';

interface CommentSectionProps {
  product: Product;
}

export const CommentSection: React.FC<CommentSectionProps> = (
  { product }
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return null;
    }

    const comment: Comment = {
      id: Date.now(),
      productId: product.id,
      description: newComment,
      date: new Date().toISOString()
    };

    const updatedProduct = {
      ...product,
      comments: [...product.comments, comment]
    };

    await dispatch(updateProduct(updatedProduct));
    setNewComment('');
  };

  const handleDeleteComment = async (commentId: number) => {
    const updatedProduct = {
      ...product,
      comments: product.comments.filter(c => c.id !== commentId)
    };

    await dispatch(updateProduct(updatedProduct));
  };

  return (
    <div className="section">
      <h2 className="title is-4">Comments</h2>
      
      <div className="field">
        <div className="control">
          <textarea 
            className="textarea"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button 
            className="button is-primary"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Add Comment
          </button>
        </div>
      </div>

      <div className="comments mt-4">
        {product.comments.length === 0 ? (
          <p className="has-text-grey">No comments yet</p>
        ) : (
          product.comments.map((comment) => (
            <div key={comment.id} className="box">
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <p className="has-text-grey">
                      {new Date(comment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button 
                      className="delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                  </div>
                </div>
              </nav>
              <p>{comment.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
