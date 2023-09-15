import { useAuth } from "./useAuth";

export const useInit = () => {
  const { isLoading: isAuthLoading } = useAuth();

  return {
    isLoading: isAuthLoading,
  };
};
