import { Text } from "react-native";
import { Heart } from "react-native-feather";
import { Button, Card } from "react-native-paper";
import { SalaryText } from "../../../entities/SalaryText";

export const JobItemCard = (props) => {
  const {
    title,
    subtitle,
    content,
    salary_from,
    salary_type,
    onClick,
    id,
    likes,
    rejected,
    offered,
    onLike,
  } = props;

  return (
    <Card style={{ marginVertical: 10, backgroundColor: "white" }}>
      <Card.Title
        subtitleVariant="titleSmall"
        title={title}
        titleStyle={{ fontSize: 18, fontWeight: "700", color: "#252525" }}
        subtitle={Intl.DateTimeFormat("en-GB").format(new Date(subtitle))}
        subtitleStyle={{ fontWeight: 400, color: "grey" }}
        rightStyle={{ marginRight: 10 }}
        right={(props) => (
          <Heart
            {...props}
            name="heart"
            size={24}
            color="crimson"
            fill={likes ? "crimson" : "none"}
            onPress={onLike}
          />
        )}
      />
      <Card.Content>
        <SalaryText salary={salary_from} salary_type={salary_type} />
        <Text style={{ color: "grey", marginTop: 5 }}>
          {content.length > 150 ? content.slice(0, 150) + "..." : content}
        </Text>
      </Card.Content>
      <Card.Actions style={{ marginTop: 10, marginBottom: 5 }}>
        {rejected ? (
          <Text
            style={{
              color: "red",
              fontSize: 16,
              textAlign: "center",
              width: "100%",
              marginBottom: 5,
            }}
          >
            REJECTED
          </Text>
        ) : (
          <Button
            onPress={onClick}
            style={{ borderRadius: 8, width: "100%" }}
            mode="contained"
            textColor={offered ? "green" : "crimson"}
            buttonColor={!offered ? "#F8CECC" : "#D5E8D4"}
          >
            {offered ? "Apply" : "Read more"}
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};
