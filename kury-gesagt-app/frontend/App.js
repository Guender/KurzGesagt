// App.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://<YOUR_BACKEND_URL>/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.text);
      setImage(data.image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask a question..."
        value={question}
        onChangeText={setQuestion}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {answer && <Text style={styles.answer}>{answer}</Text>}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
  answer: { marginTop: 20, fontSize: 18 },
  image: { marginTop: 20, width: 200, height: 200 },
});
