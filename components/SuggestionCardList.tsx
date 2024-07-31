import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

const NestedComments: React.FC<NestedCommentsProps> = ({
  comments,
  onSubmit,
  onEdit,
  onDelete,
  onUpvote,
  onDownvote,
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [replyContent, setReplyContent] = useState<string>('');

  const handleEdit = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleSubmit = () => {
    if (editingCommentId !== null) {
      onEdit(newCommentContent);
      setEditingCommentId(null);
    } else {
      onSubmit(newCommentContent);
      setNewCommentContent('');
    }
  };

  const handleReplySubmit = (commentId: number) => {
    onSubmit(replyContent);
    setReplyContent('');
  };

  const renderReplies = (replies: Comment[]) => (
    <View style={styles.repliesContainer}>
      {replies.map((reply) => (
        <View key={reply.id} style={styles.reply}>
          <Text style={styles.replyContent}>{reply.content}</Text>
          <View style={styles.replyFooter}>
            <Text style={styles.replyVotes}>Votes: {reply.votes}</Text>
            <Text style={styles.replyTimestamp}>{reply.timestamp}</Text>
            <TouchableOpacity onPress={() => onUpvote(reply.id)}>
              <Ionicons name="thumbs-up" size={20} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDownvote(reply.id)}>
              <Ionicons name="thumbs-down" size={20} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(reply.id)}>
              <Ionicons name="pencil" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(reply.id)}>
              <Ionicons name="trash" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {editingCommentId === reply.id && (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={replyContent}
                onChangeText={setReplyContent}
              />
              <Button title="Submit Reply" onPress={() => handleReplySubmit(reply.id)} />
            </View>
          )}
          {renderReplies(reply.replies)}
        </View>
      ))}
    </View>
  );

  return (
    <View>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.comment}>
          <Text style={styles.commentContent}>{comment.content}</Text>
          <View style={styles.commentFooter}>
            <Text style={styles.commentVotes}>Votes: {comment.votes}</Text>
            <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
            <TouchableOpacity onPress={() => onUpvote(comment.id)}>
              <Ionicons name="thumbs-up" size={20} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDownvote(comment.id)}>
              <Ionicons name="thumbs-down" size={20} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(comment.id)}>
              <Ionicons name="pencil" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(comment.id)}>
              <Ionicons name="trash" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {editingCommentId === comment.id && (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={newCommentContent}
                onChangeText={setNewCommentContent}
              />
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          )}
          {renderReplies(comment.replies)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  commentContent: {
    fontSize: 16,
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  commentVotes: {
    fontSize: 14,
    color: '#333',
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  editContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  reply: {
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 5,
  },
  replyContent: {
    fontSize: 14,
  },
  replyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  replyVotes: {
    fontSize: 12,
    color: '#333',
  },
  replyTimestamp: {
    fontSize: 10,
    color: '#999',
  },
});

export default NestedComments;
