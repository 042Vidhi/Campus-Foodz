import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import NestedComments from '@/components/SuggestionCardList'; 
import { suggestionsData } from '@/api/dummydata/SuggestionList';

export default function SuggestionScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestions, setSuggestions] = useState(suggestionsData);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');

  const handlePostSuggestion = () => {
    setSuggestions([
      ...suggestions,
      {
        id: suggestions.length + 1,
        content: suggestionText,
        votes: 0,
        timestamp: new Date().toLocaleString(),
        replies: [],
      },
    ]);
    setSuggestionText('');
    setModalVisible(false);
  };

  const handleSubmitComment = (content: string) => {
    if (selectedSuggestionId !== null) {
      setSuggestions(suggestions.map((suggestion) =>
        suggestion.id === selectedSuggestionId
          ? {
              ...suggestion,
              replies: [
                ...suggestion.replies,
                {
                  id: suggestion.replies.length + 1,
                  content,
                  votes: 0,
                  timestamp: new Date().toLocaleString(),
                  replies: [],
                },
              ],
            }
          : suggestion
      ));
      setCommentText('');
      setSelectedSuggestionId(null);
    }
  };

  const handleEditComment = (content: string) => {
    // Logic for editing a comment
    // (Update comment content here)
  };

  const handleDeleteComment = (commentId: number) => {
    // Logic for deleting a comment
    setSuggestions(suggestions.map((suggestion) => ({
      ...suggestion,
      replies: suggestion.replies.filter((reply) => reply.id !== commentId),
    })));
  };

  const handleUpvote = (commentId: number) => {
    // Logic for upvoting a comment
    setSuggestions(suggestions.map((suggestion) => ({
      ...suggestion,
      replies: suggestion.replies.map((reply) =>
        reply.id === commentId
          ? { ...reply, votes: reply.votes + 1 }
          : reply
      ),
    })));
  };

  const handleDownvote = (commentId: number) => {
    // Logic for downvoting a comment
    setSuggestions(suggestions.map((suggestion) => ({
      ...suggestion,
      replies: suggestion.replies.map((reply) =>
        reply.id === commentId
          ? { ...reply, votes: reply.votes - 1 }
          : reply
      ),
    })));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        renderItem={({ item }) => (
          <View style={styles.suggestionItem}>
            <Text style={styles.suggestionText}>{item.content}</Text>
            <View style={styles.suggestionFooter}>
              <Text style={styles.upvotes}>Votes: {item.votes}</Text>
              <Text style={styles.dateTime}>{item.timestamp}</Text>
              <TouchableOpacity onPress={() => setSelectedSuggestionId(item.id)}>
                <Text style={styles.commentText}>Comment</Text>
              </TouchableOpacity>
            </View>
            <NestedComments
              comments={item.replies}
              onSubmit={handleSubmitComment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your suggestion"
            value={suggestionText}
            onChangeText={setSuggestionText}
          />
          <Button title="Post Suggestion" onPress={handlePostSuggestion} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      {selectedSuggestionId !== null && (
        <Modal visible={selectedSuggestionId !== null} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your comment"
              value={commentText}
              onChangeText={setCommentText}
            />
            <Button title="Post Comment" onPress={() => handleSubmitComment(commentText)} />
            <Button title="Cancel" onPress={() => setSelectedSuggestionId(null)} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    flexGrow: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    backgroundColor: '#f44336',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 36,
    lineHeight: 36,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  suggestionText: {
    fontSize: 16,
  },
  suggestionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upvotes: {
    fontSize: 14,
    color: '#666',
  },
  dateTime: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#007bff',
  },
});
