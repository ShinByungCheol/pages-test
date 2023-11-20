import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import axios from 'axios';

export const SearchScreen = ({ navigation, route }) => {
  const {
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;

  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://port-0-capstone-backend-1d6du62aloxt3u8i.sel5.cloudtype.app/polls/search?title=` +
          searchQuery,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );
      console.log(searchQuery);
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error(
          'Failed to fetch messages:',
          response.data
        );
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    // Call the fetchData function to fetch messages when the component mounts
    fetchData();
  }, [searchQuery]);

  return (
    <View style={styles.main_page}>
      <View style={styles.main_Row}>
        <View style={styles.back_btn}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeScreen', {
                isLoggedIn: true,
                userId,
                jwtToken,
                nickname,
                updateDM2,
              })
            }
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.back_view3}>
          <Text style={styles.back_text}>
            투표 게시글 검색
          </Text>
        </View>
      </View>
      <View style={styles.search_input_View}>
        <TextInput
          style={styles.search_input_box}
          placeholder="검색 단어를 입력해주세요!"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Feather
            style={styles.search_btn}
            name="search"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.serach_result_view}>
          <FontAwesome
            name="th-list"
            size={22}
            color="#007BFF"
          />
          <Text style={styles.search_result_text}>
            검색결과
          </Text>
        </View>
        <View style={styles.serach_result_view2}>
          <Text style={styles.serach_result_title}>
            검색 결과로 나타나는 게시글 제목
          </Text>
          <Text style={styles.serach_result_sub}>
            본문은 아래에 동일한 라인으로 폰트사이즘나 축소
            최대 두줄 가능함, 두 줄 이상일 시 짤려서
            나타나도록 할 예정
          </Text>
          <View style={styles.search_result_row}>
            <AntDesign
              name="like2"
              size={20}
              color="#007BFF"
            />
            <Text style={styles.serach_result_like}>
              좋아요 수 | n시간/ n분/ n일 전
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
