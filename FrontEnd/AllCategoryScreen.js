import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AllCategoryScreen = ({
  navigation,
  route,
}) => {
  const { categories } = route.params;
  const {
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;
  // 이 부분에 상수 정의
  const [updateDM, setUpdateDM] = useState(updateDM2);
  const titles = [
    '정치 이대로 괜찮을까?',
    '공기밥 가격 2000원 실화..?',
    '해외 축구는 여기로!',
    '현대 미술과 문화',
    '사회 문제는 여기로!',
    '게임 같이 할 사람!',
    '난 고양이 키우는데 너는?',
    '어떤 음식이 최고야?',
  ];
  const [votes, setVotes] = useState([]);

  const handleCategoryPress = (selectedCategory) => {
    // Filter votes for the selected category
    const filteredVotes = votes.filter(
      (vote) => vote.category === selectedCategory
    );

    // Navigate to CategoryScreen with category and filteredVotes
    navigation.navigate('CategoryScreen', {
      category: selectedCategory,
      isLoggedIn,
      userId,
      jwtToken,
      nickname,
      updateDM2,
      filteredVotes,
    });
  };
  useEffect(() => {
    setUpdateDM(updateDM2);
  }, [updateDM2]);
  // 투표 게시글 받아오기
  useEffect(() => {
    const voteData = async () => {
      try {
        const response = await axios.get(
          'https://port-0-capstone-backend-1d6du62aloxt3u8i.sel5.cloudtype.app/polls/all',
          {
            headers: {
              'AUTH-TOKEN': jwtToken,
            },
          }
        );

        if (response.status === 200) {
          const votesData = response.data;

          if (Array.isArray(votesData)) {
            const formattedVotes = votesData.map(
              (vote) => ({
                category: vote.category,
                title: vote.title,
                user: vote.user,
                question: vote.question,
                choices: (vote.choiceDtos || []).map(
                  (choice) => ({
                    id: choice.id,
                    text: choice.text,
                  })
                ),
              })
            );

            // Set votes only if there is data
            if (formattedVotes.length > 0) {
              setVotes(formattedVotes);
            }
          } else {
            console.error(
              'Invalid votes data format:',
              votesData
            );
          }
        } else {
          console.error(
            'Failed to fetch votes:',
            response.data
          );
        }
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };

    // Call the fetchData function to fetch votes when the component mounts
    voteData();
  }, [updateDM]);

  return (
    <View>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
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
        <View style={styles.back_title_view}>
          <Text style={styles.back_text}>
            모든 카테고리
          </Text>
        </View>
      </View>
      <View style={styles.AllCategory_View}>
        <View style={styles.Allcategory_category_View}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={styles.main_Row}>
                <MaterialIcons
                  name="category"
                  size={24}
                  color="black"
                />
                <Text
                  style={styles.Allcategory_category_text}
                >
                  {category}
                </Text>
              </View>
              <Text style={styles.Allcategory_title_text}>
                {titles[index]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};
