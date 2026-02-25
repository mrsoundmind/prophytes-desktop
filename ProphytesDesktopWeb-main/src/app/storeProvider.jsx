"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import SocketProvider from "./socketProvider";
import SetToken from "@/components/SetToken";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <SetToken />
      <SocketProvider>{children}</SocketProvider>
    </Provider>
  );
}
