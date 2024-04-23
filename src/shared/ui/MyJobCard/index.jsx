import { Text } from "react-native";
import { PenTool, Trash } from "react-native-feather";
import { Button, Card } from "react-native-paper";

export const MyJobCard = (props) => {
  const { title, subtitle, content, onDelete, onEdit } = props;

  return (
    <Card style={{ marginVertical: 10, backgroundColor: "white" }}>
      <Card.Title
        titleVariant="titleLarge"
        subtitleVariant="titleSmall"
        title={title}
        subtitle={subtitle}
        subtitleStyle={{ fontWeight: 400, color: "grey" }}
      />
      <Card.Content>
        <Text>
          {content.length > 150 ? content.slice(0, 150) + "..." : content}
        </Text>
      </Card.Content>
      <Card.Actions style={{ marginTop: 10, marginBottom: 5 }}>
        <Button
          onPress={onEdit}
          style={{ flex: 1, borderRadius: 8, width: "100%" }}
          mode="elevated"
          textColor="#CC6600"
          icon={() => <PenTool width={20} height={20} color={"#CC6600"} />}
        >
          Edit
        </Button>
        <Button
          onPress={onDelete}
          style={{
            flex: 1,
            borderRadius: 8,
            width: "100%",
          }}
          textColor="crimson"
          mode="elevated"
          icon={() => <Trash width={20} height={20} color={"crimson"} />}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
};
