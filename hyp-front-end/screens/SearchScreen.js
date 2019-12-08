import React, { useState } from 'react';
import { 
  StyleSheet,  
  View, 
  FlatList, 
  Button,
  TextInput
} from 'react-native';
import SearchField from '../components/SearchField'

export default function SearchScreen(props) {
  const [value, setChangeText] = React.useState('');

  const getValue = text => console.log(text)

  return (
    <View style={styles.screen}>
      {/* <SearchField visible={isAddMode} getValue={getValue} /> */}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setChangeText(text)}
        value={value}
      />
      <Button title={"Search"} onPress={() => {
        if (value !== '')
        props.navigation.navigate('SearchResultsScreen')
      }}/> 
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 100
  },
}) 

      {/* <FlatList 
        keyExtractor={(item, index) => item.id}
        data={courseGoals} 
        renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={handleGoalDelete} title={itemData.item.val}/> }
      />  */}

        // const handleClick = (goal) => {
  //   setCourseGoals([
  //     ...courseGoals, 
  //     { id: Math.random().toString(), val: goal }
  //   ]);
  //   setIsAddMode(false)
  // } 

  // const handleGoalDelete = goalId => {
  //   setCourseGoals(currentGoals => {
  //     return currentGoals.filter(goal => goal.id !== goalId)
  //   })
  // }
