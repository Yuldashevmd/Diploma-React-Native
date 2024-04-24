import { Text } from "react-native";
import { PenTool, Save, Trash } from "react-native-feather";
import { Button, Card, Divider, Icon } from "react-native-paper";

export const MyJobCard = (props) => {
  const {
    title,
    subtitle,
    content,
    salary_from = "500",
    salary_type = "sum",
    onDelete,
    onEdit,
  } = props;

  return (
    <Card style={{ marginVertical: 10, backgroundColor: "white" }}>
      <Card.Title
        titleStyle={{ fontSize: 18, fontWeight: "700", color: "#252525" }}
        subtitleVariant="titleSmall"
        title={title}
        subtitle={subtitle}
        subtitleStyle={{ color: "#757575" }}
      />
      <Card.Content>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            borderColor: "lightgrey",
            borderTopWidth: 1,
            paddingTop: 5,
          }}
        >
          Salary:{" "}
          <Text
            style={{
              fontWeight: "bold",
              color: "green",
              fontSize: 18,
              letterSpacing: 1,
            }}
          >
            {salary_from}
          </Text>{" "}
          <Text
            style={{
              fontWeight: "bold",
              color: "green",
              fontSize: 18,
            }}
          >
            {(salary_type === "sum" && "UZS") ||
              (salary_type === "dollar" && "USD") ||
              (salary_type === "euro" && "EUR")}
          </Text>
        </Text>
        <Text style={{ color: "grey", marginTop: 5 }}>
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
