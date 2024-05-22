import { Text, View } from "react-native";
import { Container } from "../../../shared/styles/global";
import { HelpCircle } from "react-native-feather";

export const Help = () => {
  return (
    <Container>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <HelpCircle color={"orange"} width={80} height={80} />
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}>
          Помощь по приложению
        </Text>
      </View>

      <View style={{ marginBottom: 20, marginTop: 40 }}>
        <Text style={{ fontSize: 16 }}>
          1. В приложение есть 5 основных экранов.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          2. Поиск экран: здесь пользователь может искать вакансии и резюме по
          фильтру и по тексту.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          3. Сохранение экран: Здесь пользователь может видеть сохранёные
          вакансию или резюме.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          4. Отклики экран: Здесь пользователь может видеть свои отклики и
          ответы на отклик кроме этого может сортировать по типу.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          5. Вакансии экран: здесь пользователь видить свой вакансию которые
          создал и редактировать их или удалять если ненужен, и может создать
          новые вакансии.
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>
          5. Профиль экран: здесь пользователь может видеть свой профиль и
          редактировать его, кроме этого выдно будет по одну резюме и вакансия и
          может создать их или удалять по необходимости. Описание и Справка
          экраны находиться в экране профилья.
        </Text>
      </View>
    </Container>
  );
};
