import { StyleSheet, Dimensions } from 'react-native';

export const window = Dimensions.get('window');
export const SCREEN_WIDTH = Dimensions.get('window').width;

export var w = window.width;
export var h = window.height;

export const styles = StyleSheet.create({
  //HomeScreen//////////////////////////////////////////////////////////////////////
  // 좌우
  main_Row: {
    flexDirection: 'row',
  },
  // 메인 페이지
  main_Page: {
    marginTop: h * 0.08,
    marginLeft: w * 0.085,
    marginBottom: h * 0.05,
  },

  // 메인 타이틀
  main_title: {
    fontSize: h * 0.035,
    fontWeight: 'bold',
    marginTop: h * 0.011,
    marginLeft: w * 0.005,
  },
  // 더보기
  main_plus: {
    fontWeight: 'bold',
    marginTop: h * 0.035,
    marginLeft: w * 0.55,
    fontSize: h * 0.015,
  },

  // 인기 투표 제목
  popular_vote_title: {
    fontWeight: 'bold',
    marginTop: h * 0.03,
    marginLeft: w * 0.005,
    fontSize: h * 0.023,
  },
  // 인기 투표 더 보기
  popular_vote_plus: {
    color: '#BDBDBD',
    marginTop: h * 0.034,
    marginLeft: w * 0.55,
  },
  popular_vote_arrow: {
    color: '#BDBDBD',
    marginTop: h * 0.035,
    marginLeft: w * 0.01,
  },
  // 투표 게시글 박스
  box: {
    borderRadius: h * 0.02,
    width: w * 0.82,
    marginTop: h * 0.01,
    marginRight: w * 0.1,
    height: h * 0.33,
  },
  // 게시글 박스 안의 박스
  boxinbox: {
    borderRadius: h * 0.02,

    position: 'absolute',
    left: w * 0.057, // 왼쪽에서 50 포인트
    top: h * 0.2, // 위에서 100 포인트
    width: w * 0.71, // 가로 100 포인트
    height: h * 0.1, // 가로 100 포인트
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  boxinbox1: { width: w * 0.47 },
  boxinbox2: {
    position: 'absolute',
    marginTop: h * 0.08,
    width: w * 0.07,
  },
  boxintitle: {
    fontSize: h * 0.02,
    fontWeight: 'bold',
    marginTop: h * 0.03,
    marginLeft: w * 0.04,
  },
  boxintext: {
    fontSize: h * 0.015,
    marginTop: h * 0.01,
    marginLeft: w * 0.04,
  },
  // 알람, 프로필
  after_login_view: {
    flexDirection: 'row',
    marginLeft: w * 0.25,
  },
  // 알람 버튼
  alarm_btn: { marginTop: h * 0.015 },
  // 쪽지 갯수 알려주기
  alarm_text: {
    position: 'absolute',
    left: w * 0.04,
    bottom: h * 0.033,
    fontSize: h * 0.015,
    fontWeight: 'bold',
  },
  // 프로필 버튼
  profile_btn: {
    marginLeft: w * 0.075,
    marginTop: h * 0.0105,
  },
  //로그인 버튼
  login_btn: {
    marginLeft: w * 0.37,
    marginTop: h * 0.02,
    fontSize: h * 0.015,
    fontWeight: 'bold',
  },
  // 뒤로가기 버튼
  back_btn: {
    width: w * 0.05,
    height: h * 0.05,
    marginLeft: w * 0.1,
    marginTop: h * 0.1,
  },

  // 좋아요 버튼
  goodbtn: {
    borderRadius: h * 0.02,
    position: 'absolute',
    left: w * 0.49,
    top: -h * 0.037,
    width: w * 0.19,
    height: h * 0.03,
  },
  // 좋아요 숫자
  goodnum: {
    borderRadius: h * 0.02,
    position: 'absolute',
    left: w * 0.62,
    top: -h * 0.03,
    height: h * 0.03,
    fontSize: h * 0.015,
  },
  //인디케이터//////////////////////////////////////////////////////////////////
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: h * 0.001,
    marginRight: w * 0.1,
  },
  indicator: {
    marginTop: h * 0.015,
    width: w * 0.015,
    height: h * 0.007,
    borderRadius: h * 0.005,
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: w * 0.015,
  },
  activeIndicator: {
    backgroundColor: 'black', // 활성 페이지의 배경색
  },

  // 카테고리//////////////////////////////////////////////////////////////////////
  category_: {
    fontWeight: 'bold',
    marginTop: h * 0.035,
    marginLeft: w * 0.005,
    fontSize: h * 0.023,
  },
  category_box: {
    marginTop: h * 0.01,
    width: w * 0.82,
    borderTopColor: '#BDBDBD', // 밑줄의 색상 설정
    borderTopWidth: h * 0.0012, // 밑줄의 두께 설정
    flexDirection: 'row',
  },
  category_text: {
    fontWeight: 'bold',
    marginTop: h * 0.02,
    marginLeft: w * 0.01,
    fontSize: h * 0.02,
  },
  // 카테고리별 더 보기
  category_plus: {
    color: '#BDBDBD',
    marginTop: h * 0.043,
    marginLeft: w * 0.35,
    fontSize: h * 0.017,
  },
  // 더보기 화살표
  category_arrow: {
    color: '#BDBDBD',
    marginTop: h * 0.0445,
    marginLeft: w * 0.01,
  },
  // 카테고리 검색
  category_search: {
    marginTop: h * 0.04,
    marginLeft: w * 0.02,
  },
  // 카테고리 종류 박스
  category_title_box: {
    width: w * 0.2,
    marginTop: h * 0.02,
  },
  category_title_text: {
    fontSize: h * 0.02,
    fontWeight: 'bold',
  },
  category_title_text1: {
    marginLeft: w * 0.05,
    fontSize: h * 0.02,
    fontWeight: 'bold',
    marginTop: h * 0.02,
  },
  write_post_btn: {
    position: 'absolute',
    bottom: w * 0.018,
    right: h * 0.018,
  },

  // 카테고리 제목 박스
  category_sub_title_box: {
    width: w * 0.53,
    marginTop: h * 0.02,
  },
  category_sub_title_text: {
    fontSize: h * 0.018,
    color: '#BDBDBD',
  },
  category_row: {
    flexDirection: 'row',
  },
  category_sub_box: {
    height: h * 0.04,
  },
  //////////////////////////////////////////////////////////////////////
  // 모든 카테고리
  AllCategory_View: {
    width: w * 0.8,
    height: h * 0.7,
    borderRadius: h * 0.02,
    borderWidth: w * 0.005,
    borderColor: '#00A0FF',
    marginLeft: w * 0.1,
    flexDirection: 'row',
  },
  // 뒤로가기 범위
  back_view: {
    width: w * 0.1,
    height: h * 0.07,
    marginTop: h * 0.106,
    marginLeft: w * 0.075,
  },
  back_view2: {
    width: w * 0.1,
    height: h * 0.07,
    marginTop: h * 0.102,
    marginLeft: w * 0.05,
  },
  back_view3: {
    width: w * 0.4,
    height: h * 0.07,
    marginTop: h * 0.102,
    marginLeft: w * 0.05,
  },
  back_title_view: {
    width: w * 0.3,
    marginTop: h * 0.108,
  },
  // 뒤로가기 뒤에 텍스트
  back_text: {
    fontSize: h * 0.025,
    fontWeight: 'bold',
  },
  back_text1: {
    marginTop: h * 0.2,
    color: 'black',
    fontSize: h * 0.025,
    fontWeight: 'bold',
  },

  // 정렬기준
  standard_view: {
    width: w * 0.1,
    marginTop: h * 0.12,
    marginLeft: w * 0.3,
  },
  standard_text: {
    color: '#BDBDBD',
    fontSize: h * 0.014,
  },
  // 게시글 박스
  post_box: {
    marginTop: h * 0.005,
    marginLeft: w * 0.085,
    marginBottom: h * 0.05,
  },
  category_post_view: {
    marginLeft: w * 0.085,
    marginBottom: h * 0.05,
  },
  // 글 하나하나에 대한 박스
  category_post_box: {
    width: w * 0.8,
    height: h * 0.1,
    marginBottom: h * 0.015,
    borderBottomColor: '#BDBDBD', // 밑줄의 색상 설정
    borderBottomWidth: h * 0.0012, // 밑줄의 두께 설정
  },
  category_post_text: {
    width: w * 0.8,
    height: h * 0.05,
  },
  category_post_title: {
    fontSize: h * 0.02,
    fontWeight: 'bold',
  },
  category_post_sub: {
    fontSize: h * 0.015,
    lineHeight: h * 0.022,
    marginTop: h * 0.005,
  },
  // 좋아요에 대한 박스
  category_post_like: {
    flexDirection: 'row',
    width: w * 0.8,
    marginTop: h * 0.02,
    height: h * 0.025,
  },
  category_post_like_text: {
    fontSize: h * 0.013,
    marginLeft: w * 0.007,
    marginTop: h * 0.007,
    color: '#BDBDBD',
  },
  // 모든 카테고리
  Allcategory_category_View: {
    marginLeft: w * 0.05,
    marginTop: h * 0.025,
  },
  Allcategory_category_text_view: {
    height: h * 0.08,
  },
  Allcategory_category_text: {
    fontSize: h * 0.022,
    marginLeft: w * 0.01,
    marginTop: h * 0.005,
    fontWeight: 'bold',
  },
  Allcategory_title_text: {
    marginTop: h * 0.01,
    fontSize: h * 0.017,
    marginLeft: w * 0.06,
    marginBottom: h * 0.015,
  },
  // 로그인 페이지//////////////////////////////////////////////////////////////////////////
  login_page_view: {
    width: w * 0.7,
    height: h * 0.6,
    marginTop: h * 0.175,
    marginLeft: w * 0.15,
  },

  login_title_text: {
    textAlign: 'center',
    fontSize: h * 0.035,
    fontWeight: 'bold',
    marginBottom: h * 0.08,
  },
  login_inputfield: {
    width: w * 0.7,
    height: h * 0.05,
    fontSize: h * 0.017,
    marginTop: h * 0.02,
    marginBottom: h * 0.0001,
    borderBottomColor: '#BDBDBD', // 밑줄의 색상 설정
    borderBottomWidth: h * 0.002, // 밑줄의 두께 설정
    textAlignVertical: 'bottom',
  },
  login_page_login_btn_view: {
    borderRadius: h * 0.01,
    marginTop: h * 0.05,
    height: h * 0.045,
    backgroundColor: 'gray',
  },
  login_page_login_btn_text: {
    color: 'white',
    textAlign: 'center',
    marginTop: h * 0.013,
    fontSize: h * 0.02,
  },
  login_page_kakao_btn_view: {
    borderRadius: h * 0.01,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    marginTop: h * 0.02,
    height: h * 0.045,
  },
  login_page_kakao_btn_image: {
    marginTop: h * 0.005,
  },
  login_page_kakao_btn_text: {
    color: '#3B1D1D',
    marginLeft: w * 0.12,
    marginTop: h * 0.013,
    fontSize: h * 0.02,
  },
  login_page_ex: {
    color: '#BDBDBD',
    textAlign: 'center',
    marginLeft: w * 0.015,
    marginTop: h * 0.08,
    fontSize: h * 0.015,
  },
  login_page_signup_btn: {
    color: '#0070FF',
    textAlign: 'center',
    marginTop: h * 0.04,
    fontSize: h * 0.018,
  },

  // 회원가입//////////////////////////////////////////////////////////////////////////
  signup_page_view: {
    width: w * 0.7,
    height: h * 0.45,
    marginTop: h * 0.06,
    marginLeft: w * 0.035,
  },
  // 라벨이랑 인풋필드 한 세트
  input_label_view: {
    flexDirection: 'row',
    heigth: h * 0.02,
    marginTop: h * 0.002,
  },
  //////////////
  signup_page_label_view: {
    width: w * 0.25,
    height: h * 0.03,
  },
  signup_page_label_text: {
    fontSize: h * 0.02,
    fontWeight: 'bold',
    marginTop: h * 0.005,
    textAlign: 'right',
  },
  ///////////
  signup_page_gender_view: {
    marginLeft: w * 0.015,
    width: w * 0.5,
    bottom: h * 0.004,
    flexDirection: 'row',
  },
  signup_page_inputfield: {
    marginLeft: w * 0.04,
    borderBottomColor: '#BDBDBD', // 밑줄의 색상 설정
    borderBottomWidth: h * 0.002, // 밑줄의 두께 설정
    textAlignVertical: 'bottom',
    width: w * 0.52,
    marginTop: h * 0.005,
    marginBottom: h * 0.028,
    fontSize: h * 0.018,
    textAlign: 'center',
  },
  signup_page_gender_btn: {
    marginBottom: h * 0.017,
    backgroundColor: '#BDBDBD',
    borderRadius: h * 0.004,
    marginRight: w * 0.025,
    marginLeft: w * 0.05,
    width: w * 0.2,
    height: h * 0.04,
  },
  selectedGender: {
    backgroundColor: '#0070FF', // 선택된 버튼 스타일을 정의해주세요.
  },
  signup_page_gender_text: {
    color: 'white',
    fontSize: h * 0.02,
    textAlign: 'center',
    marginTop: h * 0.01,
  },
  signup_page_signup_btn_view: {
    backgroundColor: '#0070FF',
    borderRadius: h * 0.01,
    width: w * 0.73,
    height: h * 0.05,
    marginLeft: w * 0.15,
  },
  signup_page_signup_btn_text: {
    color: 'white',
    fontSize: h * 0.018,
    marginRight: w * 0.005,
    textAlign: 'center',
    marginTop: h * 0.016,
  },
  mbti_select_ios: {
    marginLeft: w * 0.26,
    marginTop: h * 0.009,
    width: w * 0.3,
  },
  mbti_select_and: {},
  // 쪽지함 페이지//////////////////////////////////////////////////////////////////////////
  main_page1: {
    marginBottom: h * 0.1,
  },
  DMboxScreen_Btn_View: {
    flexDirection: 'row',
    marginLeft: w * 0.35,
    marginTop: h * 0.108,
  },
  DMboxScreen_DM_View: {
    width: w * 1,
    height: h * 0.101,
  },
  DMboxScreen_DM_ScrollView: {
    width: w * 1,
    height: h * 0.75,
  },
  DMboxScreen_DM_inner_View: {
    flexDirection: 'row',
    height: h * 0.1,
  },
  DMboxScreen_DM_Name_View: {
    width: w * 0.4,
    marginLeft: w * 0.1,
  },
  DMboxScreen_DM_Name_Text: {
    marginTop: h * 0.045,
    fontSize: h * 0.018,
    fontWeight: 'bold',
  },
  DMboxScreen_DM_Time_View: {
    width: w * 0.4,
    marginTop: h * 0.045,
    marginLeft: w * 0.2,
  },
  DMboxScreen_DM_Time_Text: {
    fontSize: h * 0.015,
    color: '#BDBDBD',
  },

  // 쪽지 쓰기 페이지 //////////////////////////////////////////////////////////////////////////
  DMSendScreen_view: {
    marginLeft: w * 0.1,
  },
  send_message_btn_view: {
    marginLeft: w * 0.37,
    marginTop: h * 0.108,
  },
  // 수신인
  DMSendScreen_sendId_View: { flexDirection: 'row' },
  sendId_text: {
    fontSize: h * 0.022,
  },
  sendId_input_box: {
    marginLeft: w * 0.05,
    fontSize: h * 0.022,
    width: w * 0.57,
    textAlign: 'center',
    borderBottomColor: 'black', // 밑줄의 색상 설정
    borderBottomWidth: h * 0.001, // 밑줄의 두께 설정
  },
  // 쪽지 내용 //////////////////////////////////////////////////////////////////////////
  DMSendScreen_content_View: {
    width: w * 0.8,
    marginTop: h * 0.02,
    borderTopColor: '#BDBDBD', // 밑줄의 색상 설정
    borderTopWidth: h * 0.0012,
  },
  main_Row15: {
    flexDirection: 'row',
    marginLeft: w * 0.1,
    width: w * 0.8,
    heigth: h * 0.2,
    borderBottomColor: '#BDBDBD', // 밑줄의 색상 설정
    borderBottomWidth: h * 0.0012,
  },
  back_view14: {
    width: w * 0.1,
    height: h * 0.05,
    marginTop: h * 0.106,
  },
  content_text: {
    marginTop: h * 0.03,
    marginBottom: h * 0.03,
  },
  content_input_box: {
    fontSize: h * 0.022,
    width: w * 0.7,
  },
  dm_username: {
    flexDirection: 'row',
  },
  dm_username_view: {
    width: w * 0.45,
    height: h * 0.04,
    marginTop: h * 0.105,
    marginLeft: w * 0.005,
  },
  dm_send_view: {
    width: w * 0.1,
    height: h * 0.04,
    marginTop: h * 0.105,
    marginLeft: w * 0.18,
  },
  dm_username_text: {
    fontSize: h * 0.028,
    fontWeight: 'bold',
  },
  dm_sendtime: {
    width: w * 0.7,
    height: h * 0.03,
    marginTop: h * 0.15,
    marginLeft: -w * 0.395,
  },
  dm_content: {
    marginTop: h * 0.04,
    marginLeft: w * 0.105,
  },
  dm_content_text: {
    fontSize: h * 0.02,
  },
  // 검색 //////////////////////////////////////////////////////////////////////////
  search_input_View: {
    flexDirection: 'row',
    height: h * 0.07,
    borderBottomColor: '#BDBDBD', // 밑줄의 색상 설정
    borderBottomWidth: h * 0.002, // 밑줄의 두께 설정
  },
  search_input_box: {
    marginLeft: w * 0.11,
    fontSize: h * 0.019,
    height: h * 0.04,
    width: w * 0.65,
    textAlign: 'center',
    borderColor: 'black', // 밑줄의 색상 설정
    borderWidth: h * 0.0015, // 밑줄의 두께 설정
    borderRadius: h * 0.01,
  },
  search_btn: {
    marginLeft: w * 0.07,
    marginTop: h * 0.003,
  },
  // 검색결과
  serach_result_view: {
    flexDirection: 'row',
    marginTop: h * 0.02,
    marginLeft: w * 0.1,
  },
  search_result_text: {
    marginLeft: w * 0.015,
    marginTop: h * 0.002,
    fontSize: h * 0.022,
    fontWeight: 'bold',
  },
  serach_result_view2: {
    marginLeft: w * 0.1,
    marginTop: h * 0.02,
    width: w * 0.8,
    height: h * 0.09,
  },
  serach_result_title: {
    fontSize: h * 0.02,
    fontWeight: 'bold',
  },
  serach_result_sub: {
    fontSize: h * 0.017,
    lineHeight: h * 0.03,
    marginTop: h * 0.01,
  },
  serach_result_like: {
    marginTop: h * 0.005,
    marginLeft: w * 0.02,
    color: '#BFBFBF',
  },
  search_result_row: {
    flexDirection: 'row',
    marginTop: h * 0.01,
    marginLeft: w * 0.005,
  },
  // 프로필 페이지
  back_text: {
    fontSize: h * 0.025,
    fontWeight: 'bold',
  },

  // ProfileScreen
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 12,
    marginBottom: 12,
  },
  header_left: {
    flex: 1,
    marginLeft: 10,
  },
  header_center: {
    flex: 5,
  },
  header_right: {
    flex: 2,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  profile_infos: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 29,
  },
  user_name_text: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  email_text: {
    fontWeight: '600',
    fontSize: 16,
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 60,
    borderColor: '#dddddd',
    borderWidth: 1,
    backgroundColor: '#dcdcdc',
  },
  name_section: {
    marginLeft: 15,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0070FF',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: w * 0.1,
    width: w * 0.85,
  },
  button_text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  user_status_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    marginHorizontal: 10,
  },
  participated_vote_box: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRightWidth: 2,
    borderColor: '#dcdcdc',
  },
  generated_vote_box: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRightWidth: 2,
    borderColor: '#dcdcdc',
  },
  comment_box: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  status_text1: {
    fontWeight: '700',
    marginBottom: 20,
  },

  // ProfileUpdateScreen
  text_input_container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  update_button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  update_button: {
    backgroundColor: '#0070FF',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: w * 0.1,
    width: w * 0.7,
  },

  // MessageBoxScreen
  new_message_container: {
    backgroundColor: '#ffe5a6',
    borderWidth: 1,
    borderColor: '#a29a84',
  },
  previous_message_container: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  message_header_left: {
    flex: 0.2,
  },
  message_header_center: {
    flex: 2.5,
  },
  message_header_right: {
    flex: 1,
  },
  message_contents_container: {
    paddingHorizontal: w * 0.1,
  },
  message_contents: {
    flexDirection: 'column',
  },
  message_text_title: {
    fontWeight: '700',
  },
  message_text_contents: {
    color: '#a69c86',
    fontSize: 13,
  },
  // UserAuthenticationScreen
  text_container: {
    height: h * 0.2,
    marginTop: h * 0.1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Vote 관련 페이지///////////////////////////////////////////////////////////////////////
  back_view12: {
    width: w * 0.1,
    height: h * 0.05,
    marginTop: h * 0.106,
    marginLeft: w * 0.075,
  },
  VoteMake_View1_title_View: {
    marginBottom: h * 0.03,
    marginTop: h * 0.05,
    fontSize: h * 0.023,
  }, //투표생성하기 글씨
  VoteMake_View1: {
    width: w * 0.85,
    height: h * 0.17,
    marginLeft: w * 0.07,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: h * 0.0012,
    borderTopColor: '#BDBDBD',
    borderTopWidth: h * 0.0012,
  },
  VoteMake_View1_inputfield: {
    marginTop: h * 0.03,
    fontSize: h * 0.02,
    width: w * 0.82,
    flexDirection: 'row',
  }, //제목입력칸
  VoteMake_View1_title_text: {
    width: w * 0.7,
    borderBottomColor: 'black',
    marginLeft: w * 0.03,
    fontSize: h * 0.02,
    borderBottomWidth: h * 0.0012,
  }, //제목입력글씨

  VoteMake_View1_title_input: {
    fontSize: h * 0.02,

    marginTop: h * 0.0043,
  }, //제목글씨
  VoteMake_View1_category_View: {
    flexDirection: 'row',
    marginTop: h * 0.03,
  }, //카테고리
  VoteMake_View_category_: {
    fontSize: h * 0.02,
  },
  VoteMake_View1_category_Picker_View: {
    marginLeft: w * 0.1,
    marginTop: -h * 0.1,
  }, //피커위치
  VoteMake_View1_category_Picker1: {
    fontSize: h * 0.001,
  },
  VoteMake_View1_category_Picker2: {
    marginTop: h * 0.098,
    width: w * 0.2,
    fontSize: h * 0.02,
  },
  VoteMake_View1_category_Picker: {
    height: h * 0.01,
    width: w * 0.4,
    fontSize: h * 0.01,
  }, //피커화살표 위치
  VoteMake_View2_content_View: {
    marginLeft: w * 0.72,
  }, //사진첨부
  VoteMake_View2_titlename: { fontSize: h * 0.02 }, //본문글씨

  VoteMake_View2_content: {
    fontSize: h * 0.018,
    marginTop: h * 0.03,
    flexDirection: 'row',
  }, //사진첨부
  VoteMake_View2_textcontent: {
    marginTop: h * 0.01,
    width: w * 0.85,
    marginBottom: h * 0.05,
    borderWidth: 1,
    borderColor: 'black',
    padding: w * 0.01,
    textAlignVertical: 'top',
    height: h * 0.2,
  }, //본문내용입력
  VoteMake_View2_textcontent1: {
    marginLeft: w * 0.07,
    width: w * 0.85,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: h * 0.0012,
    height: h * 0.23,
    marginBottom: h * 0.02,
  },
  content_text1: {
    fontSize: h * 0.018,
    marginLeft: w * 0.68,
    marginBottom: h * 0.01,
    marginTop: h * 0,
  }, //
  VoteMake_View3_Votecontent: {
    width: w * 0.75,
    paddingVertical: h * 0.01,
    height: h * 0.05,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: h * 0.01,
    marginLeft: w * 0.07,
    marginRight: w * 0.03,
    borderWidth: 0.5,
    borderColor: 'black',
  }, //투표항목 내용입력 버튼
  VoteMake_View3_Votecontent1: {
    fontSize: h * 0.018,
    textAlign: 'center',
    marginTop: h * 0.004,
  },
  VoteMake_View3_content_interval: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: h * 0.015,
  }, //투표항목버튼 간격
  VoteMake_View3_Addcontent: {
    flexDirection: 'row',
  }, //투표항목추가와 생성하기 버튼간격
  VoteMake_View3_contentbotton: {
    backgroundColor: 'white',
    height: h * 0.05,
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: w * 0.75,
    marginLeft: w * 0.07,
    marginRight: w * 0.02,
    marginTop: h * 0.02,
    borderWidth: 0.5,
    borderColor: 'black',
  }, //투표항목 추가문구버튼
  VoteMake_View3_contenttext: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  }, //투표항목을 추가안내버튼
  VoteMake_View3_contentaddbotton: {
    marginTop: h * 0.03,
    marginLeft: w * 0.01,
  }, //투표항목 추가 플러스버튼
  VoteMake_View3_Makebottonname: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  }, //투표생성버튼 글자
  VoteMake_View3_Makebotton: {
    backgroundColor: '#4B89DC',
    height: h * 0.06,
    marginVertical: h * 0.07,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: w * 0.8,
    marginLeft: w * 0.1,
  }, //투표생성버튼
  main_Row12: {
    flexDirection: 'row',
    marginTop: -h * 0.08,
  },
  main_Row13: {
    flexDirection: 'row',
    marginTop: -h * 0.08,
  },
  VoteBefore_View1: {
    marginTop: h * 0.03,
  }, //view1 첫번째줄
  btns: {
    flexDirection: 'row',
    marginTop: h * 0.106,
  },
  text_box1: {
    flexDirection: 'row',
  },
  VoteBefore_View1_All: {
    width: w * 0.9,
    marginLeft: w * 0.04,
    marginTop: h * 0.005,
  },
  VoteBefore_View1_share: {
    marginLeft: w * 0.05,
    marginTop: h * 0.003,
  }, //공유버튼
  VoteBefore_View1_heart: {
    marginLeft: w * 0.55,
  }, //좋아요버튼
  VoteBefore_View1_title: {
    fontSize: h * 0.023,
    marginLeft: w * 0.03,

    marginBottom: h * 0.01,
  }, //투표제목
  VoteBefore_View1_day: {
    fontSize: h * 0.015,
    marginLeft: w * 0.027,
    marginBottom: h * 0.005,
  }, //투표기간
  VoteBefore_View1_host: {
    fontSize: h * 0.015,
    marginLeft: w * 0.4,
    marginBottom: h * 0.03,
  }, //주최자
  VoteBefore_View1_row: {
    marginLeft: w * 0.025,
    marginRight: w * 0,
    marginBottom: h * 0.03,
    width: w * 0.85,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: h * 0.0014,
  }, //view1,view2 경계선
  VoteBefore_View2_content: {
    marginLeft: w * 0.03,
    fontSize: h * 0.016,
    marginTop: h * 0.01,
    marginLeft: w * 0.025,
    width: w * 0.85,
    marginBottom: h * 0.02,
    borderWidth: 1,
    borderColor: 'black',
    padding: w * 0.01,
    textAlignVertical: 'top',
    height: h * 0.35,
  }, //본문내용
  VoteBefore_View2_Votebotton: {
    height: h * 0.055,
    marginVertical: h * 0.01,
    borderRadius: h * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: h * 0.001,
    width: w * 0.86,
    marginLeft: w * 0.02,
  }, //투표항목버튼
  VoteBefore_View2_Row: {
    flexDirection: 'row',
    marginLeft: w * 0.025,
    marginTop: h * 0.02,
    marginBottom: w * 0.03,
    width: w * 0.85,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: h * 0.0012,
  }, //view2,view3 경계선
  VoteBefore_View3_comment: {
    marginBottom: h * 0.02,
    marginLeft: w * 0.02,
  }, //댓글수 표시

  VoteBefore_View3_warning: {
    backgroundColor: '#e7e7e8',
    height: h * 0.05,
    width: w * 0.85,
    borderRadius: w * 0.03,
    justifyContent: 'center',
    marginLeft: w * 0.02,
  }, //투표댓글 경고문구버튼
  VoteBefore_View3_warningtext: {
    width: w * 0.85,
    textAlign: 'center',
    color: 'dimgray',
  }, //투표댓글 경고문구
  VoteBefore_View3_Votebotton: {
    backgroundColor: '#4B89DC',
    height: h * 0.065,
    marginTop: h * 0.07,
    borderRadius: w * 0.05,
    justifyContent: 'center',
    width: w * 0.85,
    marginLeft: w * 0.02,
    marginBottom: h * 0.1,
  }, //투표하기버튼
  VoteBefore_View3_Votebottontext: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  }, //투표하기버튼 문구
  VoteBefore_View3_Sort: {
    fontSize: 13,
    color: 'gray',
    marginLeft: w * 0.78,
    marginTop: -h * 0.035,
  }, //댓글정렬버튼
  VoteAfter_View3_comment: {
    marginTop: h * 0.05,
    marginRight: w * 0.8,
  }, //댓글입력칸
  VoteAfter_View3_commenttext: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: w * 0.002,
    height: h * 0.04,
    borderRadius: w * 0.02,
    paddingLeft: w * 0.02,
    width: w * 0.85,
    marginLeft: w * 0.02,
    marginBottom: h * 0.05,
  }, //댓글입력칸 텍스트
  VoteAfter_View3_textinput: {
    marginLeft: w * 0.9,
    marginTop: -h * 0.083,
    marginBottom: h * 0.1,
  }, //댓글입력칸 위치
  VoteAfter_View3_error: {
    color: 'red',
    marginTop: -h * 0.04,
    marginLeft: w * 0.04,
  }, //댓글 에러메세지
  VoteAfter_View3_comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: h * 0.01,
  }, //댓글내용과 위의줄 간격
  VoteAfter_View3_commenttime: {
    fontSize: h * 0.013,
    color: 'gray',
    marginLeft: w * 0.02,
  }, //댓글작성시간
  VoteAfter_View3_like: {
    marginRight: w * 0.03,
    marginLeft: w * 0.04,
  }, //좋아요버튼
  VoteAfter_View3_nickname: {
    fontSize: h * 0.01,
    color: 'gray',
    marginLeft: w * 0.02,
  }, //닉네임표시
  VoteAfter_View3_report: {
    marginLeft: w * 0.5,
  }, //신고버튼
  VoteAfter_View3_text: {
    fontSize: h * 0.012,
    marginLeft: w * 0.02,
  }, //댓글입력내용
  VoteBefore_View3_commentRow: {
    flexDirection: 'row',
    marginLeft: w * 0.025,
    marginTop: h * 0.02,
    marginBottom: w * 0.03,
    width: w * 0.95,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: h * 0.0012,
  }, //댓글경계선
  VoteBefore_View3_share: {
    marginLeft: w * 0.83,
  }, //공유버튼
  VoteAfter_View3_recomment: {
    marginLeft: w * 0.75,
    marginRight: -w * 1.4,
  }, //답글버튼
  VoteAfter_View3_recommenttext: {
    fontSize: 13,
    color: 'gray',
    marginLeft: w * 0.02,
    marginTop: h * 0.01,
  }, //답글텍스트
  VoteAfter_View3_totalLike: {
    flexDirection: 'row',
    marginLeft: w * 0.02,
    marginTop: h * 0.03,
    fontSize: h * 0.012,
    color: 'gray',
  }, //좋아요합계이미지
  VoteAfter_View3_totalLikenumber: {
    fontSize: h * 0.012,
    color: 'gray',
    marginLeft: w * 0.01,
  }, //좋아요합계숫자
  status_x: { marginTop: h * 0.05 },
});
