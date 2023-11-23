import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native';
import { styles } from './styles';
import { Alert } from 'react-native';
import axios from 'axios'; // Import axios for HTTP requests

export const VoteAfter = ({ navigation, route }) => {
  const {
    vote,
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
    userVotes,
  } = route.params;

  const [comments, setComments] = useState([]);
  const [pollOptions, setPollOptions] = useState([]);
  const newChoices = vote.choices.map((choice) => ({
    id: choice.id,
    text: choice.text,
    votes: 0, // 초기 투표 수를 0으로 설정
  }));
  const [commentText, setCommentText] = useState('');

  const [commentError, setCommentError] = useState('');

  const [commentBox, setCommentBox] = useState([]);
  // 댓글 생성
  const handleCommentSubmit = async () => {
    // 유효성 검사: 댓글 내용이 비어있는지 확인
    if (!commentText.trim()) {
      alert('댓글 내용을 입력하세요.');
      return;
    }
    const commentData = {
      content: commentText,
      uid: userId,
      pollId: vote.id,
    };

    // 서버로 댓글 전송
    try {
      const response = await axios.post(
        'https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/api/comments/' +
          userId +
          '/' +
          vote.id,
        commentData,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 201) {
        console.log('댓글 작성 성공:', response.data);

        // Update commentBox state with the new comment data
        setCommentBox((prevCommentBox) => [
          ...prevCommentBox,
          response.data,
        ]);

        setCommentText(''); // 댓글 작성 후 입력창 초기화
      } else {
        console.error('댓글 작성 실패:', response.data);
      }
    } catch (error) {
      console.error('댓글 작성 오류:', error);
    }
  };

  //게시글 id로 댓글 조회해서 받아오기
  useEffect(() => {
    const fetchcommentData = async () => {
      try {
        const response = await axios.get(
          'https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/api/comments/' +
            vote.id,
          {
            headers: {
              'AUTH-TOKEN': jwtToken,
            },
          }
        );

        if (response.status === 200) {
          // Assuming the response data is an array of messages
          const messagesData = response.data;
          console.log(
            '투표 id 보내서 댓글 조회 하기',
            JSON.stringify(response.data, null, 2)
          );
        } else {
          console.error(
            'Failed to fetch messages:',
            response.data
          );
        }
      } catch (error) {
        console.error('쪽지 데이터 가져오기:', error);
      }
    };
    // Call the fetchData function to fetch messages when the component mounts
    fetchcommentData();
  }, []);

  const Comment = ({ comment, index }) => {
    return (
      <View key={index}>
        <View style={styles.VoteAfter_View3_comment}>
          <Text style={styles.VoteAfter_View3_nickname}>
            작성자 :
          </Text>
          <Text style={styles.VoteAfter_View3_commenttime}>
            작성시간:
          </Text>
          {/* 작성시간 */}

          <View>
            <TouchableOpacity
              style={styles.VoteAfter_View3_report}
              onPress={() => handleReportPress(index)}
            >
              <AntDesign
                name="exclamationcircleo"
                size={18}
                color="red"
              />
            </TouchableOpacity>
          </View>
          {/* 신고버튼 */}

          <View style={styles.VoteAfter_View3_like}>
            <TouchableOpacity
              onPress={() => handleLikePress(index)}
            >
              <AntDesign
                name="like2"
                size={18}
                color="blue"
              />
            </TouchableOpacity>
          </View>
          {/* 추천버튼 */}
        </View>

        <View>
          <Text style={styles.VoteAfter_View3_text}>
            {comment.text}
          </Text>
        </View>
        {/* 댓글*/}

        <View style={styles.VoteBefore_View3_commentRow} />
      </View>
    );
  };

  const [heartType, setHeartType] = useState('empty');

  const handleHeartClick = async () => {
    const data = {
      pollId: vote.id,
      nickname: nickname,
    };

    console.log(data);

    try {
      const response = await axios.post(
        'https://port-0-capstone-project-2-ysl2bloxtgnwh.sel5.cloudtype.app/polls/likes',
        data,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);

        // Toggle the like state based on whether the user's nickname is in likedUser
        const isUserLiked =
          vote.likedUser.includes(nickname);
        setHeartType(isUserLiked ? 'empty' : 'filled');
      } else {
        console.error('Failed to likes:', response.data);
      }
    } catch (error) {
      console.error('게시글 좋아요 :', error);
    }

    console.log('userVotes : ', userVotes);
    console.log('vote : ', vote);
  };

  const handleLikePress = (index) => {
    // 추천 버튼 누를 때의 처리
    // index를 사용하여 해당 댓글의 상태를 업데이트 가능
    const updatedComments = comments.map((comment, i) =>
      i === index
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    );
    setComments(updatedComments);
  };

  const handleReportPress = (index) => {
    // 신고 버튼 누를 때의 처리
    // index를 사용하여 해당 댓글의 상태를 업데이트 가능
    const updatedComments = comments.map((comment, i) =>
      i === index ? { ...comment, reported: true } : comment
    );
    setComments(updatedComments);
  };

  const handleReplyPress = (index) => {
    // 답글 달기 버튼 누를 때의 처리
    // index를 사용하여 해당 댓글에 대한 답글 입력 등의 처리를 가능
    setReplyingIndex(index);
    setReplyText('');
    setShowReplyInput(true);
  };
  const handleGoBack = () => {
    // navigation.goBack()을 호출하여 이전 화면으로 이동
    navigation.goBack({});
  };
  const [showReplyInput, setShowReplyInput] =
    useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyingIndex, setReplyingIndex] = useState(null);
  const handleAddReply = () => {
    if (replyText.trim() === '') {
      setCommentError('답글 내용을 입력하세요.');
      return;
    }

    const updatedComments = comments.map(
      (comment, index) => {
        if (index === replyingIndex) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { text: replyText, author: 'CurrentUser' },
            ],
          };
        }
        return comment;
      }
    );

    setComments(updatedComments);
    setShowReplyInput(false);
    setReplyText('');
    setReplyingIndex(null);
    setCommentError('');
  };
  {
    /* 답글추가로직 */
  }

  return (
    <View style={styles.status_x}>
      <View style={styles.main_Row12}>
        <View style={styles.back_view12}>
          <TouchableOpacity onPress={handleGoBack}>
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
          {/* 좋아요 버튼: 클릭시 색상변경 */}
          <TouchableOpacity
            style={styles.VoteBefore_View1_share}
          >
            <Entypo name="share" size={24} color="black" />
          </TouchableOpacity>
          {/* 공유 버튼 */}
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
          {/* 본문내용 표시 */}

          {vote.choices.map((choice) => {
            const isSelectedByUser = userVotes.some(
              (userVote) => userVote.choiceId === choice.id
            );

            return (
              <View
                key={choice.id}
                style={[
                  styles.VoteBefore_View2_Votebotton2,
                  {
                    backgroundColor: isSelectedByUser
                      ? '#4B89DC'
                      : 'transparent',
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelectedByUser
                      ? 'white'
                      : 'black',
                  }}
                >
                  {choice.text}
                </Text>
              </View>
            );
          })}

          <View style={styles.VoteBefore_View2_Row}></View>
          {/* 댓글창 경계선 */}

          <View>
            <Text style={styles.VoteBefore_View3_comment}>
              댓글 {comments.length}
            </Text>
          </View>
          {/* 댓글수 표시 */}

          <TouchableOpacity>
            <Text style={styles.VoteBefore_View3_Sort}>
              정렬기준
            </Text>
          </TouchableOpacity>
          {/* 댓글정렬버튼 */}

          <View style={styles.VoteBefore_View3_Row2}></View>
          {/* 댓글 윗경계 */}

          <View>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                index={index}
              />
            ))}
          </View>
          {/* 댓글출력창 */}

          {showReplyInput && (
            <View>
              <TextInput
                style={styles.VoteAfter_View3_commenttext}
                placeholder="답글을 입력하세요."
                value={replyText}
                onChangeText={(text) => setReplyText(text)}
              />
              <TouchableOpacity
                style={styles.VoteAfter_View3_textinput}
                onPress={handleAddReply}
              >
                <Entypo
                  name="direction"
                  size={24}
                  color="tomato"
                />
              </TouchableOpacity>
              {commentError !== '' && (
                <Text style={styles.VoteAfter_View3_error}>
                  {commentError}
                </Text>
              )}
            </View>
          )}
          {/* 답글출력창 */}

          <View style={styles.VoteAfter_View3_comment}>
            {/* 댓글입력창 */}
            <TouchableOpacity
              onPress={() => {
                setComments([...comments, commentText]);
                setCommentText('');
              }}
            ></TouchableOpacity>
          </View>

          <View>
            <TextInput
              style={styles.VoteAfter_View3_commenttext}
              placeholder="댓글을 입력하세요."
              value={commentText}
              onChangeText={(text) => {
                setCommentText(text);
                setCommentError('');
              }}
            />
          </View>
          {/* 댓글입력창 텍스트 */}

          <View>
            {/* 댓글입력버튼 */}
            <TouchableOpacity
              style={styles.VoteAfter_View3_textinput}
              onPress={handleCommentSubmit}
            >
              <Entypo
                name="direction"
                size={24}
                color="#4B89DC"
              />
            </TouchableOpacity>
          </View>

          <View>
            {commentError !== '' && (
              <Text style={styles.VoteAfter_View3_error}>
                {commentError}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
