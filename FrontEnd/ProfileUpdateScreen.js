import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const ProfileUpdateScreen = ({
  navigation,
  route,
}) => {
  // const { userId, isLoggedIn, jwtToken, nickname } = route.params;
  const {
    userId,
    isLoggedIn,
    jwtToken,
    nickname,
    updateDM2,
  } = route.params;

  const [currentPassword, setCurrentPassword] =
    useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');
  const [mbti, setMbti] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const validatePassword = () => {
    if (password.length < 8 || password.length > 12) {
      setAlertMessage(
        '비밀번호를 8 ~ 12 자리로 입력해 주세요'
      );
      return false;
    } else if (password !== confirmPassword) {
      setAlertMessage('비밀번호가 일치하지 않습니다');
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    const isValid = validatePassword();
    if (isValid) {
      try {
        // Call your authentication service or API to change the password
        // Replace the following line with your actual password change logic
        // await authService.changePassword(currentPassword, newPassword);

        // Display success message or navigate to another screen
        Alert.alert('알림', '비밀번호 변경 완료');
      } catch (error) {
        console.error('Password change failed:', error);
        Alert.alert('알림', '비밀번호 변경에 실패했습니다');
      }
    }
  };

  const handleChangeMbti = async () => {
    try {
      // Call your API or service to update the MBTI
      // Replace the following line with your actual MBTI change logic
      // await mbtiService.updateMbti(userId, mbti);

      // Display success message
      Alert.alert('알림', 'MBTI가 변경되었습니다');
    } catch (error) {
      console.error('MBTI change failed:', error);
      Alert.alert('알림', 'MBTI 변경에 실패했습니다');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileScreen', {
                isLoggedIn: true,
                userId,
                jwtToken,
                nickname,
                updateDM2,
              })
            }
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header_center}>
          <Text style={styles.back_text}>
            개인 프로필 수정
          </Text>
        </View>
        <View style={styles.header_right}></View>
      </View>

      <View style={styles.profile_infos}>
        <View style={styles.image} />
        <View style={styles.name_section}>
          <Text style={styles.user_name_text}>
            LayoutTester
          </Text>
          <Text style={styles.email_text}>
            example@example.com
          </Text>
        </View>
      </View>

      <View style={styles.text_input_container}>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              비밀번호 변경
            </Text>
          </View>
          <TextInput
            placeholder="비밀번호는 8 ~ 12자리"
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              비밀번호 확인
            </Text>
          </View>
          <TextInput
            placeholder="위에 입력한 내용과 동일하게 입력"
            style={styles.signup_page_inputfield}
          />
        </View>
        <View style={styles.update_button_container}>
          <TouchableOpacity
            style={styles.update_button}
            onPress={handleChangePassword}
          >
            <Text style={styles.button_text}>
              비밀번호 변경하기
            </Text>
          </TouchableOpacity>
        </View>

        <Text>{'\n'}</Text>

        <View style={styles.input_label_view}>
          <View style={styles.signup_page_label_view}>
            <Text style={styles.signup_page_label_text}>
              MBTI
            </Text>
          </View>
          <TextInput
            placeholder="바뀌었다면 재입력 가능하게"
            style={styles.signup_page_inputfield}
            value={mbti}
            onChangeText={(text) => setMbti(text)}
          />
        </View>
        <View style={styles.update_button_container}>
          <TouchableOpacity
            style={styles.update_button}
            onPress={handleChangeMbti}
          >
            <Text style={styles.button_text}>
              MBTI 변경하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text>{alertMessage}</Text>
    </SafeAreaView>
  );
};
