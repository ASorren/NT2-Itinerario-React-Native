import React from "react";
import UserInfo from "../../components/Auth/UserInfo";

export default function MyData(props) {
  const { navigation } = props;
  return <UserInfo navigation={navigation} />;
}