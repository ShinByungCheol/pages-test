import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import { Alert } from 'react-native';
import axios from 'axios'; // Import axios for HTTP requests

export const VoteBefore = ({ navigation, route }) => {
  const {
    category,
    vote,
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;

  const [pollOptions, setPollOptions] = useState([]);

  useEffect(() => {
    // Assuming vote.choices is an array of choice objects received from the server
    setPollOptions(
      vote.choices.map((choice) => ({
        id: choice.id,
        text: choice.text,
        votes: 0,
        isSelected: false,
      }))
    );
  }, [vote]);

  const [heartType, setHeartType] = useState('empty');

  const handleHeartClick = () => {
    setHeartType((prev) =>
      prev === 'empty' ? 'filled' : 'empty'
    );
  };

  const handleVoteOption = (optionId) => {
    const updatedOptions = pollOptions.map((option) => ({
      ...option,
      isSelected: option.id === optionId,
    }));
    setPollOptions(updatedOptions);
  };

  const handleVote = async () => {
    const selectedOption = pollOptions.find(
      (option) => option.isSelected
    );

    if (!selectedOption) {
      Alert.alert('알림', '투표항목을 선택해주세요');
      return;
    }
    // Send vote data to the server
    const VoteDto = {
      pollId: vote.id, // Replace with the actual poll ID
      choiceId: selectedOption.id, // Replace with the actual choice ID
      nickname: nickname,
    };
    console.log(VoteDto);
    try {
      const response = await axios.post(
        'https://port-0-capstone-backend-1d6du62aloxt3u8i.sel5.cloudtype.app/votes',
        VoteDto,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );
      if (response.status === 201) {
        console.log('투표 성공:', response.data);
      } else {
        console.error('투표 실패:', response.data);
      }
    } catch (error) {
      console.error('서버랑 오류 :', error);
    }
    navigation.navigate('HomeScreen', {
      userId,
      isLoggedIn,
      jwtToken,
      nickname,
      updateDM2,
    });
  };
  const handleNavigateToVoteAfter = () => {
    navigation.navigate('VoteAfter', {
      userId,
      isLoggedIn,
      jwtToken,
      nickname,
      updateDM2,
    });
  };

  const home = () => {
    navigation.navigate('HomeScreen', {
      userId,
      isLoggedIn,
      jwtToken,
      nickname,
      updateDM2,
    });
  };

  return (
    <View style={styles.status_x}>
      <View style={styles.main_Row12}>
        <View style={styles.back_view12}>
          <TouchableOpacity onPress={home}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            onPress={handleHeartClick}
            style={styles.VoteBefore_View1_heart}
          >
            {heartType === 'empty' ? (
              <Entypo
                name="heart-outlined"
                size={30}
                color="black"
              />
            ) : (
              <Entypo name="heart" size={30} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.VoteBefore_View1_share}
          >
            <Entypo name="share" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.VoteBefore_View1_All}>
          <View>
            <Text style={styles.VoteBefore_View1_title}>
              {vote.title}
            </Text>
          </View>

          <View style={styles.text_box1}>
            <Text style={styles.VoteBefore_View1_day}>
              투표 기간 설정: {vote.createdAt}
            </Text>

            <Text style={styles.VoteBefore_View1_host}>
              주최자 : {vote.createdBy}
            </Text>
          </View>

          <View style={styles.VoteBefore_View1_row}></View>

          <Text style={styles.VoteBefore_View2_content}>
            {vote.question}
          </Text>

          {pollOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.VoteBefore_View2_Votebotton,
                {
                  backgroundColor: option.isSelected
                    ? '#4B89DC'
                    : 'transparent',
                },
              ]}
              onPress={() => handleVoteOption(option.id)}
            >
              {option.isSelected && (
                <Entypo
                  name="check"
                  size={20}
                  color={
                    option.isSelected ? 'white' : 'dimgray'
                  }
                  style={{ marginRight: 5 }}
                />
              )}
              <Text
                style={{
                  color: option.isSelected
                    ? 'white'
                    : 'dimgray',
                }}
              >
                {option.text}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={styles.VoteBefore_View2_Row}></View>

          <Text style={styles.VoteBefore_View3_comment}>
            댓글 10
          </Text>

          <View
            style={styles.VoteBefore_View3_warning}
          ></View>

          <View>
            <TouchableOpacity
              onPress={handleVote}
              style={styles.VoteBefore_View3_Votebotton}
            >
              <Text
                style={
                  styles.VoteBefore_View3_Votebottontext
                }
              >
                선택한 버튼으로 투표하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
