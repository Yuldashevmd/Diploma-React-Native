import { Text } from "react-native";
import { PenTool, Trash } from "react-native-feather";
import { Button, Card } from "react-native-paper";
import { SalaryText } from "../../../entities/SalaryText";

export const MyJobCard = (props) => {
  const {
    title,
    subtitle,
    content,
    salary_from,
    salary_type,
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
        <SalaryText salary={salary_from} salary_type={salary_type} />
        <Text style={{ color: "grey", marginTop: 5 }}>
          {content.length > 150 ? content.slice(0, 150) + "..." : content}
        </Text>
      </Card.Content>

      <Card.Actions style={{ marginTop: 10, marginBottom: 5 }}>
        {onEdit && (
          <Button
            onPress={onEdit}
            style={{ flex: 1, borderRadius: 8, width: "100%" }}
            mode="elevated"
            textColor="#CC6600"
            icon={() => <PenTool width={20} height={20} color={"#CC6600"} />}
          >
            Edit
          </Button>
        )}
        {onDelete && (
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
        )}
      </Card.Actions>
    </Card>
  );
};
