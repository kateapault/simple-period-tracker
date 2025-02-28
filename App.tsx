/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  SafeAreaView,
} from 'react-native';


import BasePage from './src/views/BasePage';
import {DB} from '@op-engineering/op-sqlite';
import { opendb } from './src/services/dbService';
import { createTables, getAllPeriodDateEntries } from './src/services/dbService';

function App(): React.JSX.Element {
  const [db, setDb] = useState<DB>()

  const startUp = async () => {
    const db = await opendb('mydata.sqlite','db',true)
    await createTables(db);
    setDb(db);
  }

  useEffect(() => {
    startUp();
    return () => {}
  },[])

  return (
    <SafeAreaView>
      <BasePage db={db} />
    </SafeAreaView>
  );
}
//

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
