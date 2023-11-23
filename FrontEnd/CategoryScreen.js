import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import React from 'react';
import axios from 'axios';

export const CategoryScreen = ({ navigation, route }) => {
  const {
    category,
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
    filteredVotes,
  } = route.params;
  const handleGoBack = () => {
    // navigation.goBack()을 호출하여 이전 화면으로 이동
    navigation.goBack();
  };
  const handleVotePress = async (vote) => {
    try {
      const response = await axios.get(
        `https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/votes/ok/${nickname}`,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 200) {
        const userVotes = response.data;

        // Check if the user has voted for the selected poll
        const hasVoted = userVotes.some(
          (userVote) => userVote.pollId === vote.id
        );
        console.log(vote);
        // Navigate to 'VoteBefore' or 'VoteAfter' based on the voting status
        navigation.navigate(
          hasVoted ? 'VoteAfter' : 'VoteBefore',
          {
            category,
            vote,
            isLoggedIn,
            userId,
            jwtToken,
            nickname,
            updateDM2,
            userVotes, // You can pass userVotes if needed in 'VoteAfter'
          }
        );
      } else {
        console.error(
          'Failed to fetch user votes:',
          response.data
        );
      }
    } catch (error) {
      console.error('Error fetching user votes:', error);
    }
  };
  return (
    <View style={styles.main_page}>
      <View style={styles.main_Row}>
        <View style={styles.back_view}>
          <TouchableOpacity onPress={handleGoBack}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.back_title_view}>
          <Text style={styles.back_text}>{category}</Text>
        </View>
        <View style={styles.standard_view}>
          <Text style={styles.standard_text}>정렬기준</Text>
        </View>
      </View>
      <View style={styles.category_post_view}>
        {filteredVotes.map((vote, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleVotePress(vote)}
          >
            <View style={styles.category_post_box}>
              <View style={styles.category_post_text}>
                <Text style={styles.category_post_title}>
                  {vote.title}
                </Text>
                <Text style={styles.category_post_sub}>
                  {vote.question}
                </Text>
              </View>
              <View style={styles.category_post_like}>
                <AntDesign
                  name="like2"
                  size={20}
                  color="#007BFF"
                />
                <Text
                  style={styles.category_post_like_text}
                >
                  좋아요 수 | n시간/ n분/ n일 전
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
