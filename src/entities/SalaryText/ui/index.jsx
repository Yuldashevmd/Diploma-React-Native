import { Text } from "react-native";

export const SalaryText = ({ salary = "0", salary_type = "sum" }) => {
  return (
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
        {salary}
      </Text>{" "}
      <Text
        style={{
          fontWeight: "bold",
          color: "green",
          fontSize: 18,
        }}
      >
        {(salary_type === "sum" && "UZS") ||
          (salary_type === "euro" && "EUR") ||
          (salary_type === "dollar" && "USD")}
      </Text>
    </Text>
  );
};
