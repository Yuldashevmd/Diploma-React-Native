import { StatusBar, View } from "react-native";
import { useEffect, useState } from "react";
import { LoadingUI } from "./src/shared/ui/LoadingUi";
import { Home } from "./src/pages/Home";
import { Navbar } from "./src/widgets/Navbar";

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <LoadingUI />;

  return (
    <View>
      <Navbar />
      <Home />
      <StatusBar theme="auto" />
    </View>
  );
}
