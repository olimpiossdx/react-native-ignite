import React from 'react';
import { View, Text, StyleSheet, TextInput, Platform, TouchableOpacity } from 'react-native';

export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Jujé</Text>
      <Text>Ignite</Text>
      <TextInput
        placeholder="New skill"
        placeholderTextColor="#555"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { marginTop: 50 }]}>
        My skills
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: '#121015',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',,
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  button: {
    backgroundColor: '#a370f7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
