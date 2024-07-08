

import React from 'react'
import { Text,View } from 'react-native'
import { Icon, Provider, SearchBar, TabBar  } from '@ant-design/react-native'
import { primary } from '../../utils/colors'
import ListContactScreen from '../list_contact'

const MainScreen = () => {

    const[selectedTab, setSelectedTab] = React.useState('blueTab')
    
    const onChangeTab = (tab: string) => {
        setSelectedTab(tab)
    }



  return (
    <TabBar
        unselectedTintColor="#949494"
        tintColor={primary}
        barTintColor="#f5f5f5">
        <TabBar.Item
          title="List Contact"
          icon={<Icon name="ordered-list" />}
          selected={selectedTab === 'blueTab'}
          onPress={() => onChangeTab('blueTab')}>
         <ListContactScreen/>
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="heart" />}
          title="Favorite"
        //   badge={2}
          selected={selectedTab === 'redTab'}
          onPress={() => onChangeTab('redTab')}>
          <Text>asas</Text>
        </TabBar.Item>
        {/* <TabBar.Item
          icon={<Icon name="like" />}
          title="Friend"
          selected={selectedTab === 'greenTab'}
          onPress={() => onChangeTab('greenTab')}>
          {renderContent('Friend Tab')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="My"
          selected={selectedTab === 'yellowTab'}
          onPress={() => onChangeTab('yellowTab')}>
          {renderContent('My Tab')}
        </TabBar.Item> */}
      </TabBar>

  )
}

export default MainScreen