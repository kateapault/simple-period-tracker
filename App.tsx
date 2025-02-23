/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BasePage from './src/views/BasePage';
import {DB} from '@op-engineering/op-sqlite';
import { db } from './src/services/dbService';
import { createTables, getAllPeriodDateEntries } from './src/services/dbService';

function App(): React.JSX.Element {
  const startUp = async (db: DB) => {
    await createTables(db);
  }

  useEffect(() => {
    startUp(db);
    return () => {}
  },[])

  return (
    <View>
      <BasePage db={db} />
    </View>
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
