import { PenTool, Trash } from "react-native-feather";
import { Button, Card, List } from "react-native-paper";

export const CvCard = (props) => {
  const { title, subtitle, skills, jobs, content, onDelete, onEdit } = props;

  return (
    <Card style={{ marginVertical: 10, backgroundColor: "white" }}>
      <Card.Title
        style={{
          backgroundColor: "#DAE8FC",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        subtitleVariant="titleSmall"
        title={title}
        titleStyle={{ color: "#004C99", fontSize: 20, fontWeight: "700" }}
        subtitle={subtitle}
        subtitleStyle={{
          color: "#757575",
        }}
      />
      <Card.Content>
        <List.Item
          title="Skills:"
          titleStyle={{ fontSize: 16, fontWeight: "500", color: "#000" }}
          descriptionStyle={{ color: "grey", fontSize: 12 }}
          descriptionEllipsizeMode="tail"
          descriptionNumberOfLines={1}
          description={skills}
        />
        <List.Item
          title="Experience:"
          titleStyle={{ fontSize: 16, fontWeight: "500", color: "#000" }}
          descriptionStyle={{ color: "grey", fontSize: 12 }}
          descriptionEllipsizeMode="tail"
          descriptionNumberOfLines={1}
          description={jobs}
        />
        <List.Item
          title="About:"
          titleStyle={{ fontSize: 16, fontWeight: "500", color: "#000" }}
          descriptionStyle={{ color: "grey", fontSize: 12 }}
          descriptionEllipsizeMode="tail"
          descriptionNumberOfLines={3}
          description={content}
        />
      </Card.Content>
      <Card.Actions
        style={{
          marginTop: 10,
          width: "100%",
        }}
      >
        {onEdit && (
          <Button
            onPress={onEdit}
            style={{ flex: 1, borderRadius: 8, width: "100%" }}
            mode="default"
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
            mode="default"
            icon={() => <Trash width={20} height={20} color={"crimson"} />}
          >
            Delete
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};
