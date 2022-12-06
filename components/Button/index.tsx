import { ActivityIndicator } from "react-native";
import { CustomText } from "../CustomText";
import { Container } from "./styles";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ children, onPress, disabled, loading }: ButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (
        <CustomText weight="600" color="#fff">
          {children}
        </CustomText>
      )}

      {loading && <ActivityIndicator color="#fff" />}
    </Container>
  );
}
