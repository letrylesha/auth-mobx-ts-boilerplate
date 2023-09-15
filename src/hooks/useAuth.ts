import { useEffect, useState } from "react";
import { localStorageUtils } from "../utils/LocalStorage";
import { useUserStore } from "./useUserStore";
import { userApi } from "../api/user.api";
import { authApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const checkIsTokenValid = () => {
  const token = localStorageUtils.getToken();
  const tokenExpiresIn = localStorageUtils.getTokenExpiresIn();

  if (!token || !tokenExpiresIn) {
    return false;
  }

  const isTokenExpired = Date.now() > Number(tokenExpiresIn);

  return isTokenExpired;
};

const checkIsRefreshTokenValid = () => {
  const refreshToken = localStorageUtils.getRefreshToken();
  const refreshTokenExpiresIn = localStorageUtils.getRefreshTokenExpiresIn();

  if (!refreshToken || !refreshTokenExpiresIn) {
    return false;
  }

  const isRefreshTokenExpired = Date.now() > Number(refreshTokenExpiresIn);

  return isRefreshTokenExpired;
};

const getUser = async (setCurrentUser: any) => {
  const user = await userApi.getUser();

  setCurrentUser(user);
};

const getNewTokens = async (setCurrentUser: any) => {
  const refreshToken = localStorageUtils.getRefreshToken();

  const data = await authApi.refreshToken(refreshToken);

  localStorageUtils.setAllAuthUserInfo(data);

  await getUser(setCurrentUser);
};

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    // check is token valid
    const isTokenValid = checkIsTokenValid();
    if (isTokenValid) {
      getUser(setCurrentUser);

      return;
    }

    // if not, check is refresh token valid
    const isRefreshTokenValid = checkIsRefreshTokenValid();
    if (isRefreshTokenValid) {
      getNewTokens(setCurrentUser);

      return;
    }

    // if not, redirect to auth page and clear tokens
    localStorageUtils.clearAuthData();
    navigate("/auth");

    setIsLoading(false);
  }, []);

  return {
    isLoading,
  };
};
