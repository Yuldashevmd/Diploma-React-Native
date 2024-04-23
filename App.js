import { NavigationWrapper } from "./src/apps/Navigation";
import { Providers } from "./src/apps/Providers";

export default function App() {
  return (
    <Providers>
      <NavigationWrapper />
    </Providers>
  );
}
