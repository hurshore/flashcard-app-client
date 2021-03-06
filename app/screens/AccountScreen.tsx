import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Screen from '../components/Screen';
import Icon from '../components/Icon';
import colors from '../config/colors';
import { ListItem, ListItemSeparator } from '../components/lists';
import useAuth from '../auth/useAuth';

const menuItems = [
  {
    title: 'My Flashcards',
    icon: {
      name: 'cards',
      backgroundColor: colors.secondary,
    },
    // targetScreen: routes.MESSAGES,
  },
  {
    title: 'Dark mode',
    icon: {
      name: 'moon-waning-crescent',
      backgroundColor: colors.medium,
    },
  },
];

const AccountScreen = ({}) => {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.container}>
          <ListItem
            title={user ? user.name : 'user@domain.com'}
            subtitle={user?.email}
            IconComponent={
              <Icon name="account" backgroundColor={colors.primary} size={50} />
            }
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
                onPress={() => console.log(item)}
              />
            )}
          />
        </View>
        <View style={styles.container}>
          <ListItem
            title="Log out"
            IconComponent={
              <Icon name="logout" backgroundColor={colors.danger} />
            }
            onPress={logOut}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
