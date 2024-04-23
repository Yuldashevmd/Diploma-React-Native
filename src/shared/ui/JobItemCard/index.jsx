import { Text } from "react-native";
import { Heart } from "react-native-feather";
import { Button, Card } from "react-native-paper";

export const JobItemCard = (props) => {
  const { title, subtitle, content, onClick, id, likes, rejected, offered } =
    props;

  const handleLike = () => {
    console.log("like", id);
  };

  return (
    <Card style={{ marginVertical: 10, backgroundColor: "white" }}>
      <Card.Title
        titleVariant="titleLarge"
        subtitleVariant="titleSmall"
        title={title}
        subtitle={subtitle}
        subtitleStyle={{ fontWeight: 400, color: "grey" }}
        rightStyle={{ marginRight: 10 }}
        right={(props) => (
          <Heart
            {...props}
            name="heart"
            size={24}
            color="crimson"
            fill={likes ? "crimson" : "none"}
            onPress={handleLike}
          />
        )}
      />
      <Card.Content>
        <Text>
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
