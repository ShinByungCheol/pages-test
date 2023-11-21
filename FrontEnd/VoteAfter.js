import React, { useState } from 'react';
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

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') {
      setCommentError('내용을 입력하세요.');
      return;
    }

    const newComment = {
      text: commentText,
      likes: 0,
      reported: false,
      replies: [],
    };

    setComments((prevComments) => [
      ...prevComments,
      newComment,
    ]);
    setCommentText('');
    setCommentError('');
  };

  const Comment = ({ comment, index }) => {
    const commentTime = getCurrentTime();

    return (
      <View key={index}>
        <View style={styles.VoteAfter_View3_comment}>
          <Text style={styles.VoteAfter_View3_nickname}>
            {nickname}
          </Text>
          <Text style={styles.VoteAfter_View3_commenttime}>
            작성시간: {commentTime}
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

        <View style={styles.VoteAfter_View3_totalLike}>
          <AntDesign name="like2" size={18} color="blue" />
          <Text
            style={styles.VoteAfter_View3_totalLikenumber}
          >
            {getRecommendCount(comment)}
          </Text>
          {/* 좋아요합계*/}

          <View>
            <TouchableOpacity
              style={styles.VoteAfter_View3_recomment}
              onPress={() => handleReplyPress(index)}
            >
              <Entypo
                name="reply"
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {/* 답글버튼*/}

          <View>
            <TouchableOpacity
              style={styles.VoteBefore_View3_share}
              onPress={() => handleSendMessage(comment)}
            >
              <Entypo
                name="share"
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {/* 공유버튼*/}
        </View>
        <View>
          {comment.replies &&
            comment.replies.length > 0 && (
              <View>
                {comment.replies.map((reply, i) => (
                  <Text
                    key={i}
                    style={
                      styles.VoteAfter_View3_recommenttext
                    }
                  >
                    {reply.text}
                  </Text>
                ))}
              </View>
            )}
        </View>
        {/* 답글기능*/}

        <View style={styles.VoteBefore_View3_commentRow} />
      </View>
    );
  };

  const [heartType, setHeartType] = useState('empty');

  const handleHeartClick = async () => {
    setHeartType((prev) =>
      prev === 'empty' ? 'filled' : 'empty'
    );
    const data = {
      pollId: vote.id,
      nickname: nickname,
    };

    try {
      const response = await axios.post(
        'https://port-0-capstone-backend-1d6du62aloxt3u8i.sel5.cloudtype.app/polls/likes',
        data,
        {
          headers: {
            'AUTH-TOKEN': jwtToken,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error('Failed to likes:', response.data);
      }
    } catch (error) {
      console.error('게시글 좋아요 :', error);
    }

    console.log('userVotes : ', userVotes);
    console.log('vote : ', vote);
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now
      .getHours()
      .toString()
      .padStart(2, '0');
    const minutes = now
      .getMinutes()
      .toString()
      .padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  {
    /* 댓글작성시 현재시간 등록후 고정 */
  }

  const getRecommendCount = (comment) => {
    // 해당 댓글의 추천수를 가져오는 로직을 추가
    // 댓글 객체에 추천수를 저장하고 그 값을 반환하는 방식으로 구현
    return comment.recommendCount || 0;
  };

  const handleSendMessage = (comment) => {
    //쪽지를 보내는 로직을 추가

    console.log(`Sending a message to: ${comment.author}`);
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
    navigation.goBack();
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
      <ScrollView>
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
                <Entypo
                  name="heart"
                  size={30}
                  color="red"
                />
              )}
            </TouchableOpacity>
            {/* 좋아요 버튼: 클릭시 색상변경 */}
            <TouchableOpacity
              style={styles.VoteBefore_View1_share}
            >
              <Entypo
                name="share"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {/* 공유 버튼 */}
          </View>
        </View>
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
            <TouchableOpacity
              onPress={() => {
                setComments([...comments, commentText]);
                setCommentText('');
              }}
            ></TouchableOpacity>
          </View>
          {/* 댓글입력창 */}

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
            <TouchableOpacity
              style={styles.VoteAfter_View3_textinput}
              onPress={handleCommentSubmit}
            >
              <Entypo
                name="direction"
                size={24}
                color="tomato"
              />
            </TouchableOpacity>
          </View>
          {/* 댓글입력버튼 */}

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
